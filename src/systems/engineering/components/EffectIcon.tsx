import React from 'react';
import UnknownIcon from '@material-ui/icons/HelpOutline';
import Boost1Icon from '@material-ui/icons/ExposurePlus1';
import Boost2Icon from '@material-ui/icons/ExposurePlus2';
import Boost3Icon from '@material-ui/icons/VerticalAlignTop';
import Reduce1Icon from '@material-ui/icons/ExposureNeg1';
import Reduce2Icon from '@material-ui/icons/ExposureNeg2';
import Reduce3Icon from '@material-ui/icons/VerticalAlignBottom';
import OverloadIcon from '@material-ui/icons/Warning';
import SuperchargeIcon from '@material-ui/icons/FlashOn';
import DamageIcon from '@material-ui/icons/Whatshot';
import RepairIcon from '@material-ui/icons/Build';
import SwapIcon from '@material-ui/icons/SwapVert';
import OfflineIcon from '@material-ui/icons/PowerOff';
import HotSwapIcon from '@material-ui/icons/PowerSettingsNew';
import { SystemStatusEffectType } from '../../../common/data/SystemStatusEffect';
import { IconColorName } from '../../../common/components/Colors';

interface Props {
    className?: string;
    effect: SystemStatusEffectType;
    color?: IconColorName;
}

export const EffectIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.effect) {
        case SystemStatusEffectType.Boost1:
            Icon = Boost1Icon;
            break;
        case SystemStatusEffectType.Boost2:
            Icon = Boost2Icon;
            break;
        case SystemStatusEffectType.Boost3:
            Icon = Boost3Icon;
            break;
        case SystemStatusEffectType.Reduce1:
            Icon = Reduce1Icon;
            break;
        case SystemStatusEffectType.Reduce2:
            Icon = Reduce2Icon;
            break;
        case SystemStatusEffectType.Reduce3:
            Icon = Reduce3Icon;
            break;
        case SystemStatusEffectType.Overload:
            Icon = OverloadIcon;
            break;
        case SystemStatusEffectType.Damage:
            Icon = DamageIcon;
            break;
        case SystemStatusEffectType.Repair:
            Icon = RepairIcon;
            break;
        case SystemStatusEffectType.Swap:
            Icon = SwapIcon;
            break;
        case SystemStatusEffectType.Offline:
            Icon = OfflineIcon;
            break;
        case SystemStatusEffectType.HotSwap:
            Icon = HotSwapIcon;
            break;
        case SystemStatusEffectType.Supercharge:
            Icon = SuperchargeIcon;
            break;
        default:
            Icon = UnknownIcon as never;
            break;
    }

    return <Icon color={props.color} className={props.className} />
}