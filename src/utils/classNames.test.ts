import { classNames } from "./classNames";

test('classNames with no params should return undefined', () => {
    expect(classNames()).toBe(undefined);
});

test('classNames with null/undefined/empty should return undefined', () => {
    expect(classNames(null, undefined, '')).toBe(undefined);
});

test('classNames with string should return the string', () => {
    expect(classNames(null, 'hello', undefined, '')).toBe('hello');
});

test('classNames with multiple strings should return the strings joined with spaces', () => {
    expect(classNames(null, 'hello', undefined, 'goodbye', 'welcome', '', null)).toBe('hello goodbye welcome');
});