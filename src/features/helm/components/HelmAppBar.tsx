import { useTranslation } from 'react-i18next';
import ManeuverIcon from '@mui/icons-material/Moving';
import { HealthDisplay, SystemAppBar, SystemPower } from 'src/features/layout';
import { CrewStation, PowerLevel } from 'src/types/ShipSystem';
import { CrewIcon } from 'src/components';
import { Box, Chip, styled } from 'src/lib/mui';

interface Props {
    power: PowerLevel;
    evasion: number;
    health: number;
}

const EvasionChip = styled(Chip)({  
    '& .MuiChip-label': {
        minWidth: '3.25em',
        textAlign: 'right',
    }
});

export const HelmAppBar: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    return (
        <SystemAppBar>
            <CrewIcon
                station={CrewStation.Helm}
                fontSize="large"
                titleAccess={t('title')}
                role="img"
                color="disabled"
            />
            <Box display="flex" justifyContent="center" flexGrow={1}>
                <EvasionChip
                    variant="filled"
                    icon={<ManeuverIcon color="primary" />}
                    label={Math.round(props.evasion/* * 100 */) + '%'}
                    title="Evasion chance"
                />
            </Box>
            <SystemPower powerLevel={props.power} />
            <HealthDisplay health={props.health} />
        </SystemAppBar>
    );
}