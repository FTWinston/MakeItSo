// Use this in reducers to ensure we've handled all options, but not fail when reducer is called for default state etc.
export function exhaustiveActionCheck(nothing: never) { }