import RelocateHereIcon from '@mui/icons-material/PanToolAlt';
import PurgeIcon from '@mui/icons-material/BlurOff';
import RewindIcon from '@mui/icons-material/Replay';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { EngineeringCardType } from '../types/EngineeringCard';
import { EffectIcon } from '../../SystemTiles';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

interface Props {
    className?: string;
    card: EngineeringCardType;
}

type IconType = OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;

const effectTypesByCardType = new Map<EngineeringCardType, SystemStatusEffectType>([
    [EngineeringCardType.AuxPower, SystemStatusEffectType.AuxPower],
    [EngineeringCardType.StoreCharge, SystemStatusEffectType.StoredCharge],
    [EngineeringCardType.StoredCharge, SystemStatusEffectType.StoredCharge],
    [EngineeringCardType.Relocate, SystemStatusEffectType.Relocating],
    [EngineeringCardType.DivertHull, SystemStatusEffectType.DivertFrom],
    [EngineeringCardType.DivertShields, SystemStatusEffectType.DivertFrom],
    [EngineeringCardType.DivertSensors, SystemStatusEffectType.DivertFrom],
    [EngineeringCardType.DivertWeapons, SystemStatusEffectType.DivertFrom],
    [EngineeringCardType.DivertEngines, SystemStatusEffectType.DivertFrom],
    [EngineeringCardType.DivertReactor, SystemStatusEffectType.DivertFrom],
    [EngineeringCardType.Overcharge, SystemStatusEffectType.Overcharge],
    [EngineeringCardType.ReactorOverload, SystemStatusEffectType.ReactorOverload],
    [EngineeringCardType.Reset, SystemStatusEffectType.Reset],
    [EngineeringCardType.DrawPower, SystemStatusEffectType.DrawnPower],
]);

const iconsByCardType = new Map<EngineeringCardType, IconType>([
    [EngineeringCardType.RelocateHere, RelocateHereIcon],
    [EngineeringCardType.Purge, PurgeIcon],
    [EngineeringCardType.Rewind, RewindIcon],
]);

export const CardIcon: React.FC<Props> = props => {
    const effectTypeForIcon = effectTypesByCardType.get(props.card);
    if (effectTypeForIcon) {
        return <EffectIcon effect={effectTypeForIcon} className={props.className} />;
    }

    const Icon = iconsByCardType.get(props.card) ?? UnknownIcon;
    
    return <Icon className={props.className} />;
};