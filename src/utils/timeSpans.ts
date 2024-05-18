import { TimeSpan } from 'src/types/TimeSpan';

// TODO: These three should run on server ticks.
export const getTime = Date.now;

/**
 * Convert a value in ticks (currently millseconds, will change) to seconds
 */
export function ticksToDuration(ticks: number) {
    return ticks / 1000;
}
/**
 * Convert a value in seconds to ticks (currently millseconds, will change)
 */
export function durationToTicks(duration: number) {
    return duration * 1000;
}

export function hasCompleted(span: TimeSpan, currentTime = getTime()) {
    return span.endTime <= currentTime;
}

export function determineEndTime(duration: number, startTime = getTime()) {
    return startTime + durationToTicks(duration);
}

export function getCompletedFraction(startTime: number, endTime: number, currentTime = getTime()) {
    const fraction = (currentTime - startTime) / (endTime - startTime);

    return Math.max(0, Math.min(1, fraction));
}

export function adjustDuration(existingSpan: TimeSpan, newDuration: number, currentTime = getTime()): TimeSpan {
    const remainingFraction = 1 - getCompletedFraction(existingSpan.startTime, existingSpan.endTime, currentTime);
    const newTimeSpan = durationToTicks(newDuration);

    const newEndTime = Math.round(currentTime + newTimeSpan * remainingFraction);
    const newStartTime = newEndTime - newTimeSpan;
    
    const newSpan = {
        startTime: newStartTime,
        endTime: newEndTime,
    };

    return newSpan;
}