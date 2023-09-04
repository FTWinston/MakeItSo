import { useTranslation } from 'react-i18next';
import ManeuverIcon from '@mui/icons-material/Moving';
import { SystemAppBar } from '../../appbar';
import { CrewStation, PowerLevel } from 'src/types/ShipSystem';
import { Chip, Tooltip, styled } from 'src/lib/mui';

interface Props {
    power: PowerLevel;
    evasion: number;
    health: number;
    renderMenuItems?: () => JSX.Element;
}

const EvasionChip = styled(Chip)({  
    '& .MuiChip-label': {
        minWidth: '3em',
        textAlign: 'right',
        '&:after': {
            content: '"%"',
            fontSize: '0.75em',
        }
    }
});

export const HelmAppBar: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    return (
        <SystemAppBar
            renderMenuItems={props.renderMenuItems}
            station={CrewStation.Helm}
            justifyContent="center"
            power={props.power}
            health={props.health}
        >
            <Tooltip title={t('evasion')}>
                <EvasionChip
                    variant="filled"
                    icon={<ManeuverIcon color="primary" />}
                    label={Math.round(props.evasion/* * 100 */)}
                />
            </Tooltip>
        </SystemAppBar>
    );
}