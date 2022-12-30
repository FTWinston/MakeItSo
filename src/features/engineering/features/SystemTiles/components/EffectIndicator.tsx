import { SystemStatusEffectInfo } from '../../../types/SystemStatusEffect';
import { EffectIcon } from './EffectIcon';
import { Badge, CircularTimer } from 'src/components';
import { styled, SxProps, useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { useTranslation } from 'react-i18next';

interface Props extends SystemStatusEffectInfo {
    className?: string;
}

const iconSize = '1em';
export const indicatorSize = '1.3em';
const timerSize = '1.5em';

const ScaledIcon = styled(EffectIcon)({
    position: 'absolute',
    width: iconSize,
    height: iconSize,
    top: '0.15em',
    left: '0.15em',
    fontSize: 'unset', // Icons default this to 1.5rem
    filter: 'drop-shadow(0px 0px 0.1em rgb(255 255 255 / 0.6))',
});

const Timer = styled(CircularTimer
    , { shouldForwardProp: (prop) => prop !== 'positive' }
)<{ positive: boolean }>(({ theme, positive }) => ({
    position: 'absolute',
    color: theme.palette.text.primary,
    top: '-0.1em',
    left: '-0.1em',
}));

const LinkBadge = styled(Badge)({
    verticalAlign: 'baseline',
});


// TODO: a range of bad-to-good colors, from error, warning, primary, success?
const Background = styled('div'
    , { shouldForwardProp: (prop) => prop !== 'positive' }
)<{ positive: boolean }>(({ theme, positive }) => ({
    position: 'relative',
    backgroundColor: positive ? theme.palette.primary.dark : theme.palette.error.dark,
    color: positive ? theme.palette.primary.contrastText : theme.palette.error.contrastText,
    width: indicatorSize,
    height: indicatorSize,
    borderRadius: indicatorSize,
}));

export const EffectIndicator: React.FC<Props> = props => {
    const { t } = useTranslation('engineering');
    const theme = useTheme();
    
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    let content = (
        <Background positive={props.positive} role="group" aria-label={t(`effect ${props.type}`)}>
            <ScaledIcon effect={props.type} />
            <Timer
                aria-label={t('effect duration')}
                positive={props.positive}
                startTime={props.startTime}
                endTime={props.endTime}
                size={timerSize}
                color="inherit"
            />
        </Background>
    )

    if (props.link) {
        content = (
            <LinkBadge
                variant="dot"
                color="warning"
                overlap="circular"
                anchorOrigin={{vertical: props.link === 'primary' ? 'top' : 'bottom', horizontal: 'right'}}
            >
                {content}   
            </LinkBadge>
        );
    }

    return (
        <Zoom
            in={true}
            timeout={transitionDuration}
            unmountOnExit
        >
            {content}
        </Zoom>
    );
};