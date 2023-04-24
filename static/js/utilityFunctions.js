// Note: we multiply positions by -1 because the user is facing the kinect sensor so we need to reverse the direction

// Right Hand Raise
export function handRightDetection(frame) {
    if (frame.people.length > 0) {
        //normalize by subtracting the pelvis joint coordinates
        var pelvis_y = frame.people[0].joints[0].position.y;
        var right_hand_y = (frame.people[0].joints[15].position.y - pelvis_y) * -1;
        var head_y = (frame.people[0].joints[26].position.y - pelvis_y) * -1;

        if (right_hand_y > head_y)
            return 1;
    }
    return 0;
}

// Left Hand Raise
export function handLeftDetection(frame) {
    if (frame.people.length > 0) {
        //normalize by subtracting the pelvis joint coordinates
        var pelvis_y = frame.people[0].joints[0].position.y;
        var left_hand_y = (frame.people[0].joints[8].position.y - pelvis_y) * -1;
        var head_y = (frame.people[0].joints[26].position.y - pelvis_y) * -1;

        if (left_hand_y > head_y)
            return 1;
    }
    return 0;
}

// Both Hand Raise
export function handBothDetection(frame) {
    if (frame.people.length > 0) {
        //normalize by subtracting the pelvis joint coordinates
        var pelvis_y = frame.people[0].joints[0].position.y;
        var right_hand_y = (frame.people[0].joints[15].position.y - pelvis_y) * -1;
        var left_hand_y = (frame.people[0].joints[8].position.y - pelvis_y) * -1;
        var head_y = (frame.people[0].joints[26].position.y - pelvis_y) * -1;

        if (right_hand_y > head_y && left_hand_y > head_y)
            return 1;
    }
    return 0;
}

// Returns if user is standing at envelope 1, 2, or 3
export function getGridPosition(frame) {
    var gridPostion = 0; //not in frame

    if (frame.people.length > 0) {
        // Using absolute positioning instead of relative to pelvis
        var leftBound = -2000; var first_x = -480; var second_x = 380; var rightBound = 1600;

        var chest_x = frame.people[0].joints[2].position.x * -1;

        if (chest_x > leftBound && chest_x <= first_x) //first envelope
            gridPostion = 1;
        else if (chest_x > first_x && chest_x <= second_x) //second envelope
            gridPostion = 2;
        else if (chest_x > second_x && chest_x <= rightBound) //third envelope
            gridPostion = 3;
    
    }
    
    return gridPostion;
}

//finds closest user... don't know whether to use bodyID or index??
//implementation:
//var index = closestUser(frame);
//call this up there like frame.people[index].joints[2].position.x etc.....
function closestUser(frame) {
    var min = 1;

    for (var i = 0; i < frames.people.length; i++){
        if (min > frames.people[i].joints[0].position.z)
            min = i;
            //min = frames.people[i].body_id;
    }

    return min;
}

// var userID = null;
// var trackedUser = null;

// // determine what user to track
// // refresh if user leaves
// function getUser(frame) {
//     userID = frame.people[0].body_id;
//     trackedUser = frame.people[0]
// }

// // tracks the first user to come into display
// // refreshes after user leaves 

// function trackUser(frame) {
//     const peopleArr = [];
//     for (let i = 0; i < frame.people.length; i++) {
//         peopleArr[i] = frame.people[i];
//     }
//     if peopleArr.includes(userID) {
//         return trackedUser
//     } 
//     else {
//         getUser(frame);
//     }

//     var trackedUserID = frame.people[0].body_id;
//     console.log(frame)
//     console.log(trackedUserID)

//     // if tracked user still in frame
//     for (let i = (frame.people.length - 1); i >= 0; i--) {
//         if (trackedUserID == frame.people[i].body_id) {
//             trackedUser = frame.people[i];
//         }
//     }
//     return trackedUser
// }