import React from 'react';
import BoostShieldIcon from '@material-ui/icons/Security';
import PurgeIcon from '@material-ui/icons/BlurOff';
import UnknownIcon from '@material-ui/icons/HelpOutline';
import { EngineeringCardType } from '../../data/EngineeringCard';
import { System } from '../../data/System';
import { SystemIcon } from '../common/SystemIcon';
import { EffectIcon } from './EffectIcon';
import { SystemStatusEffectType } from '../../data/SystemStatusEffect';

interface Props {
    className?: string;
    card: EngineeringCardType;
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
}

export const CardIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.card) {
        case EngineeringCardType.Boost1:
            return <EffectIcon effect={SystemStatusEffectType.Boost1} color={props.color} />
        case EngineeringCardType.BoostHelm:
            return <SystemIcon system={System.Helm} color={props.color} />
        case EngineeringCardType.BoostFTL:
            return <SystemIcon system={System.FTL} color={props.color} />
        case EngineeringCardType.BoostWeapons:
            return <SystemIcon system={System.Weapons} color={props.color} />
        case EngineeringCardType.BoostSensors:
            return <SystemIcon system={System.Sensors} color={props.color} />
        case EngineeringCardType.BoostEngineering:
            return <SystemIcon system={System.Engineering} color={props.color} />
        case EngineeringCardType.BoostShields:
            Icon = BoostShieldIcon;
            break;
        case EngineeringCardType.Boost2:
            return <EffectIcon effect={SystemStatusEffectType.Boost2} color={props.color} />
        case EngineeringCardType.Overload:
            return <EffectIcon effect={SystemStatusEffectType.Overload} color={props.color} />
        case EngineeringCardType.RepairSmall:
        case EngineeringCardType.RepairMedium:
        case EngineeringCardType.RepairLarge:
            return <EffectIcon effect={SystemStatusEffectType.Repair} color={props.color} />
        case EngineeringCardType.SwapSystems:
            return <EffectIcon effect={SystemStatusEffectType.Swap} color={props.color} />
        case EngineeringCardType.Purge:
            Icon = PurgeIcon;
            break;
        case EngineeringCardType.ColdRestart:
            return <EffectIcon effect={SystemStatusEffectType.Offline} color={props.color} />
        case EngineeringCardType.HotSwap:
            return <EffectIcon effect={SystemStatusEffectType.HotSwap} color={props.color} />
        case EngineeringCardType.Supercharge:
            return <EffectIcon effect={SystemStatusEffectType.Supercharge} color={props.color} />
        default:
            Icon = UnknownIcon;
            break;
    }

    return <Icon color={props.color} className={props.className} />
}