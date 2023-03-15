import { horizontalHexSpacing, verticalHexSpacing } from 'src/features/spacemap';
import { Keyframe, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { clampAngle, getClosestOrthogonalAngle, rotatePolar } from 'src/types/Vector2D';
import { durationToTicks } from 'src/utils/timeSpans';
import { ManeuverInfo, ManeuverType } from '../types/ManeuverType';

type ManeuverContent = Omit<ManeuverInfo, 'type'>;

// These all assume that 0 is to the right
const angleRight = 0;
const angleUpRight = -Math.PI / 3;
const angleDownRight = Math.PI / 3;
const angleUpLeft = -2 * Math.PI / 3;
const angleDownLeft = 2 * Math.PI / 3;
const angleLeft = Math.PI;

const maneuverDataByIdentifier: Map<ManeuverType, ManeuverContent> = new Map([
    [ManeuverType.SlowForward, {
        minPower: 1,
        evasion: 0,
        motion: [{
            time: 0,
            val: {
                x: 0,
                y: 0,
                angle: angleRight,
            }
        }, {
            time: durationToTicks(2),
            val: {
                x: horizontalHexSpacing * 2,
                y: 0,
                angle: angleRight,
            }
        }]
    }],
    [ManeuverType.SweepLeft, {
        minPower: 2,
        evasion: 15,
        motion: [{
            time: 0,
            val: {
                x: 0,
                y: 0,
                angle: angleRight,
            }
        }, {
            time: durationToTicks(1),
            val: {
                x: horizontalHexSpacing * 0.89,
                y: -verticalHexSpacing * 0.23,
                angle: (angleRight + angleUpRight) / 2,
            }
        }, {
            time: durationToTicks(2),
            val: {
                x: horizontalHexSpacing * 1.5,
                y: -verticalHexSpacing,
                angle: angleUpRight,
            }
        }]
    }],
    [ManeuverType.SweepRight, {
        minPower: 2,
        evasion: 15,
        motion: [{
            time: 0,
            val: {
                x: 0,
                y: 0,
                angle: angleRight,
            }
        }, {
            time: durationToTicks(1),
            val: {
                x: horizontalHexSpacing * 0.89,
                y: verticalHexSpacing * 0.23,
                angle: (angleRight + angleDownRight) / 2,
            }
        }, {
            time: durationToTicks(2),
            val: {
                x: horizontalHexSpacing * 1.5,
                y: verticalHexSpacing,
                angle: angleDownRight,
            }
        }]
    }],
    [ManeuverType.HardLeft, {
        minPower: 3,
        evasion: 30,
        motion: [{
            time: 0,
            val: {
                x: 0,
                y: 0,
                angle: angleRight,
            }
        }, {
            time: durationToTicks(1),
            val: {
                x: horizontalHexSpacing * 0.8,
                y: -verticalHexSpacing * 0.25,
                angle: angleUpRight,
            }
        }, {
            time: durationToTicks(2),
            val: {
                x: horizontalHexSpacing * 0.5,
                y: -verticalHexSpacing,
                angle: angleUpLeft,
            }
        }]
    }],
    [ManeuverType.HardRight, {
        minPower: 3,
        evasion: 30,
        motion: [{
            time: 0,
            val: {
                x: 0,
                y: 0,
                angle: angleRight,
            }
        }, {
            time: durationToTicks(1),
            val: {
                x: horizontalHexSpacing * 0.8,
                y: verticalHexSpacing * 0.25,
                angle: angleDownRight,
            }
        }, {
            time: durationToTicks(2),
            val: {
                x: horizontalHexSpacing * 0.5,
                y: verticalHexSpacing,
                angle: angleDownLeft,
            }
        }]
    }],
    [ManeuverType.DriftLeft, {
        minPower: 3,
        evasion: 30,
        motion: [{
            time: 0,
            val: {
                x: 0,
                y: 0,
                angle: angleRight,
            }
        }, {
            time: durationToTicks(1),
            val: {
                x: horizontalHexSpacing,
                y: 0,
                angle: (angleUpLeft + angleUpRight) / 2,
            }
        }, {
            time: durationToTicks(2),
            val: {
                x: horizontalHexSpacing * 2,
                y: -verticalHexSpacing * 0.3,
                angle: (angleUpLeft + angleUpRight) / 2,
            }
        }, {
            time: durationToTicks(3),
            val: {
                x: horizontalHexSpacing * 2.5,
                y: -verticalHexSpacing,
                angle: angleUpRight,
            }
        }],
        ghostFrames: [1],
    }],
    [ManeuverType.DriftRight, {
        minPower: 3,
        evasion: 30,
        motion: [{
            time: 0,
            val: {
                x: 0,
                y: 0,
                angle: angleRight,
            }
        }, {
            time: durationToTicks(1),
            val: {
                x: horizontalHexSpacing,
                y: 0,
                angle: (angleDownLeft + angleDownRight) / 2,
            }
        }, {
            time: durationToTicks(2),
            val: {
                x: horizontalHexSpacing * 2,
                y: verticalHexSpacing * 0.3,
                angle: (angleDownLeft + angleDownRight) / 2,
            }
        }, {
            time: durationToTicks(3),
            val: {
                x: horizontalHexSpacing * 2.5,
                y: verticalHexSpacing,
                angle: angleDownRight,
            }
        }],
        ghostFrames: [1],
    }],
    [ManeuverType.ClockwiseSpin, {
        minPower: 3,
        evasion: 40,
        motion: [] // TODO
    }],
    [ManeuverType.CounterclockwiseSpin, {
        minPower: 3,
        evasion: 40,
        motion: [] // TODO
    }],
]);

function applyOffset(motion: Keyframes<Position>, offset: Keyframe<Position>): Keyframes<Position> {
    const roundedOffsetAngle = getClosestOrthogonalAngle(offset.val.angle);

    return motion
        .map(keyframe => {
            const rotatedPosition = rotatePolar(keyframe.val, roundedOffsetAngle);

            return {
                time: keyframe.time + offset.time,
                val: {
                    x: rotatedPosition.x + offset.val.x,
                    y: rotatedPosition.y + offset.val.y,
                    angle: clampAngle(keyframe.val.angle + roundedOffsetAngle),
                }
            };
        });
}

export function getManeuver(type: ManeuverType, offset: Keyframe<Position>): ManeuverInfo {
    const data = maneuverDataByIdentifier.get(type);
    
    if (data === undefined) {
        throw new Error(`Maneuver not found: ${type}`);
    }

    return {
        type,
        minPower: data.minPower,
        evasion: data.evasion,
        motion: applyOffset(data.motion, offset),
        ghostFrames: data.ghostFrames,
    }
}
