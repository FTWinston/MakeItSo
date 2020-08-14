import { ShipState } from '../../data/ShipState';
import { createCard } from '../../data/EngineeringCards';
import { System } from '../../data/System';

const engineeringCardGenerationTarget = 40;
const maxEngineeringCardDraftQueue = 9;

export function progressEngineeringCardDraft(ship: ShipState, interval: number) {
    if (ship.power.draftChoices.length >= maxEngineeringCardDraftQueue) {
        return;
    }

    ship.power.generationProgress += ship.systemInfo[System.Engineering].power * interval;
    if (ship.power.generationProgress > engineeringCardGenerationTarget) {
        ship.power.draftChoices.push([
            createCard(ship.power.nextCardId++),
            createCard(ship.power.nextCardId++),
            createCard(ship.power.nextCardId++),
        ]);

        ship.power.generationProgress -= engineeringCardGenerationTarget;
    }
}