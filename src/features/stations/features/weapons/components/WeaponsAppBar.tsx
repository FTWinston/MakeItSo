import { useTranslation } from 'react-i18next';
import { HealthDisplay, SystemAppBar, SystemPower } from '../../appbar';
import { CrewStation, PowerLevel } from 'src/types/ShipSystem';

interface Props {
    power: PowerLevel;
    health: number;
    renderMenuItems?: () => JSX.Element;
}

export const WeaponsAppBar: React.FC<Props> = (props) => {
    const { t } = useTranslation('weapons');

    return (
        <SystemAppBar
            renderMenuItems={props.renderMenuItems}
            station={CrewStation.Weapons}
            justifyContent="flex-end"
        >
            <SystemPower powerLevel={props.power} />
            <HealthDisplay health={props.health} />
        </SystemAppBar>
    );
}