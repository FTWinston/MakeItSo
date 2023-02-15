import { Keyframe, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { numbersEqual } from 'src/types/Vector2D';
import { getLast } from 'src/utils/arrays';

function keyframesEqual(keyframe1: Keyframe<Position>, keyframe2: Keyframe<Position>) {
    return numbersEqual(keyframe1.time, keyframe2.time)
        && numbersEqual(keyframe1.val.x, keyframe2.val.x)
        && numbersEqual(keyframe1.val.y, keyframe2.val.y)
        && numbersEqual(keyframe1.val.angle, keyframe2.val.angle);
}

export function appendMotion(target: Keyframes<Position>, toAdd: Keyframes<Position>) {
    if (target.length === 0) {
        target.push(...toAdd);
        return;
    }

    const lastExisting = getLast(target);
    const firstNew = toAdd[0];

    // If the first keyframe new is the same as the last existing one, don't add that frame,
    // or the ship will briefly slow down.
    if (keyframesEqual(lastExisting, firstNew)) {
        toAdd = toAdd.slice(1);
    }

    target.push(...toAdd);
}
