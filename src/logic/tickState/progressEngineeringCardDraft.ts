import { ShipState } from '../../common/data/server/ShipState';
import { createCard } from '../../systems/engineering/data/EngineeringCards';
import { System } from '../../common/data/System';
import { getTime, determineEndTime, hasCompleted, determineUpdatedEndTime } from '../../common/data/Progression';
import { PowerLevel } from '../../common/data/PowerLevel';

const maxEngineeringCardDraftQueue = 9;

function determineDuration(power: PowerLevel) {
    switch (power) {
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

    if (ship.engineering.draftChoices.length >= maxEngineeringCardDraftQueue || power === PowerLevel.Off) {
        if (ship.engineering.cardGeneration) {
            delete ship.engineering.cardGeneration;
        }

        return;
    }

    const currentTime = getTime();

    if (!ship.engineering.cardGeneration) {
        const duration = determineDuration(power);
        
        ship.engineering.cardGeneration = {
            duration,
            endTime: determineEndTime(duration, currentTime)
        }
    }
    else if (power !== prevPower) {
        const duration = determineDuration(power);

        ship.engineering.cardGeneration = {
            duration,
            endTime: determineUpdatedEndTime(duration, ship.engineering.cardGeneration, currentTime),
        };
    }

    if (hasCompleted(ship.engineering.cardGeneration, currentTime)) {
        ship.engineering.draftChoices.push([
            createCard(ship.engineering.nextCardId++),
            createCard(ship.engineering.nextCardId++),
            createCard(ship.engineering.nextCardId++),
        ]);

        ship.engineering.cardGeneration = {
            duration: ship.engineering.cardGeneration.duration,
            endTime: determineEndTime(ship.engineering.cardGeneration.duration, currentTime),
        };
    }
}