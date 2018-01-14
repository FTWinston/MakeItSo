export interface Vector<T extends Vector<T>> {
    clone(): T;

    add(other: T): T;

    scale(factor: number): T;

    dot(other: T): number;
}
