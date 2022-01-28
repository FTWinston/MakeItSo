import BoostShieldIcon from '@mui/icons-material/Security';
import PurgeIcon from '@mui/icons-material/BlurOff';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { EngineeringCardType } from '../types/EngineeringCard';
import { SystemIcon } from 'src/components/SystemIcon';
import { EffectIcon } from '../../SystemTiles';
import { IconColorName } from 'src/types/Colors';
import { ShipSystem } from 'src/types/ShipSystem';

interface Props {
    className?: string;
    card: EngineeringCardType;
    color?: IconColorName;
}

export const CardIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.card) {
    case EngineeringCardType.Boost1:
        return <EffectIcon effect={SystemStatusEffectType.Boost1} color={props.color} />;
    case EngineeringCardType.BoostHelm:
        return <SystemIcon system={ShipSystem.Engines} color={props.color} />;
    case EngineeringCardType.BoostWeapons:
        return <SystemIcon system={ShipSystem.Weapons} color={props.color} />;
    case EngineeringCardType.BoostSensors:
        return <SystemIcon system={ShipSystem.Sensors} color={props.color} />;
    case EngineeringCardType.BoostEngineering:
        return <SystemIcon system={ShipSystem.Reactor} color={props.color} />;
    case EngineeringCardType.BoostShields:
        Icon = BoostShieldIcon;
        break;
    case EngineeringCardType.Boost2:
        return <EffectIcon effect={SystemStatusEffectType.Boost2} color={props.color} />;
    case EngineeringCardType.Overload:
        return <EffectIcon effect={SystemStatusEffectType.Overload} color={props.color} />;
    case EngineeringCardType.RepairSmall:
    case EngineeringCardType.RepairMedium:
    case EngineeringCardType.RepairLarge:
        return <EffectIcon effect={SystemStatusEffectType.Repair} color={props.color} />;
    case EngineeringCardType.SwapSystems:
        return <EffectIcon effect={SystemStatusEffectType.SwapHorizontal} color={props.color} />;
    case EngineeringCardType.Purge:
        Icon = PurgeIcon;
        break;
    case EngineeringCardType.ColdRestart:
        return <EffectIcon effect={SystemStatusEffectType.Offline} color={props.color} />;
    case EngineeringCardType.HotSwap:
        return <EffectIcon effect={SystemStatusEffectType.HotSwap} color={props.color} />;
    case EngineeringCardType.Supercharge:
        return <EffectIcon effect={SystemStatusEffectType.Supercharge} color={props.color} />;
    default:
        Icon = UnknownIcon;
        break;
    }

    return <Icon color={props.color} className={props.className} />;
};