import type { GameObjectInfo, ObjectId } from './GameObjectInfo';

export interface SpaceInfo {
    objects: Map<ObjectId, GameObjectInfo>;
}