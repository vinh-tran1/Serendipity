import { returnHome, goToNext, autoReturn } from "./main.js";
import { handRightDetection, handLeftDetection, handBothDetection, getGridPosition } from "./utilityFunctions.js";

// var host = "cpsc484-02.yale.internal:8888";
var host = "127.0.0.1:4444"; // recorded data


$(document).ready(function () {
    setTimeout(function () {frames.start();}, 3000);
});

var page = "create";
var message = "Going to create page. . .";
const lidOne = document.querySelector('.lid.one');
const lidTwo =  document.querySelector('.lid.two');
const msgLetter = document.querySelector('.msg_letter');
let openOnce = false;
var position = 0;
let posOnce = false;
var image = document.getElementById("msg-img");

var info = document.getElementById("info");

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        if (!posOnce){
            position = getGridPosition(frame);
            console.log(position);
            if (position != 0)
                changeImage(position);
        }

        //if both hands up, message opens
        if (handBothDetection(frame) === 1 && !openOnce){
            openMessage();
            //openOnce = true;
        }
            
        goToNext(frame, page, message, "");
        returnHome(frame);
        autoReturn(frame);

        if (handRightDetection(frame) == 0 && handLeftDetection(frame) == 0) {
            info.innerHTML = "Hold up right hand to leave your own message!"
        }
        if (handLeftDetection(frame) == 1) {
            info.innerHTML = "Returning to Homepage. . .";
        }
    }

};

function changeImage(position){
    if (position === 1)
        image.src="../static/images/harvard.png";
    else if (position === 2)
        image.src="../static/images/pizza.png";
    else
        image.src="../static/images/bulldog.png";

    posOnce = true;
}

function openMessage() {
    lidOne.classList.remove('one');
    lidOne.classList.add('two');

    lidTwo.classList.remove('two');
    lidTwo.classList.add('one');

    msgLetter.style.transform = 'translateY(-100px)';

    openOnce = true;
}
