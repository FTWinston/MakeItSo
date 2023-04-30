export function getRandomInt(maxExclusive: number) {
    return Math.floor(Math.random() * maxExclusive);
}

export function getRandom<T>(values: T[]): T {
    return values[getRandomInt(values.length)];
}

export function insertRandom<T>(array: T[], value: T) {
    const index = getRandomInt(array.length + 1);
    array.splice(index, 0, value);
}
