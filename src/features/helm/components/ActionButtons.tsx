import TravelIcon from '@mui/icons-material/LocationOn';
import ManeuverIcon from '@mui/icons-material/TrendingUp';
import { useTranslation } from 'react-i18next';
import { Fab, styled, useTheme, ZoomTransition } from 'src/lib/mui';

interface Props {
    maneuverMode: boolean;
    setManeuverMode: (showing: boolean) => void;
}

const ModeFab = styled(Fab)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
}));

export const ActionButtons: React.FC<Props> = props => {
    const theme = useTheme();
    const { t } = useTranslation('helm');

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <>
            <ZoomTransition
                in={props.maneuverMode}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${props.maneuverMode ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <ModeFab
                    color="primary"
                    aria-label={t('travel')}
                    onClick={() => props.setManeuverMode(false)}
                >
                    <TravelIcon />
                </ModeFab>
            </ZoomTransition>

            <ZoomTransition
                in={!props.maneuverMode}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${!props.maneuverMode ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <ModeFab
                    color="secondary"
                    aria-label={t('maneuver')}
                    onClick={() => props.setManeuverMode(true)}
                >
                    <ManeuverIcon />
                </ModeFab>
            </ZoomTransition>
        </>
    );
}
