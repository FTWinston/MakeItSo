/**
 * Helps combining a set of strings into one string that can be passed directly to a React className property.
 * Accepts any number of strings, null or undefined's. Any non-empty strings are kept as eligible class names.
 * null/undefined values are ignored. The return value is either a string (consisting of all eligible class names separated by spaces), 
 * or undefined if there are none.
 */
export function classNames(...args: (string | null | undefined)[]) {
    const values = args.filter((arg) => !!arg) as string[];
    return values.length === 0 ? undefined : values.join(' ');
}