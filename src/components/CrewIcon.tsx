import { ComponentProps } from 'react';
import { CrewStation } from 'src/types/ShipSystem';
import HelmIcon from '@mui/icons-material/NearMe';
import WeaponsIcon from '@mui/icons-material/Flare';
import SensorsIcon from '@mui/icons-material/Sensors';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';

type Props = ComponentProps<typeof HelmIcon> & {
    station: CrewStation;
}

export const CrewIcon: React.FC<Props> = props => {
    const { station, ...iconProps } = props;

    let Icon;
    switch (station) {
    case CrewStation.Helm:
        Icon = HelmIcon;
        break;
    case CrewStation.Weapons:
        Icon = WeaponsIcon;
        break;
    case CrewStation.Sensors:
        Icon = SensorsIcon;
        break;
    case CrewStation.Engineering:
        Icon = EngineeringIcon;
        break;
    default:
        throw new UnexpectedValueError(station as never);
    }

    return <Icon {...iconProps} />;
};