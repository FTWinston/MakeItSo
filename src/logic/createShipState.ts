import { System } from '../data/System'
import { PowerLevel } from '../data/PowerLevel'
import { createCard } from '../data/EngineeringCards'
import { EngineeringCardData } from '../data/EngineeringCard';
import { ShipState } from '../data/ShipState';
import { getTime, durationToTimeSpan } from '../data/Progression';

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
        position: {
            current: {
                startValue: {
                    x: 0,
                    y: 0,
                },
                endValue: {
                    x: 250,
                    y: 75,
                },
                duration: 10,
                endTime: getTime() + durationToTimeSpan(10),
            },
            next: {
                startValue: {
                    x: 250,
                    y: 75,
                },
                endValue: {
                    x: -250,
                    y: -600,
                },
                duration: 10,
                endTime: getTime() + durationToTimeSpan(20),
            }
        },
        futurePositions: [
            {
                x: -250,
                y: -600,
            },
            {
                x: 0,
                y: 0,
            }
        ],
        angle: {
            startValue: 0,
            endValue: 0,
            duration: 1,
            endTime: getTime(),
        },
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
