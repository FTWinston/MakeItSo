import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { arrayToObject } from 'src/utils/arrays';
import { durationToTimeSpan, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { createCard } from '../features/Cards';
import { EngineeringAction } from '../types/EngineeringState';
import { adjustHealth } from './systemActions';

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

            if (card.allowedSystems !== undefined && (card.allowedSystems & action.targetSystem) === 0) {
                return state;
            }

            const newState = {
                ...state,
                systems: { ...state.systems },
            };

            if (card.play(newState, action.targetSystem) === false) {
                return state;
            }

            return {
                ...newState,
                engineering: {
                    ...newState.engineering,
                    handCards: state.engineering.handCards.filter(c => c !== card),
                }
            }

        case 'draw': {
            const card = state.engineering.choiceCards.find(card => card.id === action.cardId);

            if (!card || state.engineering.numChoices <= 0) {
                return state;
            }

            return {
                ...state,
                engineering: {
                    ...state.engineering,
                    handCards: [...state.engineering.handCards, card],
                    choiceCards: state.engineering.numChoices > 1
                        ? [
                            createCard(++nextId),
                            createCard(++nextId),
                            createCard(++nextId),
                        ]
                        : [],
                    numChoices: state.engineering.numChoices - 1,
                }
            }
        }

        case 'effect': {
            const newSystems = { ...state.systems };
            const updatedSystem = { ...newSystems[action.system] };
            newSystems[action.system] = updatedSystem;

            if (action.healthChange) {
                adjustHealth(updatedSystem, action.healthChange);
            }

            if (action.addEffects) {
                updatedSystem.effects = [
                    ...updatedSystem.effects,
                    ...action.addEffects,
                ];
            }

            if (action.events) {
                updatedSystem.eventLog = [
                    ...updatedSystem.eventLog,
                    ...action.events,
                ]
            }

            return {
                ...state,
                systems: newSystems,
            };
        }

        case 'cleanup': {
            let { numChoices, choiceCards, choiceProgress } = state.engineering;

            if (!choiceProgress) {
                choiceProgress = {
                    startTime: getTime(),
                    endTime: getTime() + durationToTimeSpan(15),
                };
            }
            else if (action.currentTime >= choiceProgress.endTime) {
                numChoices = Math.min(9, numChoices + 1);
                
                if (choiceCards.length === 0) {
                    choiceCards = [
                        createCard(++nextId),
                        createCard(++nextId),
                        createCard(++nextId),
                    ];
                }

                choiceProgress = undefined;
            }

            const newSystems = {} as typeof state.systems;
            for (let [system, systemInfo] of Object.entries(state.systems)) {
                const keepEffects = systemInfo.effects.filter(effect => effect.endTime > action.currentTime);

                if (keepEffects.length !== systemInfo.effects.length) {
                    systemInfo = {
                        ...systemInfo,
                        effects: keepEffects,
                    };
                }

                newSystems[system as unknown as ShipSystem] = systemInfo;
            }

            return {
                ...state,
                systems: newSystems,
                engineering: {
                    ...state.engineering,
                    numChoices,
                    choiceCards,
                    choiceProgress,
                }
            }
        }

        default:
            throw new UnexpectedValueError(action);
    }
}