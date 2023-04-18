import { returnHome } from "./main.js";

// var host = "cpsc484-02.yale.internal:8888";
var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var rightcounter = 0;

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.run(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        returnHome(frame);
        goToCreate(frame);
    }

};

function goToCreate(frame) {
    // check if right hand raised
    if (handRightDetection(frame) == 1) {
        rightcounter += handRightDetection(frame)
        if (rightcounter > 0) {
            console.log("right hand raised: ", rightcounter);
            if (rightcounter > 30) {
                window.location.replace("create");
            }
        }
    }
    else {
        rightcounter = 0;
    }
};