import { TextParameters } from 'src/types/TextParameters';
import { TimeSpan } from 'src/types/TimeSpan';

export interface ScanItemInfoDetail {
    action: false,
    values: TextParameters;
}

export interface ScanItemActionDetail {
    action: true,
    values: TextParameters;
    canActivate: boolean;
    cooldown?: TimeSpan;
}

export type ScanItemDetail = ScanItemInfoDetail | ScanItemActionDetail;
