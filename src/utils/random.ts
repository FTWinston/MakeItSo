export function getRandomInt(maxExclusive: number) {
    return Math.floor(Math.random() * maxExclusive);
}

export function getRandom<T>(values: T[]): T {
    return values[getRandomInt(values.length)];
}
