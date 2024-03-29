import { useTranslation } from 'react-i18next';
import DiscardIcon from '@mui/icons-material/Refresh';
import { Card, IconButton, styled, Typography } from 'src/lib/mui';
import { Keyframe } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { PowerLevel } from 'src/types/ShipSystem';
import { getManeuver } from '../data/Maneuvers';
import { ManeuverChoice, ManeuverType } from '../types/ManeuverType';
import { ManeuverDisplay } from './ManeuverDisplay';

interface Props {
    maneuvers: ManeuverChoice;
    currentPower: PowerLevel;
    startAngle: number;
    previewManeuver: (type: ManeuverType | null) => void;
    selectManeuver: (type: ManeuverType) => void;
    discard: () => void;
}

const CardRoot = styled(Card)(({ theme }) => ({
    fontSize: 'min(1em, 4.6vw)',
    flexGrow: 1,
    height: '7em',
    padding: '0.4em',
    gap: '0.4em',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    borderWidth: '0.1em',
    backgroundColor: '#282828',
    borderColor: theme.palette.text.disabled,
    '&:hover': {
        borderColor: theme.palette.grey,
    },
}));

const Prompt = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: '0.15em',
    left: '0.4em',
    fontSize: '0.9em',
    fontWeight: 'bold',
}));

const DiscardButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: '0.125em',
    right: '0.125em',
    padding: 0,
}));

export const ManeuverCard: React.FC<Props> = props => {
    const { t } = useTranslation('helm');
    
    const maneuvers = props.maneuvers.options
        .map((type, index) => {
            const offset: Keyframe<Position> = { val: { x: 0, y: 0, angle: props.startAngle }, time: 0 };
            const maneuver = getManeuver(type, offset);
            
            return (
                <ManeuverDisplay
                    key={index}
                    type={maneuver.type}
                    motion={maneuver.motion}
                    minPower={maneuver.minPower}
                    ghostFrames={maneuver.ghostFrames}
                    currentPower={props.currentPower}
                    onClick={() => { if (props.currentPower >= maneuver.minPower) { props.selectManeuver(maneuver.type); props.previewManeuver(null); }}}
                    onFocusStart={() => props.previewManeuver(maneuver.type)}
                    onFocusEnd={() => props.previewManeuver(null)}
                />
            );
        });

    return (
        <CardRoot variant="outlined">
            <Prompt textTransform="uppercase">{t('choose maneuver')}</Prompt>
            {maneuvers}
            
            <DiscardButton
                onClick={props.discard}
                aria-label={t('discard card')}
            >
                <DiscardIcon />
            </DiscardButton>
        </CardRoot>
    );
}