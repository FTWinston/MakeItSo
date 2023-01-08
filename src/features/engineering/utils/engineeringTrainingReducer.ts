import { DefiniteMap } from 'src/types/DefiniteMap';
import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { arrayToMap } from 'src/utils/arrays';
import { adjustDuration, durationToTicks, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { cardsByRarity, createCard, createCards } from '../features/Cards/data/EngineeringCards';
import { EngineeringCardRarity } from '../features/Cards/types/EngineeringCard';
import { EngineeringAction } from '../types/EngineeringState';
import { adjustHealth, determineRepairAmount, determineRestoreAmount, removeExpiredEffects, adjustRestoration, determineCardGenerationDuration, tickOngoingEffects, applySingleEffect, logEvent } from './systemActions';

export function engineeringTrainingReducer(state: ShipState, action: EngineeringAction): ShipState {
    switch (action.type) {
        case 'reset':
            const systems = arrayToMap(action.systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>;
            return {
                systems,
                engineering: {
                    systemOrder: action.systems.map(system => system.system),
                    choiceCards: action.choiceCards,
                    handCards: action.handCards,
                    numChoices: action.numChoices,
                    choiceProgress: action.choiceProcess,
                    nextCardId: 14,
                    nextEffectId: 1,
                }
            };
            
        case 'play':
            const card = state.engineering.handCards.find(card => card.id === action.cardId);

            if (!card) {
                return state;
            }

            const targetSystem = state.systems.get(action.targetSystem);
            if (action.repair) {

                if (targetSystem.health === 0) {
                    // Increase restore value. If that reaches the max, set health to a low value.
                    const restoreAmount = determineRestoreAmount(card.rarity);

                    adjustRestoration(targetSystem, restoreAmount);
                }
                else {
                    // Repair health
                    const repairAmount = determineRepairAmount(targetSystem.health, card.rarity);

                    if (repairAmount === 0) {
                        return state;
                    }

                    adjustHealth(targetSystem, state, repairAmount);
                }
            }
            else {
                // Recalculate allowed systems at the instant a card is being played.
                const allowedSystems = card.determineAllowedSystems?.(state);
                
                if (allowedSystems !== undefined && (allowedSystems & action.targetSystem) === 0) {
                    // If not allowed to target this system, don't play the card.
                    return state;
                }

                // If we get this far, the card is being played.
                logEvent(targetSystem, {
                    identifier: 'play card',
                    parameters: {
                        card: card.type
                    }
                })

                card.play(targetSystem, state);
            }

            const index = state.engineering.handCards.indexOf(card);
            if (index !== -1) {
                state.engineering.handCards.splice(index, 1);
            }
            
            return state;

        case 'draw': {
            const card = state.engineering.choiceCards.find(card => card.id === action.cardId);

            if (!card || state.engineering.numChoices <= 0) {
                return state;
            }

            state.engineering.handCards.push(card);

            if (card.determineAllowedSystems) {
                card.allowedSystems = card.determineAllowedSystems(state);
            }

            if (state.engineering.numChoices > 0) {
                state.engineering.choiceCards = state.engineering.numChoices > 1
                    ? createCards([state.engineering.nextCardId++, state.engineering.nextCardId++, state.engineering.nextCardId++])
                    : [];

                state.engineering.numChoices --;
            }

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
            applySingleEffect(state.engineering.nextEffectId++, action.effectType, affectedSystem, state);
            return state;
        }

        case 'tick': {
            const reactorSystem = state.systems.get(ShipSystem.Reactor);
            const powerLevelChanged = reactorSystem.powerLevelChanged;

            if (reactorSystem.powerLevelChanged) {
                reactorSystem.powerLevelChanged = false;
            }

            if (!state.engineering.choiceProgress) {
                state.engineering.choiceProgress = {
                    startTime: getTime(),
                    endTime: getTime() + durationToTicks(determineCardGenerationDuration(reactorSystem.power)),
                };
            }
            else {
                if (powerLevelChanged) {
                    // Adjust choiceProgress to account for duration, maintaining % complete.
                    state.engineering.choiceProgress = adjustDuration(state.engineering.choiceProgress, determineCardGenerationDuration(reactorSystem.power));
                }
                else if (action.currentTime >= state.engineering.choiceProgress.endTime) {
                    state.engineering.numChoices = Math.min(9, state.engineering.numChoices + 1);
                    
                    if (state.engineering.choiceCards.length === 0) {
                        state.engineering.choiceCards = createCards([state.engineering.nextCardId++, state.engineering.nextCardId++, state.engineering.nextCardId++]);
                    }

                    state.engineering.choiceProgress = undefined;
                }
            }

            for (const system of state.systems.values()) {
                removeExpiredEffects(system, state, action.currentTime);
                tickOngoingEffects(system, state, action.currentTime);
            }

            for (const card of state.engineering.handCards) {
                if (card.determineAllowedSystems) {
                    const newAllowedSystems = card.determineAllowedSystems(state);
                    if (newAllowedSystems !== card.allowedSystems) {
                        card.allowedSystems = newAllowedSystems;
                    }
                }
            }

            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
