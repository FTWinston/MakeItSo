import { System } from '../common/data/System'
import { PowerLevel } from '../common/data/PowerLevel'
import { createCard } from '../systems/engineering/data/EngineeringCards'
import { EngineeringCardData } from '../systems/engineering/data/EngineeringCard';
import { ShipState } from '../common/data/server/ShipState';
import { getTime, durationToTimeSpan } from '../common/data/Progression';

function createSystemState() {
    return {
        power: PowerLevel.Med,
        basePower: PowerLevel.Med,
        prevPower: PowerLevel.Med,
        health: 100,
        effects: [],
        modified: true,
    }
}

const initialEngineeringHandSize = 4;
const numInitialEngineeringChoices = 4;

export function createShipState(): ShipState {
    let nextCardId = 1;

    const hand: EngineeringCardData[] = [];
    for (let i = 0; i<initialEngineeringHandSize; i++) {
        hand.push(createCard(nextCardId++));
    }

    const draftChoices: Array<EngineeringCardData[]> = [];

    for (let i = 0; i < numInitialEngineeringChoices; i++) {
        draftChoices.push(
            [createCard(nextCardId++), createCard(nextCardId++), createCard(nextCardId++)]    
        );
    }

    return {
        clientsBySystem: {},
        systemsByClient: {},
        systemInfo: {
            [System.Helm]: createSystemState(),
            [System.FTL]: createSystemState(),
            [System.Weapons]: createSystemState(),
            [System.Sensors]: createSystemState(),
            [System.Engineering]: createSystemState(),
            [System.DamageControl]: createSystemState(),
        },
        position: [
            {
                time: getTime(),
                val: {
                    x: 0,
                    y: 0,
                    angle: 0,
                }
            }
        ],
        waypoints: [],
        engineering: {
            systemOrder: [
                System.Helm,
                System.FTL,
                System.Weapons,
                System.Sensors,
                System.Engineering,
                System.DamageControl,
            ],
            hand,
            draftChoices,
            nextCardId,
        },
    }
}
