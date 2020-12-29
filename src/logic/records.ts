export function partialValues<T, X extends string | number | symbol>(
    items: Partial<Record<X, T>>
) {
    return Object.values(items) as T[];
}