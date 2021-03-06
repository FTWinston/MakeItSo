import React from 'react';
import { PowerLevel } from '../data/PowerLevel';
import OffIcon from '@material-ui/icons/SignalCellularNull';
import LowIcon from '@material-ui/icons/SignalCellular0Bar';
import MedIcon from '@material-ui/icons/SignalCellular1Bar';
import HighIcon from '@material-ui/icons/SignalCellular3Bar';
import FullIcon from '@material-ui/icons/SignalCellular4Bar';
import { IconColorName } from './Colors';

interface Props {
    className?: string;
    level?: PowerLevel;
    color?: IconColorName;
}

export const PowerIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.level) {
        case PowerLevel.Off:
            Icon = OffIcon;
            break;
        case PowerLevel.Low:
            Icon = LowIcon;
            break;
        case PowerLevel.Med:
            Icon = MedIcon;
            break;
        case PowerLevel.High:
            Icon = HighIcon;
            break;
        case PowerLevel.Full:
        default:
            Icon = FullIcon;
            break;
    }

    return <Icon color={props.color} className={props.className} />
}