import { ClientSystemStatusEffectInstance } from '../../../types/SystemStatusEffect';
import { EffectIcon } from './EffectIcon';
import { CircularTimer } from 'src/components/CircularTimer';
import { styled, useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';

interface Props extends ClientSystemStatusEffectInstance {
    className?: string;
}

export const indicatorSize = '1.5em';
const timerSize = '1.7em';

const ScaledIcon = styled(EffectIcon)({
    position: 'absolute',
    width: indicatorSize,
    height: indicatorSize,
    fontSize: 'unset', // Icons default this to 1.5rem
    filter: 'drop-shadow(0px 0px 0.1em rgb(255 255 255 / 0.6))',
});

const Timer = styled(CircularTimer
    , { shouldForwardProp: (prop) => prop !== 'positive' }
)<{ positive: boolean }>(({ theme, positive }) => ({
    position: 'absolute',
    color: positive ? theme.palette.primary.light : theme.palette.error.light,
    top: '-0.1em',
    left: '-0.1em',
}));

// TODO: a range of bad-to-good colors, from error, warning, primary, success?
const Background = styled('div'
    , { shouldForwardProp: (prop) => prop !== 'positive' }
)<{ positive: boolean }>(({ theme, positive }) => ({
    backgroundColor: positive ? theme.palette.primary.dark : theme.palette.error.dark,
    color: positive ? theme.palette.primary.contrastText : theme.palette.error.contrastText,
    width: indicatorSize,
    height: indicatorSize,
    borderRadius: indicatorSize,
    overflow: 'clip',
}));

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
            <Background positive={props.positive}>
                <ScaledIcon effect={props.type} />
                <Timer
                    positive={props.positive}
                    startTime={props.startTime}
                    endTime={props.endTime}
                    size={timerSize}
                    color="inherit"
                />
            </Background>
        </Zoom>
    );
};