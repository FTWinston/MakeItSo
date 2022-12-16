import { ShipState } from 'src/types/ShipState';
import { arrayToObject } from 'src/utils/arrays';
import { durationToTimeSpan, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { createCards } from '../features/Cards/data/EngineeringCards';
import { EngineeringAction } from '../types/EngineeringState';
import { adjustHealth, determineRepairAmount, removeExpiredEffects } from './systemActions';

let nextId = 14;

export function engineeringTrainingReducer(state: ShipState, action: EngineeringAction): ShipState {
    switch (action.type) {
        case 'reset':
            return {
                systems: arrayToObject(action.systems, info => info.system),
                engineering: {
                    systemOrder: action.systems.map(system => system.system),
                    choiceCards: action.choiceCards,
                    handCards: action.handCards,
                    numChoices: action.numChoices,
                    choiceProgress: action.choiceProcess,
                }
            };
            
        case 'play':
            const card = state.engineering.handCards.find(card => card.id === action.cardId);

            if (!card) {
                return state;
            }

            if (action.repair) {
                const affectedSystem = state.systems[action.targetSystem];

                const repairAmount = determineRepairAmount(affectedSystem.health, card.rarity);

                if (repairAmount === 0) {
                    return state;
                }

                adjustHealth(affectedSystem, repairAmount);
            }
            else {
                if (card.allowedSystems !== undefined && (card.allowedSystems & action.targetSystem) === 0) {
                    return state;
                }

                if (card.play(state, action.targetSystem) === false) {
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
                    ? createCards([nextId++, nextId++, nextId++])
                    : [];

                state.engineering.numChoices --;
            }

            return state;
        }

        case 'effect': {
            const affectedSystem = state.systems[action.system];

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
            if (!state.engineering.choiceProgress) {
                state.engineering.choiceProgress = {
                    startTime: getTime(),
                    endTime: getTime() + durationToTimeSpan(15),
                };
            }
            else if (action.currentTime >= state.engineering.choiceProgress.endTime) {
                state.engineering.numChoices = Math.min(9, state.engineering.numChoices + 1);
                
                if (state.engineering.choiceCards.length === 0) {
                    state.engineering.choiceCards = createCards([nextId++, nextId++, nextId++]);
                }

                state.engineering.choiceProgress = undefined;
            }

            for (const system of Object.values(state.systems)) {
                removeExpiredEffects(system, action.currentTime);
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