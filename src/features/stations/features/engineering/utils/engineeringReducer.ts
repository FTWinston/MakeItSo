import { Ship } from 'src/classes/Ship';
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

export function engineeringReducer(state: Ship, action: EngineeringAction): void {
    switch (action.type) {
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
