import type { Faction, FactionId } from 'src/types/Faction';
import { RelationshipType } from 'src/types/RelationshipType';

export class Factions {
    constructor(factions: Faction[]) {
        this.factions = new Map();

        for (const faction of factions) {
            const relations = new Map<FactionId, RelationshipType>(
                Object.entries(faction.relations)
            );
            this.factions.set(faction.id, relations);
        }
    }

    private factions: Map<FactionId, Map<FactionId, RelationshipType>>;

    public getRelation(from: FactionId, to: FactionId): RelationshipType {
        const fromFactionRelations = this.factions.get(from);
        const relation = fromFactionRelations?.get(to);

        return relation ?? RelationshipType.Ignore;
    }

    public setRelation(from: FactionId, to: FactionId, relation: RelationshipType) {
        let fromFactionRelations = this.factions.get(from);
        if (fromFactionRelations === undefined) {
            fromFactionRelations = new Map();
            this.factions.set(from, fromFactionRelations);
        }

        if (relation === RelationshipType.Ignore) {
            fromFactionRelations.delete(to);
        }
        else {
            fromFactionRelations.set(to, relation);
        }
    }
}