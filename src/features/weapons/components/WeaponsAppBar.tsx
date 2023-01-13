import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { SystemAppBar } from 'src/features/layout';
import { CrewStation, PowerLevel } from 'src/types/ShipSystem';
import { HealthDisplay, PowerDisplay } from 'src/features/layout';
import { CrewIcon } from 'src/components';

interface Props {
    power: PowerLevel;
    health: number;
}

export const WeaponsAppBar: React.FC<Props> = (props) => {
    const { t } = useTranslation('weapons');

    return (
        <SystemAppBar>
            <CrewIcon
                station={CrewStation.Weapons}
                fontSize="large"
                titleAccess={t('title')}
                role="img"
                color="disabled"
            />
            <Box sx={{flexGrow: 1 }} />
            <PowerDisplay powerLevel={props.power} />
            <HealthDisplay health={props.health} />
        </SystemAppBar>
    );
}