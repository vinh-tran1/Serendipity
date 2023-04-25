var trackedUser = null;
var userID = null;
var min = Infinity;
var group = [];
var gridPostion = 0; //not in frame

// Note: we multiply positions by -1 because the user is facing the kinect sensor so we need to reverse the direction

// Right Hand Raise
export function handRightDetection(frame) {
    if (frame.people.length > 0) {
        trackedUser = trackUser(frame);
        //normalize by subtracting the pelvis joint coordinates
        var pelvis_y = trackedUser.joints[0].position.y;
        var right_hand_y = (trackedUser.joints[15].position.y - pelvis_y) * -1;
        var head_y = (trackedUser.joints[26].position.y - pelvis_y) * -1;

        if (right_hand_y > head_y)
            return 1;
    }
    return 0;
}

// Left Hand Raise
export function handLeftDetection(frame) {
    if (frame.people.length > 0) {
        trackedUser = trackUser(frame);
        //normalize by subtracting the pelvis joint coordinates
        var pelvis_y = trackedUser.joints[0].position.y;
        var left_hand_y = (trackedUser.joints[8].position.y - pelvis_y) * -1;
        var head_y = (trackedUser.joints[26].position.y - pelvis_y) * -1;

        if (left_hand_y > head_y)
            return 1;
    }
    return 0;
}

// Both Hand Raise
export function handBothDetection(frame) {
    if (frame.people.length > 0) {
        trackedUser = trackUser(frame);
        //normalize by subtracting the pelvis joint coordinates
        var pelvis_y = trackedUser.joints[0].position.y;
        var right_hand_y = (trackedUser.joints[15].position.y - pelvis_y) * -1;
        var left_hand_y = (trackedUser.joints[8].position.y - pelvis_y) * -1;
        var head_y = (trackedUser.joints[26].position.y - pelvis_y) * -1;

        if (right_hand_y > head_y && left_hand_y > head_y)
            return 1;
    }
    return 0;
}

// Returns if user is standing at envelope 1, 2, or 3
export function getGridPosition(frame) {
    if (frame.people.length > 0) {
        trackedUser = trackUser(frame);
        // Using absolute positioning instead of relative to pelvis
        var leftBound = -2000; var first_x = -480; var second_x = 380; var rightBound = 1600;

        var chest_x = trackedUser.joints[2].position.x * -1;

        if (chest_x > leftBound && chest_x <= first_x) //first envelope
            gridPostion = 1;
        else if (chest_x > first_x && chest_x <= second_x) //second envelope
            gridPostion = 2;
        else if (chest_x > second_x && chest_x <= rightBound) //third envelope
            gridPostion = 3;
    }
    else {
        gridPostion = 0;
    }
    
    return gridPostion;
}

//finds closest user... don't know whether to use bodyID or index??
//implementation:
//var index = closestUser(frame);
//call this up there like frame.people[index].joints[2].position.x etc.....
function closestUser(frame) {
    for (var i = 0; i < frame.people.length; i++) {
        // normalize main body parts
        if (min > frame.people[i].joints[0].position.z)
            min = frame.people[i].body_id;
    }

    userID = min;
    return userID;
}

// return IDs of everyone in frame
function trackGroup(frame) {
    for (let i = 0; i < frame.people.length; i++) {
        group[i] = frame.people[i].body_id;
    }

    return group;
}

// constantly get IDs of people in front of display
// if not tracking user, get closet user ID
// if closest user remains in front of display, track and persist tracking user
// if tracked user goes out of display, reset tracked user
function trackUser(frame) {
    trackGroup(frame);
    if (userID == null && trackedUser == null) {
        closestUser(frame);
    }
    else if (group.includes(userID)) {
        for (let i = 0; i < frame.people.length; i++) {
            if (frame.people[i].body_id == userID) {
                trackedUser = frame.people[i];
            }
        }
    }
    else {
        min = Infinity;
        userID = null;
        trackedUser = null;
    }

    group = [];
    return trackedUser
}