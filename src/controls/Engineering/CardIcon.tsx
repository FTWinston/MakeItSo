import React from 'react';
import BoostShieldIcon from '@material-ui/icons/Security';
import UnknownIcon from '@material-ui/icons/HelpOutline';
import { PowerCardType } from '../../data/PowerCard';
import { System } from '../../data/System';
import { SystemIcon } from '../common/SystemIcon';
import { EffectIcon } from './EffectIcon';
import { PowerEffectType } from '../../data/PowerEffect';

interface Props {
    className?: string;
    card: PowerCardType;
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
}

export const CardIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.card) {
        case PowerCardType.Boost1:
            return <EffectIcon effect={PowerEffectType.Boost1} color={props.color} />
        case PowerCardType.BoostHelm:
            return <SystemIcon system={System.Helm} color={props.color} />
        case PowerCardType.BoostFTL:
            return <SystemIcon system={System.FTL} color={props.color} />
        case PowerCardType.BoostWeapons:
            return <SystemIcon system={System.Weapons} color={props.color} />
        case PowerCardType.BoostSensors:
            return <SystemIcon system={System.Sensors} color={props.color} />
        case PowerCardType.BoostEngineering:
            return <SystemIcon system={System.Engineering} color={props.color} />
        case PowerCardType.BoostShields:
            Icon = BoostShieldIcon;
            break;
        case PowerCardType.Boost2:
            return <EffectIcon effect={PowerEffectType.Boost2} color={props.color} />
        case PowerCardType.Overload:
            return <EffectIcon effect={PowerEffectType.Overload} color={props.color} />
        case PowerCardType.RepairSmall:
        case PowerCardType.RepairMedium:
        case PowerCardType.RepairLarge:
            return <EffectIcon effect={PowerEffectType.Repair} color={props.color} />
        default:
            Icon = UnknownIcon;
            break;
    }

    return <Icon color={props.color} className={props.className} />
}