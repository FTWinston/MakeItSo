import { durationToTimeSpan } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { createCard } from '../features/Cards';
import { EngineeringAction, EngineeringState } from '../types/EngineeringState';

let nextId = 14;

export function engineeringTrainingReducer(state: EngineeringState, action: EngineeringAction): EngineeringState {
    switch (action.type) {
        case 'reset':
            return {
                choiceCards: action.choiceCards,
                handCards: action.handCards,
                numChoices: action.numChoices,
                systems: action.systems,
                choiceProgress: action.choiceProcess,
            };
            
        case 'play':
            const card = state.handCards.find(card => card.id === action.cardId);

            if (!card) {
                return state;
            }

            if (card.allowedSystems !== undefined && (card.allowedSystems & action.targetSystem) === 0) {
                return state;
            }

            const newState = { ...state, };

            if (card.play(newState, action.targetSystem) === false) {
                return state;
            }

            return {
                ...newState,
                handCards: state.handCards.filter(c => c !== card),
            }

        case 'draw': {
            const card = state.choiceCards.find(card => card.id === action.cardId);

            if (!card || state.numChoices <= 0) {
                return state;
            }

            return {
                ...state,
                handCards: [...state.handCards, card],
                choiceCards: state.numChoices > 1
                    ? [
                        createCard(++nextId),
                        createCard(++nextId),
                        createCard(++nextId),
                    ]
                    : [],
                numChoices: state.numChoices - 1,
            }
        }

        case 'effect':
            return {
                ...state,
                systems: state.systems.map(system => {
                    if (system.system !== action.system) {
                        return system;
                    }
                    
                    const updatedSystem = { ...system };

                    if (action.healthChange) {
                        updatedSystem.health = Math.max(0, updatedSystem.health + action.healthChange);
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

                    return updatedSystem;
                })
            };

        case 'cleanup': {
            let { numChoices, choiceCards, choiceProgress } = state;

            if (!choiceProgress) {
                choiceProgress = {
                    startTime: Date.now(),
                    endTime: Date.now() + durationToTimeSpan(15),
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

            return {
                ...state,
                systems: state.systems
                    .map(system => ({
                        ...system,
                        effects: system.effects.filter(effect => effect.endTime > action.currentTime),
                    })),
                numChoices,
                choiceCards,
                choiceProgress,
            }
        }

        default:
            throw new UnexpectedValueError(action);
    }
}