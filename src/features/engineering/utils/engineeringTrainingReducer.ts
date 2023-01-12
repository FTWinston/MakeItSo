import { DefiniteMap } from 'src/types/DefiniteMap';
import { ShipState } from 'src/types/ShipState';
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

export function engineeringTrainingReducer(state: ShipState, action: EngineeringAction): ShipState {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            const systems = arrayToMap(action.systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>;
            return {
                systems,
                engineering: {
                    systemOrder: action.systems.map(system => system.system),
                    choiceCards: action.choiceCards,
                    handCards: action.handCards,
                    maxHandSize: state.engineering.maxHandSize,
                    numChoices: action.numChoices,
                    choiceProgress: action.choiceProcess,
                    nextCardId: 14,
                    nextEffectId: 1,
                }
            };
            
        case 'play':
            playCard(state, action.cardId, action.targetSystem, action.repair);
            return state;

        case 'draw': {
            drawCard(state, action.cardId);
            return state;
        }

        case 'damage': {
            const affectedSystem = state.systems.get(action.system);
            adjustHealth(affectedSystem, state, action.healthChange);
            return state;
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

            return state;
        }

        case 'add custom effect': {
            const affectedSystem = state.systems.get(action.system);
            applySingleEffect(action.effectType, affectedSystem, state);
            return state;
        }

        case 'tick': {
            updateCardGeneration(state, action.currentTime);

            for (const system of state.systems.values()) {
                removeExpiredEffects(system, state, action.currentTime);
                tickOngoingEffects(system, state, action.currentTime);
            }

            applyReactorDamage(state, action.currentTime);

            updateCardAllowedSystems(state);

            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
