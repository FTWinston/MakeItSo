import { ObjectId } from 'src/types/GameObjectInfo';
import { ObjectAppearance } from 'src/types/ObjectAppearance';

// TODO: this should be saved somewhere more general
export enum RelationshipType {
    Unknown = 0,
    Hostile = 1,
    Neutral = 2,
    Friendly = 3,
}

export interface SensorTarget {
    id: ObjectId;
    relationship: RelationshipType;
    appearance: ObjectAppearance;
    description: string;
}
