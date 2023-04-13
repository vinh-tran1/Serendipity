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

// Return Grid Position
export function getGridPosition(frame) {
    // I don't think I need to normalize joint positions, I need absolute position?
    // normalize by subtracting the pelvis joint coordinates
    // var pelvis_x = frame.people[0].joints[0].position.x;
    // var pelvis_y = frame.people[0].joints[0].position.y;
    // var pelvis_z = frame.people[0].joints[0].position.z;
    // var chest_x = (frame.people[0].joints[2].position.x - pelvis_x) * -1;
    // var chest_y = (frame.people[0].joints[2].position.y - pelvis_y) * -1;
    // var chest_z = (frame.people[0].joints[2].position.z - pelvis_z) * -1;

    var chest_x = frame.people[0].joints[2].position.x * -1;
    var chest_y = frame.people[0].joints[2].position.y * -1;
    var chest_z = frame.people[0].joints[2].position.z * -1;

    //store x,y,z coordinates of chest in array
    const getGridPosition = [chest_x, chest_y, chest_z];

    return getGridPosition;
}
