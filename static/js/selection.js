import { returnHome, goToNext, restartCounter } from "./main.js";
import { getGridPosition, handLeftDetection, handRightDetection } from "./utilityFunctions.js";

// var host = "cpsc484-02.yale.internal:8888";
var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var counter = [0, 0, 0, 0];

var info = document.getElementById("info");
var rightcounter = 0;
var progress = 0;
var page = "message";
var message = "Opening message. . ."

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

    // Check whether they in message 1, message 2, or message 3 range (x-axis)
    // Keep a counter of how long they stand in each grid position (1, 2, 3)
    // Once a grid area reaches counter for 30 frames on it, then redirect to message!
    // IDEA: counter array: [no one there, message 1, message 2, message 3]
    //          counters[getGridPosition(frame)]++
    //          if (counters[getGridPosition(frame)] > 30 && getGridPosition(frame) != 0) { // open message! }
    //          else { // no one there, there to landing}
    //var position = getGridPosition(frame);

    var position = getGridPosition(frame);
    optionSelect(position);
    counter[position]++;

    if (position != 0 && counter[position] > 5) {
        goToNext(frame, page, message);
    }
    //returns home if user leaves before message selects
    else if (position == 0 && counter[position] > 100) {
        window.location.replace("landing");
    }
    else {
        restartCounter();
    }

    console.log("position: " + position + ", counter: " + counter[position]);

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