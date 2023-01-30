import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, styled, Typography } from 'src/lib/mui';
import { PowerLevel } from 'src/types/ShipSystem';
import { getManeuver } from '../data/Maneuvers';
import { ManeuverChoice, ManeuverType } from '../types/ManeuverType';
import { ManeuverDisplay } from './ManeuverDisplay';

interface Props {
    maneuvers: ManeuverChoice;
    currentPower: PowerLevel;
    previewManeuver: (type: ManeuverType | null) => void;
    selectManeuver: (type: ManeuverType) => void;
}

export const maneuverCardHeight = '5.7em';

const CardRoot = styled(Card)(({ theme }) => ({
    width: '16em',
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

export const ManeuverCard: React.FC<Props> = props => {
    const { t } = useTranslation('helm');
    
    const maneuvers = props.maneuvers
        .map((type, index) => {
            const maneuver = getManeuver(type);
            return (
                <ManeuverDisplay
                    key={index}
                    type={maneuver.type}
                    motion={maneuver.motion}
                    minPower={maneuver.minPower}
                    enabled={props.currentPower >= maneuver.minPower}
                    onClick={() => { if (props.currentPower >= maneuver.minPower) { props.selectManeuver(maneuver.type) }}}
                    onFocusStart={() => props.previewManeuver(maneuver.type)}
                    onFocusEnd={() => props.previewManeuver(null)}
                />
            );
        });

    return (
        <CardRoot variant="outlined">
            <Prompt textTransform="uppercase">{t('choose maneuver')}</Prompt>
            {maneuvers}
        </CardRoot>
    );
}