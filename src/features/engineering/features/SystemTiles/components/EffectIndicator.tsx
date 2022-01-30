import { ClientSystemStatusEffectInstance } from '../../../types/SystemStatusEffect';
import { EffectIcon } from './EffectIcon';
import { CircularTimer } from 'src/components/CircularTimer';
import { useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';

interface Props extends ClientSystemStatusEffectInstance {
    className?: string;
}

export const indicatorSize = 32;

export const EffectIndicator: React.FC<Props> = props => {
    const theme = useTheme();
    
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <Zoom
            in={true}
            timeout={transitionDuration}
            unmountOnExit
        >
            <CircularTimer
                size={indicatorSize}
                startTime={props.startTime}
                endTime={props.endTime}
                color="primary"
            >
                <EffectIcon effect={props.type} color={props.positive ? 'success' : 'error'} />
            </CircularTimer>
        </Zoom>
    );
};