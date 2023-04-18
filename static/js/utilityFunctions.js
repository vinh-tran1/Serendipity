// Note: we multiply positions by -1 because the user is facing the kinect sensor so we need to reverse the direction

// Right Hand Raise
export function handRightDetection(frame) {
    //normalize by subtracting the pelvis joint coordinates
    var pelvis_y = frame.people[0].joints[0].position.y;
    var right_hand_y = (frame.people[0].joints[15].position.y - pelvis_y) * -1;
    var head_y = (frame.people[0].joints[26].position.y - pelvis_y) * -1;

    if (right_hand_y > head_y)
        return 1;

    return 0;
}

// Left Hand Raise
export function handLeftDetection(frame) {
    //normalize by subtracting the pelvis joint coordinates
    var pelvis_y = frame.people[0].joints[0].position.y;
    var left_hand_y = (frame.people[0].joints[8].position.y - pelvis_y) * -1;
    var head_y = (frame.people[0].joints[26].position.y - pelvis_y) * -1;

    if (left_hand_y > head_y)
        return 1;

    return 0;
}

// Any Hand Raise
export function handAnyDetection(frame) {
    //normalize by subtracting the pelvis joint coordinates
    var pelvis_y = frame.people[0].joints[0].position.y;
    var right_hand_y = (frame.people[0].joints[15].position.y - pelvis_y) * -1;
    var left_hand_y = (frame.people[0].joints[8].position.y - pelvis_y) * -1;
    var head_y = (frame.people[0].joints[26].position.y - pelvis_y) * -1;

    if (right_hand_y > head_y || left_hand_y > head_y)
        return 1;

    return 0;
}

// Returns if user is standing at envelope 1, 2, or 3
export function getGridPosition(frame) {
    // Using absolute positioning instead of relative to pelvis
    var leftBound = 0; var first_x = 100; var second_x = 400;
    var chest_x = frame.people[0].joints[2].position.x * -1;
    var gridPostion = 1;

    if (chest_x > leftBound && chest_x <= first_x) //first envelope
        gridPostion = 1;
    else if (chest_x > first_x && chest_x <= second_x) //second envelope
        gridPostion = 2;
    else //third envelope
        gridPostion = 3;

    return gridPostion;
}
