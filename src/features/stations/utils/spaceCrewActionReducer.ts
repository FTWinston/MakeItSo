import { Ship } from 'src/classes/Ship';
import { Space } from 'src/classes/Space';
import { ObjectId } from 'src/types/GameObjectInfo';
import { getTime } from 'src/utils/timeSpans';
import { CrewAction, crewActionReducer } from './crewActionReducer';

interface SpaceCrewAction extends CrewAction {
    shipId: ObjectId;
}

type TrainingAction = SpaceCrewAction | {
    station: null;
    type: 'tick';
};

// With training stories, the state is held in an immer reducer, so is immutable. Thus just for them, ticking has to be shoehorned into this reducer.
export function spaceCrewActionReducer(space: Space, action: TrainingAction): void {
    if (action.station === null) {
        switch (action.type) {
            case 'tick':
                space.tick(getTime());
                break;
        }
    }
    else {
        const ship = space.objects.get(action.shipId);

        if (!ship || !(ship instanceof Ship)) {
            console.error('invalid ship ID', action.shipId);
            return;
        }
        if (ship.destroyed) {
            return;
        }

        return crewActionReducer(ship, action);
    }
}
