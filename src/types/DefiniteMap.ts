/**
 * As per a `Map`, but `get` must never return `undefined`.
 */
export type DefiniteMap<K, V> = Omit<Map<K, V>, 'get'> & {
    /**
     * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
     * @returns Returns the element associated with the specified key.
     */
     get(key: K): V;
}