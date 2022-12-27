import AuxPowerIcon from '@mui/icons-material/Power';
import StoreChargeIcon from '@mui/icons-material/BatterySaver';
import RelocatingIcon from '@mui/icons-material/OpenWith';
import RelocatedIcon from '@mui/icons-material/SwapHoriz';

import UnknownIcon from '@mui/icons-material/HelpOutline';
import Boost1Icon from '@mui/icons-material/KeyboardArrowUp';
import Boost2Icon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Reduce1Icon from '@mui/icons-material/KeyboardArrowDown';
import Reduce2Icon from '@mui/icons-material/KeyboardDoubleArrowDown';
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


    case SystemStatusEffectType.Boost2:
        Icon = Boost2Icon;
        break;
    case SystemStatusEffectType.Reduce1:
        Icon = Reduce1Icon;
        break;
    case SystemStatusEffectType.Reduce2:
        Icon = Reduce2Icon;
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