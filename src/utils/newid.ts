import { nanoid } from 'nanoid/non-secure';

/**
 * Generate a new, random string, for use as an ID.
 */
export function newid() {
    return nanoid();
}