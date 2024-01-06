import { Random } from 'src/utils/random';
import { ScanTreeDefinition, ScanTreeTemplate } from '../types/ScanTreeState';
import { ScanItemId } from '../types/ScanItemId';

/** Copy the items, pick a single combination of unlocks. */
export function createDefinitionFromTemplate(template: ScanTreeTemplate): ScanTreeDefinition {
    const chosenUnlocks: [ScanItemId, ScanItemId][] = [];

    const random = new Random();

    for (const unlockOptionSet of template.unlockOptionSets) {
        const chosenSet = random.pick(unlockOptionSet);
        if (chosenSet) {
            chosenUnlocks.push(...chosenSet);
        }
    }

    return {
        items: template.items,
        unlocks: chosenUnlocks,
    };
}
