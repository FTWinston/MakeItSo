import { ShipState } from '../../data/ShipState';
import { createCard } from '../../data/EngineeringCards';
import { System } from '../../data/System';
import { getTime, determineEndTime, hasCompleted, determineUpdatedEndTime } from '../../data/Progression';
import { PowerLevel } from '../../data/PowerLevel';

const maxEngineeringCardDraftQueue = 9;

function determineDuration(ship: ShipState) {
    switch (ship.systemInfo[System.Engineering].power) {
        case PowerLevel.Off:
            return 0;
        case PowerLevel.Low:
            return 45;
        case PowerLevel.Med:
            return 30;
        case PowerLevel.High:
            return 20;
        case PowerLevel.Full:
            return 10;
    }
}

export function progressEngineeringCardDraft(ship: ShipState) {
    const { power, prevPower } = ship.systemInfo[System.Engineering];

    if (ship.power.draftChoices.length >= maxEngineeringCardDraftQueue || power === PowerLevel.Off) {
        if (ship.power.cardGeneration) {
            delete ship.power.cardGeneration;
        }

        return;
    }

    const currentTime = getTime();

    if (!ship.power.cardGeneration) {
        const duration = determineDuration(ship);
        
        ship.power.cardGeneration = {
            duration,
            endTime: determineEndTime(duration, currentTime)
        }
    }
    else if (power !== prevPower) {
        const duration = determineDuration(ship);

        ship.power.cardGeneration = {
            duration,
            endTime: determineUpdatedEndTime(duration, ship.power.cardGeneration, currentTime),
        };
    }

    if (hasCompleted(ship.power.cardGeneration, currentTime)) {
        ship.power.draftChoices.push([
            createCard(ship.power.nextCardId++),
            createCard(ship.power.nextCardId++),
            createCard(ship.power.nextCardId++),
        ]);

        ship.power.cardGeneration = {
            duration: ship.power.cardGeneration.duration,
            endTime: determineEndTime(ship.power.cardGeneration.duration, currentTime),
        };
    }
}