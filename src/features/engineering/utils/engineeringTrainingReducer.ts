import { DefiniteMap } from 'src/types/DefiniteMap';
import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { arrayToMap } from 'src/utils/arrays';
import { adjustDuration, durationToTicks, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { createCards } from '../features/Cards/data/EngineeringCards';
import { EngineeringAction } from '../types/EngineeringState';
import { adjustHealth, determineRepairAmount, determineRestoreAmount, removeExpiredEffects, adjustRestoration, determineCardGenerationDuration } from './systemActions';

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

                    adjustHealth(targetSystem, repairAmount);
                }
            }
            else {
                if (card.allowedSystems !== undefined && (card.allowedSystems & action.targetSystem) === 0) {
                    return state;
                }

                if (card.play(targetSystem, state) === false) {
                    return state;
                }
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

        case 'effect': {
            const affectedSystem = state.systems.get(action.system);

            if (action.healthChange) {
                adjustHealth(affectedSystem, action.healthChange);
            }

            if (action.addEffects) {
                affectedSystem.effects.push(...action.addEffects);
            }

            if (action.events) {
                affectedSystem.eventLog.push(...action.events);
            }

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
