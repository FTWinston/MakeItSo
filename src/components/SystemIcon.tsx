import React from 'react';
import { IconColorName } from 'src/types/Colors';
import { ShipSystem } from 'src/types/ShipSystem';
import HelmIcon from '@mui/icons-material/NearMe';
import WeaponsIcon from '@mui/icons-material/Flare';
import SensorsIcon from '@mui/icons-material/FindReplace';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HullIcon from '@mui/icons-material/LocalHospital';
import ShieldIcon from '@mui/icons-material/Shield';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';

interface Props {
    className?: string;
    system: ShipSystem;
    color?: IconColorName;
}

export const SystemIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.system) {
    case ShipSystem.Engines:
        Icon = HelmIcon;
        break;
    case ShipSystem.Weapons:
        Icon = WeaponsIcon;
        break;
    case ShipSystem.Sensors:
        Icon = SensorsIcon;
        break;
    case ShipSystem.Reactor:
        Icon = EngineeringIcon;
        break;
    case ShipSystem.Hull:
        Icon = HullIcon;
        break;
    case ShipSystem.Shields:
        Icon = ShieldIcon;
        break;
    default:
        throw new UnexpectedValueError(props.system);
    }

    return <Icon color={props.color} className={props.className} />;
};