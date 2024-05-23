import HintIcon from '@mui/icons-material/Help';
import EnhanceClueIcon from '@mui/icons-material/Upgrade';
import RadiusClueIcon from '@mui/icons-material/Adjust';
import SolveSmallIcon from '@mui/icons-material/FullscreenExit';
import SolveLargeIcon from '@mui/icons-material/Fullscreen';
import TakebackIcon from '@mui/icons-material/PanTool';
import RevealCellIcon from '@mui/icons-material/LooksOne';
import DetectorIcon from '@mui/icons-material/SavedSearch';
import EnhanceCluesIcon from '@mui/icons-material/TrendingUp';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import { IconType } from 'src/lib/mui';
import { BoostType } from '../features/hexcells';

interface Props {
    className?: string;
    boost: BoostType;
}

const iconsByEffectType = new Map<BoostType, IconType>([
    [BoostType.Hint, HintIcon],
    [BoostType.RevealCell, RevealCellIcon],
    [BoostType.Takeback, TakebackIcon],
    [BoostType.Detector, DetectorIcon],
    [BoostType.SolveSmall, SolveSmallIcon],
    [BoostType.SolveLarge, SolveLargeIcon],
    [BoostType.EnhanceClue, EnhanceClueIcon],
    [BoostType.EnhanceClues, EnhanceCluesIcon],
    [BoostType.RadiusClue, RadiusClueIcon],
]);

export const ScanBoostIcon: React.FC<Props> = props => {
    const Icon = iconsByEffectType.get(props.boost) ?? UnknownIcon;
    
    return <Icon className={props.className} />;
};