import { ManeuverInfo, ManeuverType } from '../types/ManeuverType';

type ManeuverContent = Omit<ManeuverInfo, 'type'>;

const maneuverDataByIdentifier: Map<ManeuverType, ManeuverContent> = new Map([
    [ManeuverType.SlowForward, {
        minPower: 1,
        evasion: 0,
        motion: [{
            time: 0,
            val: {
                x: 0,
                y: 0,
                angle: 0,
            }
        }, {
            time: 2,
            val: {
                x: 2,
                y: 0,
                angle: 0,
            }
        }]
    }],
    [ManeuverType.SweepLeft, {
        minPower: 2,
        evasion: 15,
        motion: [] // TODO
    }],
    [ManeuverType.SweepRight, {
        minPower: 2,
        evasion: 15,
        motion: [] // TODO
    }],
    [ManeuverType.HardLeft, {
        minPower: 4,
        evasion: 30,
        motion: [] // TODO
    }],
    [ManeuverType.HardRight, {
        minPower: 4,
        evasion: 30,
        motion: [] // TODO
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

export function getManeuver(type: ManeuverType): ManeuverInfo {
    // TODO: if we don't care about adding in a unique ID here,
    // then don't bother assembling an object to return. Just store the final deal!

    const data = maneuverDataByIdentifier.get(type);
    
    if (data === undefined) {
        throw new Error(`Maneuver not found: ${type}`);
    }

    return {
        type,
        ...data,
    }
}