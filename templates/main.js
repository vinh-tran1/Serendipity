import { handLeftDetection, handRightDetection, handAnyDetection, getGridPosition } from "../utilityFunctions";

var host = "cpsc484-02.yale.internal:8888";

$(document).ready(function () {
    frames.start();
});

var counter = 0

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

        // If hand above head for x time, then go to selection.html
        counter += handDetection(frame)
        loading.innerHTML = Math.floor((30 - counter)/3);

        if (counter > 30) {
            window.location.replace("selection.html")
        }
        console.log(counter);
    }
    
};

// Process the frame to determine that the hand is above the head
function handDetection(frame) {
    if (frame.people[0].joints[26].position.y > frame.people[0].joints[15].position.y){
        return 1
    }
    return 0

}
