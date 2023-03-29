import { useTranslation } from 'react-i18next';
import StopIcon from '@mui/icons-material/Clear';
import CenterIcon from '@mui/icons-material/MyLocation';
import { Fab, styled, useTheme, ZoomTransition } from 'src/lib/mui';

interface Props {
    stop: () => void;
    focus: () => void;
    shipVisible: boolean;
    shipMoving: boolean;
}

const EitherButton = styled(Fab)({
    position: 'absolute',
    right: '1em',
    bottom: '5.5em',
})

export const StopAndFocus: React.FC<Props> = props => {
    const { t } = useTranslation('helm');
    
    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    
    const showFocus = !props.shipVisible;
    
    const showStop = !showFocus && props.shipMoving;

    return (
        <>
            <ZoomTransition
                in={showFocus}
                style={{
                    transitionDelay: `${showFocus ? transitionDuration.exit : 0}ms`,
                }}
            >
                <EitherButton
                    color="secondary"
                    aria-label={t('focus ship')}
                    onClick={props.focus}
                >
                    <CenterIcon />
                </EitherButton>
            </ZoomTransition>
            <ZoomTransition
                in={showStop}
                style={{
                    transitionDelay: `${showStop ? transitionDuration.exit : 0}ms`,
                }}
            >
                <EitherButton
                    color="error"
                    aria-label={t('all stop')}
                    onClick={props.stop}
                >
                    <StopIcon />
                </EitherButton>
            </ZoomTransition>
        </>
    );
}
