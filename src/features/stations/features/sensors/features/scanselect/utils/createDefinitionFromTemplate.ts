import { getRandom } from 'src/utils/random';
import { ScanItemId, ScanTreeDefinition, ScanTreeTemplate } from '../types/ScanTreeState';

/** Copy the items, pick a single combination of unlocks. */
export function createDefinitionFromTemplate(template: ScanTreeTemplate): ScanTreeDefinition {
    const chosenUnlocks: [ScanItemId, ScanItemId][] = [];

    for (const unlockOptionSet of template.unlockOptionSets) {
        const chosenSet = getRandom(unlockOptionSet);
        if (chosenSet) {
            chosenUnlocks.push(...chosenSet);
        }
    }

    return {
        items: template.items,
        unlocks: chosenUnlocks,
    };
}
