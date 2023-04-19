import { returnHome, goToNext } from "./main.js";
import { handRightDetection, handLeftDetection } from "./utilityFunctions.js";

// var host = "cpsc484-02.yale.internal:8888";
var host = "127.0.0.1:4444"; // recorded data


$(document).ready(function () {
    frames.start();
});

var rightcounter = 0;
var progress = 0;
var page = "create";

var info = document.getElementById("info");

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
        goToNext(frame, page);
        returnHome(frame);
        if (handRightDetection(frame) == 0 && handLeftDetection(frame) == 0) {
            info.innerHTML = "Hold up right hand to leave your own message!"
        }
        if (handLeftDetection(frame) == 1) {
            info.innerHTML = "Returning to Homepage. . .";
        }
    }

};