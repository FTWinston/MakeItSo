export interface Countdown {
    duration: number;
    endTime: number;
}

export function getCompletedFraction(countdown: Countdown) {
    const remaining = countdown.endTime - Date.now();
    return (countdown.duration - remaining / 1000) / countdown.duration;
}