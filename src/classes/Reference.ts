import { immerable } from 'immer';
import { ObjectId } from 'src/types/GameObjectInfo';
import { GameObject } from './GameObject';
import { ReferenceInfo } from 'src/types/ReferenceInfo';

export interface Clearable {
    clear: () => void;
}

export class Reference<T extends GameObject> implements Clearable, ReferenceInfo<T> {
    [immerable] = true;

    constructor(value: T) {
        this._id = value.id;
        this._value = value;
    }
    
    private _id?: ObjectId;
    private _value?: T;

    get id() { return this._id; }
    get value() { return this._value; }

    clear() {
        delete this._id;
        delete this._value;
    }

    static empty<T extends GameObject>(): Reference<T> { return emptyReference; }
}

const emptyReference = new Reference<any>(undefined);
emptyReference.clear();