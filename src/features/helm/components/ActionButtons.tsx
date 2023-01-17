import { useState } from 'react';
import TravelIcon from '@mui/icons-material/LocationOn';
import ManeuverIcon from '@mui/icons-material/TrendingUp';
import { styled, useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { useTranslation } from 'react-i18next';
import { Fab, Snackbar } from 'src/components';

interface Props {
    maneuverMode: boolean;
    setManeuverMode: (showing: boolean) => void;
}

const ModeFab = styled(Fab)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
}));

const ChangedMode = styled(Snackbar)({
    maxWidth: '60vw',
    opacity: 0.75,
})

export const ActionButtons: React.FC<Props> = props => {
    const theme = useTheme();
    const { t } = useTranslation('helm');

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const [showSnack, setShowSnack] = useState(false);

    return (
        <>    
            <ChangedMode
                key={props.maneuverMode ? 'replace' : 'add'}
                open={showSnack}
                onClose={() => setShowSnack(false)}
                autoHideDuration={3000}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                message={props.maneuverMode ? t('set maneuver mode') : t('set travel mode')}
            />

            <Zoom
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
                    onClick={() => { props.setManeuverMode(false); setShowSnack(true); }}
                >
                    <TravelIcon />
                </ModeFab>
            </Zoom>

            <Zoom
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
                    onClick={() => { props.setManeuverMode(true); setShowSnack(true); }}
                >
                    <ManeuverIcon />
                </ModeFab>
            </Zoom>
        </>
    );
}
