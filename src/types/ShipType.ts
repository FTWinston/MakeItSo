import { ScanTreeTemplate } from 'src/features/stations';
import { FactionId } from './Faction';
import { ObjectAppearance } from './ObjectAppearance';

export interface ShipType {
    id: string;
    draw: ObjectAppearance,
    faction: FactionId,
    scanTree: ScanTreeTemplate,
}
