import { handLeftDetection, handRightDetection, handAnyDetection, getGridPosition } from "./utilityFunctions.js";

// var host = "cpsc484-01.yale.internal:8888";
var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var leftcounter = 0;
var progress = 0;
var next = false
var exit = false

// TODO: keep track of non-motion to reset everything
var nonrightcounter = 0;
var nonleftcounter = 0;
var nopeoplecounter = 0;

var info = document.getElementById("info")

// If left hand above head for x time, then go back to home
export function returnHome(frame) {

    // check if left hand is raised
    leftcounter += handLeftDetection(frame);
    if (leftcounter > 0) {
        progressReturn( leftcounter );
        console.log("left hand raised: ", leftcounter);
        if (leftcounter > 30) {
            exit = true;
            window.location.replace("landing");
            exit = false
        }
    }
    else {
        // document.getElementsByClassName('progress-bar').item(0).className = "progress-bar;
        leftcounter = 0;
        progress = 0;
        exit = false
    }
}

function progressReturn( leftcounter ) {
    progress = Math.floor(leftcounter/30*100)
    document.getElementsByClassName('progress-bar').item(0).className = "progress-bar bg-warning";
    document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(progress)+'%');
}

// If user is in the same position for x time, then go to message.html
export function positionProcess(frame) {

    // Check whether they in message 1, message 2, or message 3 range (x-axis)
    // Keep a counter of how long they stand in each grid position (1, 2, 3)
    // Once a grid area reaches counter for 30 frames on it, then redirect to message!
    // IDEA: counter array: [no one there, message 1, message 2, message 3]
    //          counters[getGridPosition(frame)]++
    //          if (counters[getGridPosition(frame)] > 30 && getGridPosition(frame) != 0) { // open message! }
    //          else { // no one there, there to landing}

}

