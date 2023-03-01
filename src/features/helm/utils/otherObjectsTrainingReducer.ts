import { GameObject } from 'src/types/GameObject';
import { ObjectId } from 'src/types/GameObjectInfo';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';

type OtherObjectsAction = {
    type: 'tick';
    currentTime: number;
} | {
    type: 'remove';
    id: ObjectId;
}

export function otherObjectsTrainingReducer(state: GameObject[], action: OtherObjectsAction): GameObject[] | void {
    switch (action.type) {
        case 'tick': {
            for (const obj of state) {
                obj.updateMotion(action.currentTime);
            }
            break;
        }

        case 'remove': {
            return state.filter(obj => obj.id !== action.id);
        }

        default:
            throw new UnexpectedValueError(action);
    }
}

