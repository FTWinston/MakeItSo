import produce from 'immer';
import { useEffect, useReducer } from 'react';
import { ShipState } from 'src/types/ShipState';
import { getTime } from 'src/utils/timeSpans';
import { EffectAction } from '../types/EngineeringState';
import { engineeringTrainingReducer } from '../utils/engineeringTrainingReducer';
import { Engineering } from './Engineering';

interface Props {
    getInitialState: () => ShipState;
    getEffects: () => EffectAction[];
}

export const EngineeringTraining: React.FC<Props> = (props) => {
    const { getEffects, getInitialState } = props;

    const [state, dispatch] = useReducer(produce(engineeringTrainingReducer), undefined, getInitialState);

    // Run tick action at a regular interval.
    useEffect(() => {
        const interval = setInterval(() => dispatch({ type: 'tick', currentTime: getTime() }), 200);

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

    const { systemOrder, ...otherState } = state.engineering;
    const orderedSystemInfo = systemOrder.map(system => state.systems.get(system));

    return (
        <Engineering
            {...otherState}
            systems={orderedSystemInfo}
            chooseCard={cardId => dispatch({ type: 'draw', cardId })}
            playCard={(card, targetSystem, repair) => dispatch({ type: 'play', cardId: card.id, targetSystem, repair })}
        />
    );
};