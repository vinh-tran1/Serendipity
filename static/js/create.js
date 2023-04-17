import { returnHome } from "./main.js";

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
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        returnHome(frame);          // left hand check to quit
    }

};
