import AuxPowerIcon from '@mui/icons-material/Power';
import StoreChargeIcon from '@mui/icons-material/BatterySaver';
import RelocatingIcon from '@mui/icons-material/OpenWith';
import RelocatedIcon from '@mui/icons-material/SwapHoriz';
import DivertFromIcon from '@mui/icons-material/Redo';
import DivertToIcon from '@mui/icons-material/ElectricBolt';
import DrawPowerIcon from '@mui/icons-material/Compress';
import DrawnPowerIcon from '@mui/icons-material/Bolt';
import OverchargeIcon from '@mui/icons-material/Whatshot';
import ReactorOverloadIcon from '@mui/icons-material/Brightness7';
import ReactorSurplusIcon from '@mui/icons-material/Bolt';
import ResetIcon from '@mui/icons-material/SettingsBackupRestore';
import RebuildIcon from '@mui/icons-material/Build';
import ReplaceIcon from '@mui/icons-material/SettingsSuggest';
import ReactorDamageIcon from '@mui/icons-material/PowerOff';
import ShieldFocusIcon from '@mui/icons-material/Policy';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

interface Props {
    className?: string;
    effect: SystemStatusEffectType;
}

type IconType = OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;

const iconsByEffectType = new Map<SystemStatusEffectType, IconType>([
    [SystemStatusEffectType.AuxPower, AuxPowerIcon],
    [SystemStatusEffectType.StoreCharge, StoreChargeIcon],
    [SystemStatusEffectType.StoredCharge, StoreChargeIcon],
    [SystemStatusEffectType.DivertFrom, DivertFromIcon],
    [SystemStatusEffectType.DivertTo, DivertToIcon],
    [SystemStatusEffectType.Relocating, RelocatingIcon],
    [SystemStatusEffectType.Relocated, RelocatedIcon],
    [SystemStatusEffectType.Overcharge, OverchargeIcon],
    [SystemStatusEffectType.ReactorOverload, ReactorOverloadIcon],
    [SystemStatusEffectType.ReactorSurplus, ReactorSurplusIcon],
    [SystemStatusEffectType.Reset, ResetIcon],
    [SystemStatusEffectType.Rebuild, RebuildIcon],
    [SystemStatusEffectType.Replace, ReplaceIcon],
    [SystemStatusEffectType.DrawPower1, DrawPowerIcon],
    [SystemStatusEffectType.DrawPower2, DrawPowerIcon],
    [SystemStatusEffectType.DrawPower3, DrawPowerIcon],
    [SystemStatusEffectType.DrawnPower, DrawnPowerIcon],
    [SystemStatusEffectType.ReactorDamage, ReactorDamageIcon],
    [SystemStatusEffectType.ShieldFocus, ShieldFocusIcon],
]);

export const EffectIcon: React.FC<Props> = props => {
    const Icon = iconsByEffectType.get(props.effect) ?? UnknownIcon;
    
    return <Icon className={props.className} />;
};