import { returnHome } from "./main.js";
import { handRightDetection, handLeftDetection } from "./utilityFunctions.js";

// var host = "cpsc484-02.yale.internal:8888";
var host = "127.0.0.1:4444"; // recorded data


$(document).ready(function () {
    frames.start();
});

var rightcounter = 0;
var progress = 0;

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
        goToCreate(frame);
        returnHome(frame);
        if (handRightDetection(frame) == 0 && handLeftDetection(frame) == 0) {
            info.innerHTML = "Hold up right hand to leave your own message!"
        }
        if (handLeftDetection(frame) == 1) {
            info.innerHTML = "Returning to Homepage. . .";
        }
    }

};

function goToCreate(frame) {
    // check if right hand raised
    if (handRightDetection(frame) == 1) {
        rightcounter += handRightDetection(frame)
        if (rightcounter > 0) {
            info.innerHTML = "Going to create page..."
            console.log("right hand raised: ", rightcounter);
            progressContinue(rightcounter);
            if (rightcounter > 30) {
                document.getElementsByClassName('progress-bar').item(0).className = "progress-bar bg-success";
                window.location.replace("create");
            }
        }
    }
    else {
        rightcounter = 0;
        progress = 0;
        document.getElementsByClassName('progress-bar').item(0).className = "progress-bar";
        document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(progress)+'%');
    }
};

function progressContinue( rightcounter ) {
    progress = Math.floor(rightcounter/30*100)
    document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(progress)+'%');
}