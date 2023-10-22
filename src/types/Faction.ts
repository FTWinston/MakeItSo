import { RelationshipType } from './RelationshipType';

export type FactionId = string;

export interface Faction<TId extends FactionId = FactionId> {
    id: TId;
    relations: Record<TId, RelationshipType>;
}