import { immerable } from 'immer';
import { Keyframes } from 'src/types/Keyframes';
import { GameObjectInfo, ObjectId } from 'src/types/GameObjectInfo';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { Position } from 'src/types/Position';
import { RelationshipType } from 'src/types/RelationshipType';
import { Vector2D } from 'src/types/Vector2D';
import { interpolatePosition, interpolateVector } from 'src/utils/interpolate';
import { durationToTicks } from 'src/utils/timeSpans';
import { Space } from './Space';
import { ScanTreeDefinition } from 'src/features/stations';
import type { GenerationConfig, ScanItemId } from 'src/features/stations/features/sensors';
import { FactionId } from 'src/types/Faction';

const twoTicks = durationToTicks(2);

export abstract class GameObject implements GameObjectInfo {
    [immerable] = true;

    constructor(public readonly space: Space) {
        this.id = space.getNewId();
        space.add(this);
    }

    public readonly id: ObjectId;

    public abstract get draw(): ObjectAppearance;

    public abstract get faction(): FactionId | undefined;

    public isVisibleTo(observer: GameObject) {
        return true;
    }

    public getRelationship(target: GameObjectInfo): RelationshipType {
        if (!this.faction || !target.faction) {
            return RelationshipType.Ignore;
        }

        return this.space.factions.getRelation(this.faction, target.faction);
    }

    public delete() {
        this.space.remove(this.id);
    }

    motion: Keyframes<Position> = [];

    public tick(currentTime: number) {
        this.updateMotion(currentTime);
    }

    protected abstract updateMotion(currentTime: number): void;

    public get evasionChance() { return 0; }

    getPosition(currentTime: number): Position {
        return interpolatePosition(this.motion, currentTime);
    }

    getVelocity(currentTime: number): Vector2D {
        const pos1 = interpolateVector(this.motion, currentTime - 1);
        const pos2 = interpolateVector(this.motion, currentTime + 1);

        return {
            x: (pos2.x - pos1.x) / twoTicks,
            y: (pos2.y - pos1.y) / twoTicks,
        }
    }

    abstract getScanTree(): ScanTreeDefinition;

    getScanConfig(scan: ScanItemId): GenerationConfig {
        // TODO: make this abstract, implement differently on e.g. shipType

        switch (scan) {
            case 'basic info':
                return {
                    numCells: 25,
                    gapFraction: 0.4,

                    bombFraction: 0.3,
                    unknownFraction: 0,
                    revealChance: 0,
                    radiusClueChance: 0,
                    rowClueChance: 0,
                    contiguousClueChance: 0,
                    splitClueChance: 0,
                    remainingBombCountFraction: 0,
                };
            default:
                // TODO: randomize. And differently for different scans.
                return {
                    orientation: 'portrait',
                    numCells: 50,
                    gapFraction: 0.3,
                    
                    bombFraction: 0.55,
                    unknownFraction: 0,
                    revealChance: 0.1,
                    radiusClueChance: 0.05,
                    rowClueChance: 2,
                    contiguousClueChance: 0.5,
                    splitClueChance: 0.5,
                    remainingBombCountFraction: 0.25,
                };
        }
    }
}
