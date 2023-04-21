import { returnHome, goToNext, restartCounter, autoReturn } from "./main.js";
import { getGridPosition, handLeftDetection, handRightDetection } from "./utilityFunctions.js";

var host = "cpsc484-02.yale.internal:8888";
// var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var counter = [0, 0, 0, 0];

var info = document.getElementById("info");
var rightcounter = 0;
var progress = 0;
var page = "message";
var message = "Opening message. . ."

var checkPosition = 0;

// get option elements
var optionA = document.getElementById("A")
var optionB = document.getElementById("B")
var optionC = document.getElementById("C")

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
        returnHome(frame);          // left hand check to quit
        positionProcess(frame);     // body position check to select message
        autoReturn(frame)
        if (handRightDetection(frame) == 0 && handLeftDetection(frame) == 0) {
            info.innerHTML = "Move to desired card and raise right hand!"
        }
        if (handLeftDetection(frame) == 1) {
            info.innerHTML = "Returning to Homepage. . .";
        }
    }

};


// If user is in the same position for x time, then go to message.html
export function positionProcess(frame) {

    // Check whether they're in message 1, message 2, or message 3 range (x-axis)
    var currPosition = getGridPosition(frame);
    optionSelect(currPosition);
    counter[currPosition]++;

    if (checkPosition == currPosition) {
        if (currPosition != 0 && counter[currPosition] > 10) {
            goToNext(frame, page, message);
            returnHome(frame)
        }
        else if (handLeftDetection(frame) == 0) {
            restartCounter();
        }
    }
    else {
        checkPosition = currPosition;
        counter = [0, 0, 0, 0];
    }

    // console.log("current position: " + currPosition + ", checked position: " + checkPosition + ", counter: " + counter[currPosition]);

}

function optionSelect(position) {
    optionA.style.filter = "brightness(100%)";
    optionB.style.filter = "brightness(100%)";
    optionC.style.filter = "brightness(100%)";

    if (position == 1) {
        optionA.style.filter = "brightness(100%)";
        optionB.style.filter = "brightness(50%)";
        optionC.style.filter = "brightness(50%)";
    }
    if (position == 2) {
        optionA.style.filter = "brightness(50%)";
        optionB.style.filter = "brightness(100%)";
        optionC.style.filter = "brightness(50%)";
    }
    if (position == 3) {
        optionA.style.filter = "brightness(50%)";
        optionB.style.filter = "brightness(50%)";
        optionC.style.filter = "brightness(100%)";
    }
}