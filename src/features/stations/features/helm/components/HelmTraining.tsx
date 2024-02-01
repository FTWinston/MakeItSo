import { produce } from 'immer';
import { useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { Space } from 'src/classes/Space';
import { crewActionReducer } from 'src/features/stations';
import { useInterval } from 'src/hooks/useInterval';
import { CrewStation, ShipSystem } from 'src/types/ShipSystem';
import { HelmAction } from '../types/HelmState';
import { Helm } from './Helm';
import { SpaceAction, getStorySpaceReducer } from '../../../utils/getStorySpaceReducer';

interface Props {
    getInitialState: () => Space;
    //customRender?: (dispatch: Dispatch<HelmAction>, defaultRender: () => JSX.Element) => JSX.Element;
    renderMenuItems?: () => JSX.Element;
}

const shipId = 1;
const spaceReducer = getStorySpaceReducer(shipId, crewActionReducer);
const helmActionReducer = (space: Space, action: SpaceAction<HelmAction>) => spaceReducer(space, action.type === 'tick' ? action : { station: CrewStation.Helm, action });

export const HelmTraining: React.FC<Props> = (props) => {
    const [space, dispatch] = useReducer(produce(helmActionReducer), undefined, props.getInitialState);
    const ship = space.objects.get(shipId) as Ship;

    // Run tick action at a regular interval.
    useInterval(() => dispatch({ type: 'tick' }), 200);

    const { power, health } = ship.systems.get(ShipSystem.Engines);

    const otherObjects = [...space.objects.values()]
        .filter(obj => obj.id !== ship.id);

    const defaultRender = () => (
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
            renderMenuItems={props.renderMenuItems}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};