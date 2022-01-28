import Zoom from '@mui/material/Zoom';
import { ClientSystemStatusEffectInstance } from '../../../types/SystemStatusEffect';
import { EffectIcon } from './EffectIcon';
import { CircularProgressionWrapper } from './CircularProgressionWrapper';
import { useTheme } from '@mui/material/styles';

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
            <CircularProgressionWrapper
                size={indicatorSize}
                startTime={props.startTime}
                endTime={props.endTime}
                color="primary"
            >
                <EffectIcon effect={props.type} color={props.positive ? 'success' : 'error'} />
            </CircularProgressionWrapper>
        </Zoom>
    );
};