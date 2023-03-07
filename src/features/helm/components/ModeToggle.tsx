import { useTranslation } from 'react-i18next';
import TravelIcon from '@mui/icons-material/Navigation';
import ManeuverIcon from '@mui/icons-material/Moving';

import { Fab, styled, useTheme, ZoomTransition } from 'src/lib/mui';

export type Mode = 'maneuver' | 'travel';

interface Props {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

const TravelButton = styled(Fab)({
    position: 'absolute',
    right: '1em',
    bottom: '9.3em',
})

const ManeuverButton = styled(Fab)({
    position: 'absolute',
    right: '1em',
    bottom: '1em',
})

export const ModeToggle: React.FC<Props> = props => {
    const { t } = useTranslation('helm');
    
    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    
    const showTravel = props.mode === 'maneuver';
    
    const showManeuver = props.mode === 'travel';

    return (
        <>
            <ZoomTransition
                in={showTravel}
                style={{
                    transitionDelay: `${showTravel ? transitionDuration.exit : 0}ms`,
                }}
            >
                <TravelButton
                    color="secondary"
                    aria-label={t('travel')}
                    onClick={() => props.setMode('travel')}
                >
                    <TravelIcon />
                </TravelButton>
            </ZoomTransition>
            <ZoomTransition
                in={showManeuver}
                style={{
                    transitionDelay: `${showManeuver ? transitionDuration.exit : 0}ms`,
                }}
            >
                <ManeuverButton
                    color="primary"
                    aria-label={t('maneuver')}
                    onClick={() => props.setMode('maneuver')}
                >
                    <ManeuverIcon />
                </ManeuverButton>
            </ZoomTransition>
        </>
    );
}
