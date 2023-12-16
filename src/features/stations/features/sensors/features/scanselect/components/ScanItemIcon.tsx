import { ComponentProps } from 'react';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { ScanItemId } from '../types/ScanItemId';
import Info from '@mui/icons-material/Info';
import EnginePower from '@mui/icons-material/EvStation';
import EngineVulnerability from '@mui/icons-material/SettingsSuggest';
import ShieldPower from '@mui/icons-material/PrivacyTip';
import ShieldVulnerability from '@mui/icons-material/GppBad';
import WeaponPower from '@mui/icons-material/TrackChanges';
import WeaponVulnerability from '@mui/icons-material/CrisisAlert';
import SensorPower from '@mui/icons-material/PermScanWifi';
import SensorVulnerability from '@mui/icons-material/WifiOff';
import FakeExtra from '@mui/icons-material/DeleteOutline';

type Props = Omit<ComponentProps<typeof Info>, 'titleAccess'> & {
    id: ScanItemId;
    title: string;
}

export const ScanItemIcon: React.FC<Props> = props => {
    const { id, ...iconProps } = props;

    let Icon;

    switch (id) {
    case 'basic info':
        Icon = Info;
        break;
    case 'engine power':
        Icon = EnginePower;
        break;
    case 'engine vulnerability':
        Icon = EngineVulnerability;
        break;
    case 'shield power':
        Icon = ShieldPower;
        break;
    case 'shield vulnerability':
        Icon = ShieldVulnerability;
        break;
    case 'weapon power':
        Icon = WeaponPower;
        break;
    case 'weapon vulnerability':
        Icon = WeaponVulnerability;
        break;
    case 'sensor power':
        Icon = SensorPower;
        break;
    case 'sensor vulnerability':
        Icon = SensorVulnerability;
        break;
    case 'fake extra 1':
    case 'fake extra 2':
    case 'fake extra 3':
    case 'fake extra 4':
    case 'fake extra 5':
    case 'fake extra 6':
    case 'fake extra 7':
        Icon = FakeExtra;
        break;
    default:
        throw new UnexpectedValueError(id);
    }

    return <Icon {...iconProps} titleAccess={props.title} />;
};
