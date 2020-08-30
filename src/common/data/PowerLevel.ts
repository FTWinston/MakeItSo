export enum PowerLevel {
    Off = 0,
    Low,
    Med,
    High,
    Full,
}

export function getPowerName(power?: PowerLevel) {
    switch (power) {
        case PowerLevel.Off:
            return 'Disabled';
        case PowerLevel.Low:
            return 'Low Power';
        case PowerLevel.Med:
            return 'Med Power';
        case PowerLevel.High:
            return 'High Power';
        case PowerLevel.Full:
            return 'Full Power';
        default:
            return '';
    }
}
