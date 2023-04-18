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


