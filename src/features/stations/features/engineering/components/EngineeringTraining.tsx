import { produce } from 'immer';
import { Dispatch, useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { crewActionReducer } from 'src/features/stations';
import { useInterval } from 'src/hooks/useInterval';
import { CrewStation } from 'src/types/ShipSystem';
import { DamageAction, EngineeringAction } from '../types/EngineeringState';
import { Engineering } from './Engineering';
import { SpaceAction, getStorySpaceReducer } from 'src/features/stations/utils/getStorySpaceReducer';
import { Space } from 'src/classes/Space';

interface Props {
    getInitialState: () => Space;
    getEffects: () => DamageAction[];
    customRender?: (dispatch: Dispatch<EngineeringAction>, defaultRender: () => JSX.Element) => JSX.Element;
    renderMenuItems?: () => JSX.Element;
}

const shipId = 1;
const spaceReducer = getStorySpaceReducer(shipId, crewActionReducer);
const engineeringActionReducer = (space: Space, action: SpaceAction<EngineeringAction>) => spaceReducer(space, action.type === 'tick' ? action : { station: CrewStation.Engineering, action });

export const EngineeringTraining: React.FC<Props> = (props) => {
    const { getEffects, getInitialState } = props;

    const [space, dispatch] = useReducer(produce(engineeringActionReducer), undefined, getInitialState);
    const ship = space.objects.get(shipId) as Ship;

    // Run tick action at a regular interval.
    useInterval(() => dispatch({ type: 'tick' }), 200);

    // Check for new effects and apply them at a less frequent interval.
    useInterval(() => {
        const effects = getEffects();

        for (const effect of effects) {
            dispatch(effect);
        }
    }, 1500, [getEffects]);

    const { systemOrder, ...otherState } = ship.engineering;
    const orderedSystemInfo = systemOrder.map(system => ship.systems.get(system));

    const defaultRender = () => (
        <Engineering
            {...otherState}
            renderMenuItems={props.renderMenuItems}
            shipDestroyed={ship.destroyed}
            systems={orderedSystemInfo}
            chooseCard={cardId => dispatch({ type: 'draw', cardId })}
            playCard={(card, targetSystem, repair) => dispatch({ type: 'play', cardId: card.id, targetSystem, repair })}
        />
    );

    return props.customRender?.(dispatch, defaultRender) ?? defaultRender();
};