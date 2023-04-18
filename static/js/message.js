import { handContinue, returnHome } from "./main.js";

// var host = "cpsc484-02.yale.internal:8888";
var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    frames.start();
});

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.run(JSON.parse(event.data));
        }
    },

    run: function (frame) {

        // Checks if sufficient right hand raise to continue
        // if (handContinue(frame)) {
        //     window.location.replace("create");
        // }
        goToCreate(frame);
        // Checks if sufficient left hand raise to quit
        returnHome(frame);
    }

};

function goToCreate(frame) {
    var next = handContinue(frame)
    console.log(next)
    if (next == true) {
        window.location.replace("create")
        return 0;
    }
};