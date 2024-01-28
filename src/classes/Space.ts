import type { Faction } from 'src/types/Faction';
import type { ObjectId } from 'src/types/GameObjectInfo';
import type { SpaceInfo } from 'src/types/SpaceInfo';
import { GameObject } from './GameObject';
import { Factions } from './Factions';
import { Clearable, Reference } from './Reference';

export class Space implements SpaceInfo {
    constructor(factions: Faction[] = []) {
        this.factions = new Factions(factions);
    }

    public readonly factions: Factions;

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
        
        // Clear all references to an object when that object itself is removed.
        const references = this.referencesByObject.get(id);

        if (references) {
            for (const reference of references) {
                reference.clear();
            }
        }
    }

    private readonly referencesByObject = new Map<ObjectId, Set<Clearable>>();

    public createReference<T extends GameObject>(object: T): Reference<T> {
        const reference = new Reference(object);
        
        let references = this.referencesByObject.get(object.id);

        if (!references) {
            references = new Set();
            this.referencesByObject.set(object.id, references);
        }
        
        references.add(reference);

        return reference;
    }

    public tick(currentTime: number) {
        for (const object of this._objects.values()) {
            object.tick(currentTime);
        }
    }
}