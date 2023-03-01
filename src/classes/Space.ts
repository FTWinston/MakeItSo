import type { GameObjectInfo, ObjectId } from './GameObjectInfo';
import { SpaceInfo } from './SpaceInfo';

export class Space implements SpaceInfo {
    readonly objects = new Map<ObjectId, GameObjectInfo>();
}