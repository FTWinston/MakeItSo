import React from 'react';
import { System } from '../../data/System';
import HelmIcon from '@material-ui/icons/NearMe';
import FtlIcon from '@material-ui/icons/Explore';
import WeaponsIcon from '@material-ui/icons/Flare';
import SensorsIcon from '@material-ui/icons/FindReplace';
import EngineeringIcon from '@material-ui/icons/SettingsApplications';
import DamageIcon from '@material-ui/icons/Whatshot';

interface Props {
    className?: string;
    system: System;
    color?: IconColorName;
}

export const SystemIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.system) {
        case System.Helm:
            Icon = HelmIcon;
            break;
        case System.FTL:
            Icon = FtlIcon;
            break;
        case System.Weapons:
            Icon = WeaponsIcon;
            break;
        case System.Sensors:
            Icon = SensorsIcon;
            break;
        case System.Engineering:
            Icon = EngineeringIcon;
            break;
        case System.DamageControl:
        default:
            Icon = DamageIcon;
            break;
    }

    return <Icon color={props.color} className={props.className} />
}