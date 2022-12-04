import { useEffect, useReducer } from 'react';
import { EffectAction, EngineeringState } from '../types/EngineeringState';
import { engineeringTrainingReducer } from '../utils/engineeringTrainingReducer';
import { Engineering } from './Engineering';

interface Props {
    getInitialState: () => EngineeringState;
    getEffects: () => EffectAction[];
}

export const EngineeringTraining: React.FC<Props> = (props) => {
    const { getEffects, getInitialState } = props;

    const [state, dispatch] = useReducer(engineeringTrainingReducer, undefined, getInitialState);

    // Run cleanup action at a regular interval.
    useEffect(() => {
        const interval = setInterval(() => dispatch({ type: 'cleanup', currentTime: Date.now() }), 200);

        return () => clearInterval(interval);
    });

    // Check for new effects and apply them at a less frequent interval.
    useEffect(() => {
        const interval = setInterval(() => {
            const effects = getEffects();

            for (const effect of effects) {
                dispatch(effect);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [getEffects]);

    return (
        <Engineering
            {...state}
            chooseCard={cardId => dispatch({ type: 'draw', cardId })}
            playCard={(card, targetSystem) => dispatch({ type: 'play', cardId: card.id, targetSystem })}
        />
    );
};