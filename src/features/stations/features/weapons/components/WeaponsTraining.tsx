import { produce } from 'immer';
import { Dispatch, useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { crewActionReducer } from 'src/features/stations';
import { useInterval } from 'src/hooks/useInterval';
import { CrewStation, ShipSystem } from 'src/types/ShipSystem';
import { WeaponsAction } from '../types/WeaponsState';
import { Weapons } from './Weapons';
import { Space } from 'src/classes/Space';
import { SpaceAction, getStorySpaceReducer } from 'src/features/stations/utils/getStorySpaceReducer';

interface Props {
    getInitialState: () => Space;
    renderMenuItems?: () => JSX.Element;
}

const shipId = 1;
const spaceReducer = getStorySpaceReducer(shipId, crewActionReducer);
const weaponsActionReducer = (space: Space, action: SpaceAction<WeaponsAction>) => spaceReducer(space, action.type === 'tick' ? action : { station: CrewStation.Weapons, action });

export const WeaponsTraining: React.FC<Props> = (props) => {
    const [space, dispatch] = useReducer(produce(weaponsActionReducer), undefined, props.getInitialState);
    const ship = space.objects.get(shipId) as Ship;

    // Run tick action at a regular interval.
    useInterval(() => dispatch({ type: 'tick' }), 200);

    return (
        <CoreWeaponsTraining
            dispatch={dispatch}
            renderMenuItems={props.renderMenuItems}
            ship={ship}
        />
    )
};

interface CoreProps {
    dispatch: Dispatch<WeaponsAction>;
    renderMenuItems?: () => JSX.Element;
    ship: Ship;
}

export const CoreWeaponsTraining: React.FC<CoreProps> = (props) => {
    const { dispatch, renderMenuItems, ship } = props;

    const { power, health } = ship.systems.get(ShipSystem.Weapons);

    return (
        <Weapons
            {...ship.weapons}
            power={power}
            health={health}
            shipDestroyed={ship.destroyed}
            renderMenuItems={renderMenuItems}
        />
    );
}