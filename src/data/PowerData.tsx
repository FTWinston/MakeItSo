import { PowerLevel } from './PowerLevel';
import OffIcon from '@material-ui/icons/SignalCellularNull';
import LowIcon from '@material-ui/icons/SignalCellular1Bar';
import MedIcon from '@material-ui/icons/SignalCellular2Bar';
import HighIcon from '@material-ui/icons/SignalCellular3Bar';
import FullIcon from '@material-ui/icons/SignalCellular4Bar';

export function getName(power: PowerLevel) {
    switch (power) {
        case PowerLevel.Off:
            return 'Disabled';
        case PowerLevel.Low:
            return 'Low Power';
        case PowerLevel.Med:
            return 'Med Power';
        case PowerLevel.High:
            return 'High Power';
        case PowerLevel.Full:
            return 'Full Power';
        default:
            return '';
    }
}

export function getIcon(power: PowerLevel) {
    switch (power) {
        case PowerLevel.Off:
            return OffIcon;
        case PowerLevel.Low:
            return LowIcon;
        case PowerLevel.Med:
            return MedIcon;
        case PowerLevel.High:
            return HighIcon;
        case PowerLevel.Full:
        default:
            return FullIcon;
    }
}