/** Keep an outputs array up-to-date with an inputs array, by means of comparing an identity. */
export function projectValuesBetweenArrays<TInput, TOutput, TId>(
    inputs: TInput[],
    outputs: TOutput[],
    identify: (input: TInput | TOutput) => TId,
    project: (input: TInput) => TOutput
) {
    // Start with a set of all output IDs.
    const outputOnlyIdentifiers = new Set(outputs.map(identify));

    // For each input, see if it's in the output-only identifiers.
    // If it is, remove it, and if not, project it and add that to the outputs.
    for (const input of inputs) {
        if (!outputOnlyIdentifiers.delete(identify(input))) {
            outputs.push(project(input));
        }
    }

    // Now remove from outputs anything that's in outputOnlyIdentifiers.
    for (let i=0; i<outputs.length; i++) {
        const output = outputs[i];
        if (outputOnlyIdentifiers.has(identify(output))) {
            outputs.splice(i, 1);
            i--;
        }
    }
}