var host = "cpsc484-02.yale.internal:8888";

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

        // If hand above head for x time, then go to selection.html
        if (false) {
            window.location.replace("selection.html")
        }
        console.log(frame);
    }
    
};

// Process the frame to determine that the hand is above the head
function handDetection(frame) {
    
}
