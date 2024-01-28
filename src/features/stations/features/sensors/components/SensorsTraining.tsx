import { produce } from 'immer';
import { useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { crewActionReducer } from 'src/features/stations';
import { useInterval } from 'src/hooks/useInterval';
import { CrewStation, ShipSystem } from 'src/types/ShipSystem';
import { getTime } from 'src/utils/timeSpans';
import { SensorsAction } from '../types/SensorsState';
import { Sensors } from './Sensors';

interface Props {
    getInitialState: () => Ship;
    //customRender?: (dispatch: Dispatch<SensorsAction>, defaultRender: () => JSX.Element) => JSX.Element;
}

const sensorsActionReducer = (ship: Ship, action: SensorsAction) => crewActionReducer(ship, { station: CrewStation.Sensors, action });

export const SensorsTraining: React.FC<Props> = (props) => {
    const { getInitialState } = props;

    const [state, dispatch] = useReducer(produce(sensorsActionReducer), undefined, getInitialState);

    // Run tick action at a regular interval.
    useInterval(() => state.space.tick(getTime()), 200);

    const { power, health } = state.systems.get(ShipSystem.Sensors);
    
    const defaultRender = () => (
        <Sensors
            power={power}
            health={health}
            shipDestroyed={state.destroyed}
            targets={state.sensors.possibleTargets}
            viewTarget={state.viewTarget}
            setViewTarget={target => dispatch({ type: 'view', target })}
            scanTarget={state.sensors.currentTarget?.id}
            setScanTarget={target => dispatch({ type: 'target', target })}
            scanTargetTree={state.sensors.scanTree}
            scanItem={state.sensors.currentScan}
            scanCellBoard={state.sensors.scanCellBoard}
            setScanItem={scan => dispatch({ type: 'scan', scan })}
            revealCell={index => dispatch({ type: 'reveal', index })}
            flagCell={index => dispatch({ type: 'flag', index })}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};