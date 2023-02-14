type MapKey = string | number | symbol;

/*
export function objectToObject<TKey extends MapKey, TValue, TResult>(
    object: Readonly<Record<TKey, TValue>>,
    transform: (value: TValue, key: TKey) => TResult | undefined
): Record<TKey, TResult>;
export function objectToObject<TKey extends MapKey, TValue>(
    object: Readonly<Record<TKey, TValue>>
): Record<TKey, TValue>;
export function objectToObject<TKey extends MapKey, TValue, TResult>(
    object: Readonly<Record<TKey, TValue>>,
    transform?: (value: TValue, key: TKey) => TResult | undefined
): Record<TKey, TValue | TResult> {
    const result = {} as Record<TKey, TValue | TResult>;

    for (const [key, sourceValue] of Object.entries<TValue>(object)) {
        const destinationValue = transform === undefined ? sourceValue : transform(sourceValue, key as TKey);

        if (destinationValue !== undefined) {
            result[key as TKey] = destinationValue;
        }
    }

    return result;
}
*/

export function arrayToObject<TKey extends MapKey, TValue>(
    array: ReadonlyArray<TValue>,
    getKey: (value: TValue) => TKey | undefined
): Record<TKey, TValue> {
    const result = {} as Record<TKey, TValue>;
    for (const entry of array) {
        const key = getKey(entry);

        if (key !== undefined) {
            result[key as TKey] = entry;
        }
    }

    return result;
}

/*
export function objectToArray<TKey extends MapKey, TValue, TResult>(
    object: Readonly<Record<TKey, TValue>>,
    transform: (value: TValue, key: TKey) => TResult | undefined
): TResult[] {
    const result: TResult[] = [];

    for (const [key, sourceValue] of Object.entries<TValue>(object)) {
        const destinationValue = transform(sourceValue, key as TKey);

        if (destinationValue !== undefined) {
            result.push(destinationValue);
        }
    }

    return result;
}
*/

export function arrayToMap<TKey, TValue>(
    items: readonly TValue[], getKey: (value: TValue) => TKey,
): Map<TKey, TValue> {
    return new Map<TKey, TValue>(
        items.map(item => [getKey(item), item])
    );
}

export function getLast<TValue>(values: TValue[]) {
    return values[values.length - 1];
}