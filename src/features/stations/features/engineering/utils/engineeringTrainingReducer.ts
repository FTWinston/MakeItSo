import { DefiniteMap } from 'src/types/DefiniteMap';
import { Ship } from 'src/classes/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { arrayToMap } from 'src/utils/arrays';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { cardsByRarity, createCard } from '../features/Cards/data/EngineeringCards';
import { EngineeringCardRarity } from '../features/Cards/types/EngineeringCard';
import { EngineeringAction } from '../types/EngineeringState';
import { applyReactorDamage } from './applyReactorDamage';
import { drawCard } from './drawCard';
import { playCard } from './playCard';
import { adjustHealth, removeExpiredEffects, tickOngoingEffects, applySingleEffect } from './systemActions';
import { updateCardAllowedSystems } from './updateCardAllowedSystems';
import { updateCardGeneration } from './updateCardGeneration';
import { RelationshipType } from 'src/types/RelationshipType';

export function engineeringTrainingReducer(state: Ship, action: EngineeringAction): Ship | void {
    if (state.destroyed) {
        return;
    }

    switch (action.type) {
        case 'reset':
            const newState = new Ship(state.id, RelationshipType.Friendly);
            newState.systems = arrayToMap(action.systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>;
            newState.engineering = {
                systemOrder: action.systems.map(system => system.system),
                choiceCards: action.choiceCards,
                handCards: action.handCards,
                maxHandSize: state.engineering.maxHandSize,
                numChoices: action.numChoices,
                choiceProgress: action.choiceProcess,
                nextCardId: 14,
                nextEffectId: 1,
            };
            return newState;
            
        case 'play':
            playCard(state, action.cardId, action.targetSystem, action.repair);
            break;

        case 'draw': {
            drawCard(state, action.cardId);
            break;
        }

        case 'damage': {
            const affectedSystem = state.systems.get(action.system);
            adjustHealth(affectedSystem, state, action.healthChange);
            break;
        }

        case 'add custom card': {
            const rarityEntry = [...cardsByRarity.entries()]
                .find(entry => entry[1].some(type => type === action.cardType));
            const rarity = rarityEntry?.[0] ?? EngineeringCardRarity.Common;

            const card = createCard(state.engineering.nextCardId++, action.cardType, rarity);

            state.engineering.handCards.push(card);

            if (card.determineAllowedSystems) {
                card.allowedSystems = card.determineAllowedSystems(state);
            }

            break;
        }

        case 'add custom effect': {
            const affectedSystem = state.systems.get(action.system);
            applySingleEffect(action.effectType, affectedSystem, state);
            break;
        }

        case 'tick': {
            updateCardGeneration(state, action.currentTime);

            for (const system of state.systems.values()) {
                removeExpiredEffects(system, state, action.currentTime);
                tickOngoingEffects(system, state, action.currentTime);
            }

            applyReactorDamage(state, action.currentTime);

            updateCardAllowedSystems(state);
            break;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
