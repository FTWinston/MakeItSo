import RelocateHereIcon from '@mui/icons-material/PanToolAlt';
import PurgeIcon from '@mui/icons-material/BlurOff';
import RewindIcon from '@mui/icons-material/Replay';
import BalanceShieldsIcon from '@mui/icons-material/GppMaybe';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { EngineeringCardType } from '../types/EngineeringCard';
import { EffectIcon } from '../../SystemTiles';
import { IconType } from 'src/lib/mui';

interface Props {
    className?: string;
    card: EngineeringCardType;
}

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
    [EngineeringCardType.ReplaceHull, SystemStatusEffectType.Replace],
    [EngineeringCardType.ReplaceShields, SystemStatusEffectType.Replace],
    [EngineeringCardType.ReplaceSensors, SystemStatusEffectType.Replace],
    [EngineeringCardType.ReplaceWeapons, SystemStatusEffectType.Replace],
    [EngineeringCardType.ReplaceEngines, SystemStatusEffectType.Replace],
    [EngineeringCardType.ReplaceReactor, SystemStatusEffectType.Replace],
    [EngineeringCardType.Overcharge, SystemStatusEffectType.Overcharge],
    [EngineeringCardType.ReactorOverload, SystemStatusEffectType.ReactorOverload],
    [EngineeringCardType.Reset, SystemStatusEffectType.Reset],
    [EngineeringCardType.Rebuild, SystemStatusEffectType.Rebuild],
    [EngineeringCardType.DrawPower, SystemStatusEffectType.DrawnPower],
    [EngineeringCardType.FocusShields, SystemStatusEffectType.ShieldFocus],
]);

const iconsByCardType = new Map<EngineeringCardType, IconType>([
    [EngineeringCardType.RelocateHere, RelocateHereIcon],
    [EngineeringCardType.Purge, PurgeIcon],
    [EngineeringCardType.Rewind, RewindIcon],
    [EngineeringCardType.BalanceShields, BalanceShieldsIcon],
]);

export const CardIcon: React.FC<Props> = props => {
    const effectTypeForIcon = effectTypesByCardType.get(props.card);
    if (effectTypeForIcon) {
        return <EffectIcon effect={effectTypeForIcon} className={props.className} />;
    }

    const Icon = iconsByCardType.get(props.card) ?? UnknownIcon;
    
    return <Icon className={props.className} />;
};