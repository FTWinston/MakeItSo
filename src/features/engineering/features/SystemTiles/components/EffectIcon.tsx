import AuxPowerIcon from '@mui/icons-material/Power';
import StoreChargeIcon from '@mui/icons-material/BatterySaver';
import RelocatingIcon from '@mui/icons-material/OpenWith';
import RelocatedIcon from '@mui/icons-material/SwapHoriz';
import Number1Icon from '@mui/icons-material/LooksOne';
import Number2Icon from '@mui/icons-material/LooksTwo';
import Number3Icon from '@mui/icons-material/Looks3';
import OverchargeIcon from '@mui/icons-material/Whatshot';
import ReactorOverloadIcon from '@mui/icons-material/Brightness7';
import ResetIcon from '@mui/icons-material/SettingsBackupRestore';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';

interface Props {
    className?: string;
    effect: SystemStatusEffectType;
}

export const EffectIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.effect) {
    case SystemStatusEffectType.AuxPower:
        Icon = AuxPowerIcon;
        break;
    case SystemStatusEffectType.StoreCharge:
    case SystemStatusEffectType.StoredCharge:
        Icon = StoreChargeIcon;
        break;
    case SystemStatusEffectType.Relocating:
        Icon = RelocatingIcon;
        break;
    case SystemStatusEffectType.Relocated:
        Icon = RelocatedIcon;
        break;
    case SystemStatusEffectType.Boost1:
    case SystemStatusEffectType.Reduce1:
        Icon = Number1Icon;
        break;
    case SystemStatusEffectType.Boost2:
    case SystemStatusEffectType.Reduce2:
        Icon = Number2Icon;
        break;
    case SystemStatusEffectType.Boost3:
    case SystemStatusEffectType.Reduce3:
        Icon = Number3Icon;
        break;
    case SystemStatusEffectType.Overcharge:
        Icon = OverchargeIcon;
        break;
    case SystemStatusEffectType.ReactorOverload:
        Icon = ReactorOverloadIcon;
        break;
    case SystemStatusEffectType.Reset:
        Icon = ResetIcon;
        break;
    default:
        Icon = UnknownIcon as never;
        break;
    }

    return <Icon className={props.className} />;
};