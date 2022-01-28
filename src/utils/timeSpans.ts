import { TimeSpan } from 'src/types/TimeSpan';

// TODO: These three should run on server ticks.
export const getTime = Date.now;

export function timeSpanToDuration(timeSpan: number) {
    return timeSpan / 1000;
}

export function durationToTimeSpan(duration: number) {
    return duration * 1000;
}


export function hasCompleted(span: TimeSpan, currentTime = getTime()) {
    return span.endTime <= currentTime;
}

export function determineEndTime(duration: number, startTime = getTime()) {
    return startTime + durationToTimeSpan(duration);
}

export function determineUpdatedEndTime(duration: number, previousSpan: TimeSpan, currentTime = getTime()) {
    const remainingFraction = 1 - getCompletedFraction(previousSpan.startTime, previousSpan.endTime, currentTime);

    return currentTime + durationToTimeSpan(duration * remainingFraction);
}

export function getCompletedFraction(startTime: number, endTime: number, currentTime = getTime()) {
    const fraction = (currentTime - startTime) / (endTime - startTime);

    return Math.max(0, Math.min(1, fraction));
}
