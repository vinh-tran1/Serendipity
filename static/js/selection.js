import { returnHome, goToNext } from "./main.js";
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
        goToNext(frame, page, message);
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
    counter[position]++;

    if (position != 0 && counter[position] > 50) //goes to message
        window.location.replace("message");
    else if (position == 0 && counter[position] > 100) //returns home if user leaves before message selects
        window.location.replace("landing");

    console.log("position: " + position + ", counter: " + counter[position]);

}