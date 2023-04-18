import { handLeftDetection, handRightDetection, handAnyDetection, getGridPosition } from "./utilityFunctions.js";

var host = "cpsc484-01.yale.internal:8888";
// var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var leftcounter = 0;
var next = false
var exit = false

// TODO: keep track of non-motion to reset everything
var nonrightcounter = 0;
var nonleftcounter = 0;
var nopeoplecounter = 0;

var exitring = document.getElementById("exit-ring")
var exitfill = document.getElementById("exit-fill")
var exit = document.getElementById("exit");

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
            window.location.replace("landing");
            exit = false
        }
    }
    else {
        exit = false
    }
}
