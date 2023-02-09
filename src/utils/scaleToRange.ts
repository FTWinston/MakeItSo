function getClampedFraction(value: number, range: [number, number]) {
    const [rangeMin, rangeMax] = range;

    if (value <= rangeMin) {
        return 0;
    }
    if (value >= rangeMax) {
        return 1;
    }

    return (value - rangeMin) / (rangeMax - rangeMin);
}

export function scaleToRange(value: number, inputRange: [number, number], outputRange: [number, number]) {
    var clampedValue = getClampedFraction(value, inputRange);

    const [outputMin, outputMax] = outputRange;

    return outputMin + (outputMax - outputMin) * clampedValue;
}