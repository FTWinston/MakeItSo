import BoostShieldIcon from '@mui/icons-material/Security';
import PurgeIcon from '@mui/icons-material/BlurOff';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { EngineeringCardType } from '../types/EngineeringCard';
import { SystemIcon } from 'src/components/SystemIcon';
import { EffectIcon } from '../../SystemTiles';
import { ShipSystem } from 'src/types/ShipSystem';

interface Props {
    className?: string;
    card: EngineeringCardType;
}

export const CardIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.card) {
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
    case EngineeringCardType.Purge:
        Icon = PurgeIcon;
        break;
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