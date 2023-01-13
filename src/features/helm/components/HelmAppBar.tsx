import HelmIcon from '@mui/icons-material/NearMe';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { SystemAppBar } from 'src/features/layout';
import { PowerLevel } from 'src/types/ShipSystem';
import { PowerDisplay } from 'src/features/layout/components/PowerDisplay';
import { HealthDisplay } from 'src/features/layout/components/HealthDisplay';

interface Props {
    power: PowerLevel;
    health: number;
}

export const HelmAppBar: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    return (
        <SystemAppBar>
            <HelmIcon
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