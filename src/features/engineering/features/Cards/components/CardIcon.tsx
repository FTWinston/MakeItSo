import RelocateHereIcon from '@mui/icons-material/PanToolAlt';
import DivertIcon from '@mui/icons-material/Redo';
import PurgeIcon from '@mui/icons-material/BlurOff';
import RewindIcon from '@mui/icons-material/Replay';
import DrawPowerIcon from '@mui/icons-material/Compress';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { EngineeringCardType } from '../types/EngineeringCard';
import { EffectIcon } from '../../SystemTiles';

interface Props {
    className?: string;
    card: EngineeringCardType;
}

export const CardIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.card) {
    case EngineeringCardType.AuxPower:
        return <EffectIcon effect={SystemStatusEffectType.AuxPower} className={props.className} />;
    case EngineeringCardType.StoreCharge:
    case EngineeringCardType.StoredCharge:
        return <EffectIcon effect={SystemStatusEffectType.StoredCharge} className={props.className} />;
    case EngineeringCardType.Relocate:
        return <EffectIcon effect={SystemStatusEffectType.Relocating} className={props.className} />;
    case EngineeringCardType.RelocateHere:
        Icon = RelocateHereIcon;
        break;
    case EngineeringCardType.DivertHull:
    case EngineeringCardType.DivertShields:
    case EngineeringCardType.DivertSensors:
    case EngineeringCardType.DivertWeapons:
    case EngineeringCardType.DivertEngines:
    case EngineeringCardType.DivertReactor:
        Icon = DivertIcon;
        break;
    case EngineeringCardType.Overcharge:
        return <EffectIcon effect={SystemStatusEffectType.Overcharge} className={props.className} />;
    case EngineeringCardType.ReactorOverload:
        return <EffectIcon effect={SystemStatusEffectType.ReactorOverload} className={props.className} />;
    case EngineeringCardType.Purge:
        Icon = PurgeIcon;
        break;
    case EngineeringCardType.Reset:
        return <EffectIcon effect={SystemStatusEffectType.Reset} className={props.className} />;
    case EngineeringCardType.Rewind:
        Icon = RewindIcon;
        break;
    case EngineeringCardType.DrawPower:
        Icon = DrawPowerIcon;
        break;
    default:
        Icon = UnknownIcon;
        break;
    }

    return <Icon className={props.className} />;
};