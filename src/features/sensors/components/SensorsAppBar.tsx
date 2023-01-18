import { useTranslation } from 'react-i18next';
import { SystemAppBar } from 'src/features/layout';
import { CrewStation, PowerLevel } from 'src/types/ShipSystem';
import { HealthDisplay, PowerDisplay } from 'src/features/layout';
import { CrewIcon } from 'src/components';
import { Box } from 'src/lib/mui';

interface Props {
    power: PowerLevel;
    health: number;
}

export const SensorsAppBar: React.FC<Props> = (props) => {
    const { t } = useTranslation('sensors');

    return (
        <SystemAppBar>
            <CrewIcon
                station={CrewStation.Sensors}
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