import { Ship } from 'src/classes/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { EngineeringCard } from '../features/Cards';
import { adjustHealth, adjustRestoration, determineRepairAmount, determineRestoreAmount, logEvent } from './systemActions';

function removeCardFromHand(state: Ship, card: EngineeringCard) {
    const index = state.engineering.handCards.indexOf(card);

    if (index !== -1) {
        state.engineering.handCards.splice(index, 1);
    }
}

function applyCardEffect(
    state: Ship,
    card: EngineeringCard,
    targetSystem: SystemState,
) {
    // Recalculate allowed systems at the instant a card is being played.
    const allowedSystems = card.determineAllowedSystems?.(state);
    
    if (allowedSystems !== undefined && (allowedSystems & targetSystem.system) === 0) {
        // If not allowed to target this system, don't play the card.
        return false;
    }

    // If we get this far, the card is being played.
    logEvent(targetSystem, {
        identifier: 'play card',
        parameters: {
            card: card.type
        }
    });

    card.play(targetSystem, state);
    return true;
}

function applyCardHealing(
    state: Ship,
    card: EngineeringCard,
    targetSystem: SystemState,
) {
    if (targetSystem.health === 0) {
        // Increase restore value. If that reaches the max, set health to a low value.
        const restoreAmount = determineRestoreAmount(card.rarity);

        adjustRestoration(targetSystem, restoreAmount);
    }
    else {
        // Repair health
        const repairAmount = determineRepairAmount(targetSystem.health, card.rarity);

        if (repairAmount === 0) {
            return false;
        }

        adjustHealth(targetSystem, state, repairAmount);
    }

    return true;
}

export function playCard(
    state: Ship,
    cardId: number,
    targetSystem: ShipSystem,
    repairing: boolean,
) {
    const card = state.engineering.handCards.find(card => card.id === cardId);

    if (!card) {
        return;
    }

    const targetSystemState = state.systems.get(targetSystem);

    if (repairing) {
        if (!applyCardHealing(state, card, targetSystemState)) {
            return;
        }
    }
    else if (!applyCardEffect(state, card, targetSystemState)) {
        return;
    }

    removeCardFromHand(state, card);
}
