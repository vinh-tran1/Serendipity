import { handLeftDetection, handRightDetection, handBothDetection, getGridPosition } from "./utilityFunctions.js";

var host = "cpsc484-01.yale.internal:8888";
// var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var leftcounter = 0;
var rightcounter = 0;
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
    if (handLeftDetection(frame) == 1) {
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
    };

    if (handLeftDetection(frame) == 0 && handRightDetection(frame) == 1) {
        leftcounter = 0;
        document.getElementsByClassName('progress-bar').item(0).className = "progress-bar";
        exit = false
    };

    if (handLeftDetection(frame) == 0 && handRightDetection(frame) == 0) {
        leftcounter = 0;
        progress = 0;
        document.getElementsByClassName('progress-bar').item(0).className = "progress-bar";
        document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(progress)+'%');
        exit = false
    };
};

function progressReturn( leftcounter ) {
    progress = Math.floor(leftcounter/30*100)
    document.getElementsByClassName('progress-bar').item(0).className = "progress-bar bg-warning";
    document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(progress)+'%');
}

export function goToNext(frame, page, message) {
    // check if right hand raised
    if (handRightDetection(frame) == 1) {
        rightcounter += handRightDetection(frame)
        if (rightcounter > 0) {
            info.innerHTML = message;
            console.log("right hand raised: ", rightcounter);
            progressContinue(rightcounter);
            if (rightcounter > 30) {
                document.getElementsByClassName('progress-bar').item(0).className = "progress-bar bg-success";
                window.location.replace(page);
            }
        }
    }
    else {
        restartCounter();
    }
};

function progressContinue( rightcounter ) {
    progress = Math.floor(rightcounter/30*100)
    document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(progress)+'%');
}


export function restartCounter() {
    rightcounter = 0;
    progress = 0;
    document.getElementsByClassName('progress-bar').item(0).className = "progress-bar";
    document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(progress)+'%');
}

// returns to home if no one is detected for a period of time
export function autoReturn(frame) {
    var isPerson = getGridPosition(frame);
    if (isPerson == 0) {
        nopeoplecounter++; 
        console.log("nobody there? ", nopeoplecounter);
        if (nopeoplecounter >= 100) {
            window.location.replace("landing");
        }
    }
    else{
        nopeoplecounter = 0;
    }
}