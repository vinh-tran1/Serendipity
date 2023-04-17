import { handLeftDetection, handRightDetection, handAnyDetection, getGridPosition } from "./utilityFunctions.js";

var host = "cpsc484-01.yale.internal:8888";
// var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var rightcounter = 0;
var leftcounter = 0;
var next = false
var exit = false

// TODO: keep track of non-motion to reset everything
var nonrightcounter = 0;
var nonleftcounter = 0;
var nopeoplecounter = 0;

var loading = document.getElementById("loading");
var ring = document.getElementById("timer-ring")
var fill = document.getElementById("time-fill")
var exitring = document.getElementById("exit-ring")
var exitfill = document.getElementById("exit-fill")
var exit = document.getElementById("exit");

// If right hand above head for x time, then go to selection.html
export function handContinue(frame) {
    // console.log(next)
    // check if right hand is raised
    if (handRightDetection(frame) == 1) {
        rightcounter += handRightDetection(frame);
        if (rightcounter > 0) {
            console.log("right hand raised: ", rightcounter);
            fill.hidden = false;
            loading.innerHTML = Math.trunc((30 - rightcounter)/3);
            if (rightcounter > 30) {
                next = true;
                console.log("time to go next: ", next)
                // window.location.replace("selection.html");
            }
        }
    }
    else {
        rightcounter = 0;
        next = false
    }

    return next
}

// If left hand above head for x time, then go back to home
export function returnHome(frame) {

    // check if left hand is raised
    leftcounter += handLeftDetection(frame);
    if (leftcounter > 0) {
        console.log("left hand raised: ", leftcounter);
        exitring.hidden = false;
        exitfill.hidden = false;
        exit.innerHTML = "Exiting...";
        if (leftcounter > 30) {
            exit = true;
            window.location.landing("landing");
            exit = false
        }
    }
    else {
        exit = false
    }
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

