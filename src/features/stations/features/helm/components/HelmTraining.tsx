import { produce } from 'immer';
import { Dispatch, useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { Space } from 'src/classes/Space';
import { crewActionReducer } from 'src/features/stations';
import { useInterval } from 'src/hooks/useInterval';
import { CrewStation, ShipSystem } from 'src/types/ShipSystem';
import { HelmAction } from '../types/HelmState';
import { Helm } from './Helm';
import { SpaceAction, getStorySpaceReducer } from '../../../utils/getStorySpaceReducer';
import { ObjectId } from 'src/types/GameObjectInfo';

interface Props {
    getInitialState: () => Space;
    renderMenuItems?: () => JSX.Element;
}

const shipId = 1;
const spaceReducer = getStorySpaceReducer(shipId, crewActionReducer);
const helmActionReducer = (space: Space, action: SpaceAction<HelmAction>) => spaceReducer(space, action.type === 'tick' ? action : { station: CrewStation.Helm, action });

export const HelmTraining: React.FC<Props> = (props) => {
    const [space, dispatch] = useReducer(produce(helmActionReducer), undefined, props.getInitialState);

    // Run tick action at a regular interval.
    useInterval(() => dispatch({ type: 'tick' }), 200);

    return (
        <CoreHelmTraining
            dispatch={dispatch}
            renderMenuItems={props.renderMenuItems}
            space={space}
            shipId={shipId}
        />
    );
};

interface CoreProps {
    dispatch: Dispatch<HelmAction>;
    renderMenuItems?: () => JSX.Element;
    space: Space;
    shipId: ObjectId;
}

export const CoreHelmTraining: React.FC<CoreProps> = (props) => {
    const { dispatch, renderMenuItems, space, shipId } = props;
    const ship = space.objects.get(shipId) as Ship;
    const { power, health } = ship.systems.get(ShipSystem.Engines);

    const otherObjects = [...space.objects.values()]
        .filter(obj => obj.id !== ship.id);

    return (
        <Helm
            power={power}
            health={health}
            evasion={ship.evasionChance}
            ship={ship}
            shipDestroyed={ship.destroyed}
            otherObjects={otherObjects}
            stop={() => dispatch({ type: 'stop' })}
            discardManeuverCard={() => dispatch({ type: 'discard' })}
            maneuvers={ship.helm.maneuvers}
            maneuverChoice={ship.helm.maneuverChoice}
            speed={ship.helm.speed}
            speedWhileRotating={ship.helm.speedWhileRotating}
            rotationalSpeed={ship.helm.rotationalSpeed}
            destination={ship.helm.destination?.val ?? null}
            setDestination={destination => dispatch({ type: 'set destination', destination })}
            maneuver={choice => dispatch({ type: 'maneuver', choice })}
            renderMenuItems={renderMenuItems}
        />
    );
};