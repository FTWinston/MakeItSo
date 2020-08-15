export interface Progression {
    duration: number;
    endTime: number;
}

// TODO: These three should run on server ticks.
export const getTime = Date.now;

function timeSpanToDuration(timeSpan: number) {
    return timeSpan / 1000;
}

function durationToTimeSpan(duration: number) {
    return duration * 1000;
}



export function hasCompleted(progression: Progression, currentTime = getTime()) {
    return progression.endTime <= currentTime;
}

export function determineEndTime(duration: number, currentTime = getTime()) {
    return currentTime + durationToTimeSpan(duration);
}

export function determineUpdatedEndTime(duration: number, previousProgression: Progression, currentTime = getTime()) {
    const remainingFraction = 1 - getCompletedFraction(previousProgression, currentTime);

    return currentTime + durationToTimeSpan(duration * remainingFraction);
}

export function getCompletedFraction(progression: Progression, currentTime = getTime()) {
    const remaining = timeSpanToDuration(progression.endTime - currentTime);

    const fraction = (progression.duration - remaining) / progression.duration;

    return Math.max(0, Math.min(1, fraction));
}
