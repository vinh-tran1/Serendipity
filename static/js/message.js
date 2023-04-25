import { returnHome, goToNext, autoReturn } from "./main.js";
import { handRightDetection, handLeftDetection, handBothDetection, getGridPosition } from "./utilityFunctions.js";

var host = "cpsc484-02.yale.internal:8888";
// var host = "127.0.0.1:4444"; // recorded data


$(document).ready(function () {
    setTimeout(function () {frames.start();}, 3000);
});

var page = "create";
var message = "Going to create page. . .";
let openOnce = false;
const msgWrapper = document.querySelector(".msg_wrapper");

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
        //if both hands up, message opens
        if (handBothDetection(frame) === 1 && !openOnce){
            openMessage();
        }
        else {
            goToNext(frame, page, message, "");
            returnHome(frame);
        }
            
        autoReturn(frame);

        if (handRightDetection(frame) == 0 && handLeftDetection(frame) == 0) {
            info.innerHTML = "Hold up right hand to leave your own message!"
        }
        if (handLeftDetection(frame) == 1 && handRightDetection(frame) == 0) {
            info.innerHTML = "Returning to Homepage. . .";
        }
    }
};

function openMessage() {
    msgWrapper.classList.add("open");

    openOnce = true;
}
