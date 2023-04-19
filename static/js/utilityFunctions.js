// Note: we multiply positions by -1 because the user is facing the kinect sensor so we need to reverse the direction

// might have to do something about body_ids to make it less cluttered

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

// Any Hand Raise
export function handAnyDetection(frame) {
    if (frame.people.length > 0) {
        //normalize by subtracting the pelvis joint coordinates
        var pelvis_y = frame.people[0].joints[0].position.y;
        var right_hand_y = (frame.people[0].joints[15].position.y - pelvis_y) * -1;
        var left_hand_y = (frame.people[0].joints[8].position.y - pelvis_y) * -1;
        var head_y = (frame.people[0].joints[26].position.y - pelvis_y) * -1;

        if (right_hand_y > head_y || left_hand_y > head_y)
            return 1;
    }
    return 0;
}

// Returns if user is standing at envelope 1, 2, or 3
export function getGridPosition(frame) {
    // Using absolute positioning instead of relative to pelvis

    //these bounds are if I were to go off the dots
    //var leftBound = -1780; var first_x = -700; var second_x = 690;

    //these bounds are if I go based of relative positioning of user
    var leftBound = -2000; var first_x = -480; var second_x = 380;

    var chest_x = frame.people[0].joints[2].position.x * -1;
    var gridPostion = 1;

    //console.log("location: " + chest_x);
    if (frame.people.length > 0) {
        if (chest_x > leftBound && chest_x <= first_x) //first envelope
            gridPostion = 1;
        else if (chest_x > first_x && chest_x <= second_x) //second envelope
            gridPostion = 2;
        else //third envelope
            gridPostion = 3;
    }
    return gridPostion;
}
