import { produce } from 'immer';
import { Dispatch, useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { crewActionReducer } from 'src/features/stations';
import { useInterval } from 'src/hooks/useInterval';
import { CrewStation, ShipSystem } from 'src/types/ShipSystem';
import { SensorsAction } from '../types/SensorsState';
import { Sensors } from './Sensors';
import { Space } from 'src/classes/Space';
import { SpaceAction, getStorySpaceReducer } from 'src/features/stations/utils/getStorySpaceReducer';
import { ObjectId } from 'src/types/GameObjectInfo';

interface Props {
    getInitialState: () => Space;
    renderMenuItems?: () => JSX.Element;
}

const shipId = 1;
const spaceReducer = getStorySpaceReducer(shipId, crewActionReducer);
const sensorsActionReducer = (space: Space, action: SpaceAction<SensorsAction>) => spaceReducer(space, action.type === 'tick' ? action : { station: CrewStation.Science, action });

export const SensorsTraining: React.FC<Props> = (props) => {
    const [space, dispatch] = useReducer(produce(sensorsActionReducer), undefined, props.getInitialState);

    // Run tick action at a regular interval.
    useInterval(() => dispatch({ type: 'tick' }), 200);

    return (
        <CoreSensorsTraining
            dispatch={dispatch}
            renderMenuItems={props.renderMenuItems}
            space={space}
            shipId={shipId}
        />
    );
};

interface CoreProps {
    dispatch: Dispatch<SensorsAction>;
    renderMenuItems?: () => JSX.Element;
    space: Space;
    shipId: ObjectId;
}

export const CoreSensorsTraining: React.FC<CoreProps> = (props) => {
    const { dispatch, renderMenuItems, space, shipId } = props;
    const ship = space.objects.get(shipId) as Ship;
    const { power, health } = ship.systems.get(ShipSystem.Sensors);
    
    return (
        <Sensors
            power={power}
            health={health}
            shipDestroyed={ship.destroyed}
            targets={ship.sensors.possibleTargets}
            viewTarget={ship.viewTarget}
            setViewTarget={target => dispatch({ type: 'view', target })}
            scanTarget={ship.sensors.currentTarget?.id}
            setScanTarget={target => dispatch({ type: 'target', target })}
            scanTargetTree={ship.sensors.scanTree}
            scanItem={ship.sensors.currentScan}
            scanCellBoard={ship.sensors.scanCellBoard}
            setScanItem={scan => dispatch({ type: 'scan', scan })}
            revealCell={index => dispatch({ type: 'reveal', index })}
            flagCell={index => dispatch({ type: 'flag', index })}
            renderMenuItems={renderMenuItems}
        />
    );
}