import type { GameObjectInfo, ObjectId } from './GameObjectInfo';

export interface ReferenceInfo<T extends GameObjectInfo> {
    readonly id?: ObjectId;
    readonly value?: T;
}