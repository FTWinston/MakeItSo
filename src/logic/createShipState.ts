import { System } from '../common/data/System'
import { PowerLevel } from '../common/data/PowerLevel'
import { createCard } from '../systems/engineering/data/EngineeringCards'
import { EngineeringCardData } from '../systems/engineering/data/EngineeringCard';
import { ShipState } from '../common/data/server/ShipState';
import { getTime } from '../common/data/Progression';
import { TargetingSolution, TargetingSolutionComplexity } from '../systems/weapons/data/TargetingSolution';
import { createTargetingSolution } from '../systems/weapons/logic/createTargetingSolution';

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
        helm: {
            speed: 30,
            speedWhileRotating: 10,
            rotationalSpeed: 0.5,
            forcePositionUpdate: false,
            waypoints: [],
            lastWaypoint: {
                x: 0,
                y: 0,
                angle: 0,
            },
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
        weapons: {
            solutionsByTarget: {
                2: [
                    createTargetingSolution(System.Weapons, TargetingSolutionComplexity.Simple),
                    createTargetingSolution(System.Sensors, TargetingSolutionComplexity.Simple),
                    createTargetingSolution(System.Engineering, TargetingSolutionComplexity.Complex),
                    createTargetingSolution(System.Helm, TargetingSolutionComplexity.Moderate),
                ],
                3: [
                    createTargetingSolution(System.Weapons, TargetingSolutionComplexity.Simple),
                    createTargetingSolution(System.Sensors, TargetingSolutionComplexity.Simple),
                    createTargetingSolution(System.Engineering, TargetingSolutionComplexity.Complex),
                    createTargetingSolution(System.Helm, TargetingSolutionComplexity.Moderate),
                ],
                4: [
                    createTargetingSolution(System.Weapons, TargetingSolutionComplexity.Simple),
                    createTargetingSolution(System.Sensors, TargetingSolutionComplexity.Simple),
                    createTargetingSolution(System.Engineering, TargetingSolutionComplexity.Complex),
                    createTargetingSolution(System.Helm, TargetingSolutionComplexity.Moderate),
                ],
            },
        },
    }
}
