import { styled } from 'src/lib/mui';
import { AppBarHeight, Page } from 'src/features/layout';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { SensorsAppBar } from './SensorsAppBar';
import { useTranslation } from 'react-i18next';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    power: PowerLevel;
    health: number;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr`,
});

export const Sensors: React.FC<Props> = (props) => {
    const { t } = useTranslation('sensors');
    
    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <SensorsAppBar power={props.power} health={props.health} />

        </Root>
    );
};
