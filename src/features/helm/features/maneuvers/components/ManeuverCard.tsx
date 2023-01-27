import { Card, styled } from 'src/lib/mui';
import { PowerLevel } from 'src/types/ShipSystem';
import { getManeuver } from '../data/Maneuvers';
import { ManeuverChoice, ManeuverType } from '../types/ManeuverType';
import { ManeuverDisplay } from './ManeuverDisplay';

interface Props {
    maneuvers: ManeuverChoice;
    currentPower: PowerLevel;
    selectManeuver: (type: ManeuverType) => void;
}

const CardRoot = styled(Card)(({ theme }) => ({
    width: '15em',
    height: '4em',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: '0.1em',
    backgroundColor: 'background.paper',
    borderColor: theme.palette.divider,
    '&:hover': {
        borderColor: theme.palette.grey,
    },
}));

export const ManeuverCard: React.FC<Props> = props => {
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
                    onClick={() => props.selectManeuver(maneuver.type)}
                />
            );
        });

    return (
        <CardRoot>
            {maneuvers}
        </CardRoot>
    );
}