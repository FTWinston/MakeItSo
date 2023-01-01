import RelocateHereIcon from '@mui/icons-material/PanToolAlt';
import BoostShieldIcon from '@mui/icons-material/Security';
import DivertIcon from '@mui/icons-material/Redo';
import PurgeIcon from '@mui/icons-material/BlurOff';
import RewindIcon from '@mui/icons-material/Replay';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { EngineeringCardType } from '../types/EngineeringCard';
import { SystemIcon } from 'src/components';
import { EffectIcon } from '../../SystemTiles';
import { ShipSystem } from 'src/types/ShipSystem';

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

    case EngineeringCardType.Boost1:
        return <EffectIcon effect={SystemStatusEffectType.Boost1} className={props.className} />;
    case EngineeringCardType.BoostHelm:
        return <SystemIcon system={ShipSystem.Engines} className={props.className} />;
    case EngineeringCardType.BoostWeapons:
        return <SystemIcon system={ShipSystem.Weapons} className={props.className} />;
    case EngineeringCardType.BoostSensors:
        return <SystemIcon system={ShipSystem.Sensors} className={props.className} />;
    case EngineeringCardType.BoostEngineering:
        return <SystemIcon system={ShipSystem.Reactor} className={props.className} />;
    case EngineeringCardType.BoostShields:
        Icon = BoostShieldIcon;
        break;
    case EngineeringCardType.Boost2:
        return <EffectIcon effect={SystemStatusEffectType.Boost2} className={props.className} />;
    case EngineeringCardType.Overload:
        return <EffectIcon effect={SystemStatusEffectType.Overload} className={props.className} />;
    case EngineeringCardType.RepairSmall:
    case EngineeringCardType.RepairMedium:
    case EngineeringCardType.RepairLarge:
        return <EffectIcon effect={SystemStatusEffectType.Repair} className={props.className} />;
    case EngineeringCardType.SwapSystems:
        return <EffectIcon effect={SystemStatusEffectType.SwapHorizontal} className={props.className} />;
    case EngineeringCardType.ColdRestart:
        return <EffectIcon effect={SystemStatusEffectType.Offline} className={props.className} />;
    case EngineeringCardType.HotSwap:
        return <EffectIcon effect={SystemStatusEffectType.HotSwap} className={props.className} />;
    case EngineeringCardType.Supercharge:
        return <EffectIcon effect={SystemStatusEffectType.Supercharge} className={props.className} />;
    default:
        Icon = UnknownIcon;
        break;
    }

    return <Icon className={props.className} />;
};