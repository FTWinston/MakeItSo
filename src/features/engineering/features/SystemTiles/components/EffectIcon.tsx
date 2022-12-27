import AuxPowerIcon from '@mui/icons-material/Power';
import StoreChargeIcon from '@mui/icons-material/BatterySaver';
import RelocatingIcon from '@mui/icons-material/OpenWith';
import RelocatedIcon from '@mui/icons-material/SwapHoriz';
import Number1Icon from '@mui/icons-material/LooksOne';
import Number2Icon from '@mui/icons-material/LooksTwo';
import Number3Icon from '@mui/icons-material/Looks3';
import UnknownIcon from '@mui/icons-material/HelpOutline';

import OverloadIcon from '@mui/icons-material/Warning';
import SuperchargeIcon from '@mui/icons-material/FlashOn';
import DamageIcon from '@mui/icons-material/Whatshot';
import RepairIcon from '@mui/icons-material/Build';
import SwapHorizontalIcon from '@mui/icons-material/SwapHoriz';
import SwapVerticalIcon from '@mui/icons-material/SwapVert';
import OfflineIcon from '@mui/icons-material/PowerOff';
import HotSwapIcon from '@mui/icons-material/PowerSettingsNew';
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

    case SystemStatusEffectType.Overload:
        Icon = OverloadIcon;
        break;
    case SystemStatusEffectType.Damage:
        Icon = DamageIcon;
        break;
    case SystemStatusEffectType.Repair:
        Icon = RepairIcon;
        break;
    case SystemStatusEffectType.SwapHorizontal:
        Icon = SwapHorizontalIcon;
        break;
    case SystemStatusEffectType.SwapVertical:
        Icon = SwapVerticalIcon;
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

    return <Icon className={props.className} />;
};