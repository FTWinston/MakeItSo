import { useTranslation } from 'react-i18next';
import { Button, Card, styled, Typography } from 'src/lib/mui';
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

export const maneuverCardHeight = '5.7em';

const CardRoot = styled(Card)(({ theme }) => ({
    width: '18.4em',
    height: maneuverCardHeight,
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

const DiscardButton = styled(Button)({
    width: '2em',
    minWidth: 'unset',
    height: '3.5em',
    padding: 0,
});

const DiscardText = styled('div')({
    fontSize: '0.7em',
    writingMode: 'vertical-rl',
})

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
                    enabled={props.currentPower >= maneuver.minPower}
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
                color="warning"
                onClick={props.discard}
            >
                <DiscardText>{t('discard card')}</DiscardText>
            </DiscardButton>
        </CardRoot>
    );
}