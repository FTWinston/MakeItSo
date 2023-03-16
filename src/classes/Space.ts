import type { GameObjectInfo, ObjectId } from 'src/types/GameObjectInfo';
import { SpaceInfo } from 'src/types/SpaceInfo';

export class Space implements SpaceInfo {
    readonly objects = new Map<ObjectId, GameObjectInfo>();
}