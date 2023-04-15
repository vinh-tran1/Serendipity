import { handLeftDetection, handRightDetection, handAnyDetection, getGridPosition } from "./utilityFunctions.js";

var host = "cpsc484-01.yale.internal:8888";
// var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var rightcounter = 0;
var leftcounter = 0;

var nonrightcounter = 0;
var nonleftcounter = 0;

var nopeoplecounter = 0;

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
        var loading = document.getElementById("loading");
        var ring = document.getElementById("timer-ring")
        var fill = document.getElementById("time-fill")
        var exitring = document.getElementById("exit-ring")
        var exitfill = document.getElementById("exit-fill")
        var exit = document.getElementById("exit");

        console.log(frame)

        // window.location.replace("selection");

        if (frame.people.length > 0) {
            // If right hand above head for x time, then go to selection.html
            rightcounter += handRightDetection(frame);
            if (rightcounter > 0) {
                console.log("right hand raised: ", rightcounter);
                fill.hidden = false;
                loading.innerHTML = Math.trunc((30 - rightcounter)/3);
                if (leftcounter > 30) {
                    window.location.replace("selection");
                }
            }

            // If left hand above head for x time, then go back to home
            leftcounter += handLeftDetection(frame);
            if (leftcounter > 0) {
                console.log("left hand raised: ", leftcounter);
                exitring.hidden = false;
                exitfill.hidden = false;
                exit.innerHTML = "Exiting...";
                if (leftcounter > 30) {
                    window.location.landing("landing");
                }
            }
        }
    }
    
};
