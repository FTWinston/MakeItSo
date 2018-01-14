export interface Vector<T extends Vector<T>> {
    clone(): T;

    add(other: T): T;

    subtract(other: T): T;

    scale(factor: number): T;

    isBetween(min: T, max: T): boolean;

    dot(other: T): number;
}
