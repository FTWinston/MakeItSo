import produce from 'immer';
import { Dispatch, useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { useInterval } from 'src/hooks/useInterval';
import { getTime } from 'src/utils/timeSpans';
import { DamageAction, EngineeringAction } from '../types/EngineeringState';
import { engineeringTrainingReducer } from '../utils/engineeringTrainingReducer';
import { Engineering } from './Engineering';

interface Props {
    getInitialState: () => Ship;
    getEffects: () => DamageAction[];
    customRender?: (dispatch: Dispatch<EngineeringAction>, defaultRender: () => JSX.Element) => JSX.Element;
    renderMenuItems?: () => JSX.Element;
}

export const EngineeringTraining: React.FC<Props> = (props) => {
    const { getEffects, getInitialState } = props;

    const [state, dispatch] = useReducer(produce(engineeringTrainingReducer), undefined, getInitialState);

    // Run tick action at a regular interval.
    useInterval(() => dispatch({ type: 'tick', currentTime: getTime() }), 200);

    // Check for new effects and apply them at a less frequent interval.
    useInterval(() => {
        const effects = getEffects();

        for (const effect of effects) {
            dispatch(effect);
        }
    }, 1500, [getEffects]);

    const { systemOrder, ...otherState } = state.engineering;
    const orderedSystemInfo = systemOrder.map(system => state.systems.get(system));

    const defaultRender = () => (
        <Engineering
            {...otherState}
            renderMenuItems={props.renderMenuItems}
            shipDestroyed={state.destroyed}
            systems={orderedSystemInfo}
            chooseCard={cardId => dispatch({ type: 'draw', cardId })}
            playCard={(card, targetSystem, repair) => dispatch({ type: 'play', cardId: card.id, targetSystem, repair })}
        />
    );

    return props.customRender?.(dispatch, defaultRender) ?? defaultRender();
};