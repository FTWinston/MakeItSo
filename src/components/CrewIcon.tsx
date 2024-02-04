import { ComponentProps } from 'react';
import { CrewStation } from 'src/types/ShipSystem';
import HelmIcon from '@mui/icons-material/NearMe';
import WeaponsIcon from '@mui/icons-material/Flare';
import SensorsIcon from '@mui/icons-material/Sensors';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { useTranslation } from 'react-i18next';

type Props = Omit<ComponentProps<typeof HelmIcon>, 'titleAccess'> & {
    station: CrewStation;
}

export const CrewIcon: React.FC<Props> = props => {
    const { station, ...iconProps } = props;
    const { t } = useTranslation('common');

    let Icon;
    let title;

    switch (station) {
    case CrewStation.Helm:
        Icon = HelmIcon;
        title = t('station helm');
        break;
    case CrewStation.Tactical:
        Icon = WeaponsIcon;
        title = t('station tactical');
        break;
    case CrewStation.Science:
        Icon = SensorsIcon;
        title = t('station science');
        break;
    case CrewStation.Engineering:
        Icon = EngineeringIcon;
        title = t('station engineer');
        break;
    default:
        throw new UnexpectedValueError(station as never);
    }

    return <Icon {...iconProps} titleAccess={title} />;
};