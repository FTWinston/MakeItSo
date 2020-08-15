export interface Progression {
    duration: number;
    endTime: number;
}

export function getTime() {
    return Date.now();
}

export function getEndTime(duration: number) {
    return getTime() + duration * 1000;
}

export function getCompletedFraction(countdown: Progression) {
    const remaining = countdown.endTime - getTime();
    return (countdown.duration - remaining / 1000) / countdown.duration;
}