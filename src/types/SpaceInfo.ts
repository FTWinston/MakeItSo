import type { GameObjectInfo, ObjectId } from './GameObjectInfo';

export interface SpaceInfo {
    objects: ReadonlyMap<ObjectId, GameObjectInfo>;
}