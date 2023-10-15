import type { ObjectId } from 'src/types/GameObjectInfo';
import { SpaceInfo } from 'src/types/SpaceInfo';
import { GameObject } from './GameObject';

export class Space implements SpaceInfo {
    private readonly _objects = new Map<ObjectId, GameObject>();

    public get objects(): ReadonlyMap<ObjectId, GameObject> { return this._objects; }

    private nextId = 1;

    public getNewId(): ObjectId {
        return this.nextId++;
    }

    public add(object: GameObject) {
        this._objects.set(object.id, object);
    }

    public remove (id: ObjectId) {
        this._objects.delete(id);
    }
}