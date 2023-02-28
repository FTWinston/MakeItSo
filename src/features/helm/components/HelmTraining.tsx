import produce from 'immer';
import { useEffect, useReducer, useRef } from 'react';
import { GameObject } from 'src/types/GameObject';
import { GameObjectInfo, ObjectId } from 'src/types/GameObjectInfo';
import { Ship } from 'src/types/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { getTime } from 'src/utils/timeSpans';
import { helmTrainingReducer } from '../utils/helmTrainingReducer';
import { Helm } from './Helm';

interface Props {
    getInitialState: () => Ship;
    getOtherObjects: () => GameObject[]
    //customRender?: (dispatch: Dispatch<HelmAction>, defaultRender: () => JSX.Element) => JSX.Element;
}

export const HelmTraining: React.FC<Props> = (props) => {
    const [ship, dispatch] = useReducer(produce(helmTrainingReducer), undefined, props.getInitialState);
    const otherObjects = useRef<GameObject[]>(props.getOtherObjects());

    const ships = new Map<ObjectId, GameObjectInfo>([[ship.id, ship]]);

    // Run tick action at a regular interval.
    useEffect(() => {
        const interval = setInterval(() => dispatch({ type: 'tick', currentTime: getTime() }), 200);

        return () => clearInterval(interval);
    });

    const { power, health } = ship.systems.get(ShipSystem.Engines);

    const defaultRender = () => (
        <Helm
            {...ship.helm}
            power={power}
            health={health}
            ship={ship}
            shipDestroyed={ship.destroyed}
            otherObjects={otherObjects.current}
            stop={() => dispatch({ type: 'stop' })}
            discardManeuverCard={() => dispatch({ type: 'discard' })}
            maneuvers={ship.helm.maneuvers}
            maneuverChoice={ship.helm.maneuverChoice}
            speedToManeuver={ship.helm.speed}
            destination={ship.helm.destination?.val ?? null}
            setDestination={destination => dispatch({ type: 'set destination', destination })}
            maneuver={choice => dispatch({ type: 'maneuver', choice })}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};