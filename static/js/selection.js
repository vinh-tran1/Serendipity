import { returnHome } from "./main.js";
import { getGridPosition, handLeftDetection, handRightDetection } from "./utilityFunctions.js";

// var host = "cpsc484-02.yale.internal:8888";
var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var info = document.getElementById("info");
var rightcounter = 0
var progress = 0

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
        goToMessage(frame);
        returnHome(frame);          // left hand check to quit
        positionProcess(frame);     // body position check to select message
        if (handLeftDetection(frame) == 1) {
            info.innerHTML = "Returning to Homepage. . .";
        }
        else {
            info.innerHTML = "Move to desired card to choose one!";
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
    var position = getGridPosition(frame);
    console.log("position: " + position);

}

function goToMessage(frame) {
    // check if right hand raised
    if (handRightDetection(frame) == 1) {
        rightcounter += handRightDetection(frame)
        if (rightcounter > 0) {
            info.innerHTML = "Going to create page..."
            console.log("right hand raised: ", rightcounter);
            progressContinue(rightcounter);
            if (rightcounter > 30) {
                document.getElementsByClassName('progress-bar').item(0).className = "progress-bar bg-success";
                window.location.replace("message");
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