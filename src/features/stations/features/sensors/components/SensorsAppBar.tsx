import { useTranslation } from 'react-i18next';
import { SystemAppBar } from '../../appbar';
import { CrewStation, PowerLevel } from 'src/types/ShipSystem';

interface Props {
    power: PowerLevel;
    health: number;
    renderMenuItems?: () => JSX.Element;
}

export const SensorsAppBar: React.FC<Props> = (props) => {
    const { t } = useTranslation('sensors');

    return (
        <SystemAppBar
            renderMenuItems={props.renderMenuItems}
            station={CrewStation.Sensors}
            power={props.power}
            health={props.health}
        >
            
        </SystemAppBar>
    );
}