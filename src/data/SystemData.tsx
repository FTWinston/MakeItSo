import { System } from './System';
import HelmIcon from '@material-ui/icons/NearMe';
import FtlIcon from '@material-ui/icons/Explore';
import WeaponsIcon from '@material-ui/icons/Flare';
import SensorsIcon from '@material-ui/icons/FindReplace';
import EngineeringIcon from '@material-ui/icons/SettingsApplications';
import DamageIcon from '@material-ui/icons/Whatshot';

export function getName(system: System) {
    switch (system) {
        case System.Helm:
            return 'Helm';
        case System.FTL:
            return 'FTL';
        case System.Weapons:
            return 'Weapons';
        case System.Sensors:
            return 'Sensors';
        case System.Engineering:
            return 'Engineering';
        case System.DamageControl:
            return 'Damage Control';
        default:
            return '';
    }
}

export function getIcon(system: System) {
    switch (system) {
        case System.Helm:
            return HelmIcon;
        case System.FTL:
            return FtlIcon;
        case System.Weapons:
            return WeaponsIcon;
        case System.Sensors:
            return SensorsIcon;
        case System.Engineering:
            return EngineeringIcon;
        case System.DamageControl:
        default:
            return DamageIcon;
    }
}