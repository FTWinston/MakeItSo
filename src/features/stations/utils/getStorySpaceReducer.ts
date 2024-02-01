import { Ship } from 'src/classes/Ship';
import { Space } from 'src/classes/Space';
import { ObjectId } from 'src/types/GameObjectInfo';
import { getTime } from 'src/utils/timeSpans';

export type SpaceAction<TShipAction extends {}> = TShipAction | {
    type: 'tick';
}

// For stories, the state is held in an immer reducer, so is immutable.
// Given a ship action reducer, this story returns a space reducer which also accepts an action to tick everything in that space.
export function getStorySpaceReducer<TShipAction extends {}>(shipId: ObjectId, shipReducer: (ship: Ship, action: TShipAction) => void) {
    return (space: Space, action: SpaceAction<TShipAction>) => {
        const type = (action as any).type;
        if (typeof type === 'string') {
            switch (type) {
                case 'tick':
                    return space.tick(getTime());
            }
        }
        
        const ship = space.objects.get(shipId);
        
        if (!ship || !(ship instanceof Ship)) {
            console.error('invalid ship ID', shipId);
            return;
        }

        return shipReducer(ship, action as TShipAction);
    }
}
