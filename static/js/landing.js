// import { handContinue } from "./main.js";
import { handRightDetection } from "./utilityFunctions.js";

var host = "cpsc484-02.yale.internal:8888";
// var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var rightcounter = 0

var loading = document.getElementById("loading");
var ring = document.getElementById("timer-ring");
var fill = document.getElementById("time-fill");

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
        //console.log("chest position: " + frame.people[0].joints[2].position.x * -1);
        goToSelection(frame);
    }
    
};

function goToSelection(frame) {
    // check if right hand raised
    if (handRightDetection(frame) == 1) {
        rightcounter += handRightDetection(frame)
        if (rightcounter > 0) {
            console.log("right hand raised: ", rightcounter);
            fill.hidden = false;
            loading.innerHTML = Math.trunc((30 - rightcounter)/6);
            if (rightcounter > 30) {
                window.location.replace("selection");
            }
        }
    }
    else {
        fill.hidden = true;
        loading.innerHTML = 5;
        rightcounter = 0;
    }
}