import { SystemStatusEffectInfo } from '../../../types/SystemStatusEffect';
import { EffectIcon } from './EffectIcon';
import { Avatar, Badge, CircularTimer } from 'src/components';
import { styled, useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { useTranslation } from 'react-i18next';

type Props = SystemStatusEffectInfo & {
    className?: string;
}

const iconSize = '1em';
export const indicatorSize = '1.3em';
const timerSize = '1.5em';

const MainScaledIcon = styled(EffectIcon)({
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

const linkInsetSize = '0.85rem';

const LinkBadge = styled(Badge)({
    verticalAlign: 'baseline',
    '& > .MuiBadge-standard': {
        minWidth: linkInsetSize,
        width: linkInsetSize,
        height: linkInsetSize,
        bottom: '10%',
        right: '10%',
    }
});

const LinkScaledIcon = styled(EffectIcon)({
    fontSize: '0.75em'
});

const LinkAvatar = styled(Avatar)(({ theme }) => ({
    width: linkInsetSize,
    height: linkInsetSize,
    backgroundColor: theme.palette.warning.main,
}));

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
            <MainScaledIcon effect={props.type} />
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

    if ('link' in props) {
        if (props.link === 'primary') {
            content = (
                <LinkBadge
                    variant="dot"
                    color="warning"
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                >
                    {content}   
                </LinkBadge>
            );
        }
        else if (props.link === 'secondary') {
            content = (
                <LinkBadge
                    color="warning"
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    badgeContent={
                        <LinkAvatar>
                            <LinkScaledIcon effect={props.primaryEffect.effectType} />
                        </LinkAvatar>
                    }
                >
                    {content}   
                </LinkBadge>
            );
        }
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