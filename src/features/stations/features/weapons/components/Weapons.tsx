import { styled } from 'src/lib/mui';
import { AppBarHeight } from '../../appbar';
import { Page } from '../../../components/Page';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { WeaponsAppBar } from './WeaponsAppBar';
import { useTranslation } from 'react-i18next';

interface Props {
    renderMenuItems?: () => JSX.Element;
    shipDestroyed?: ShipDestroyingSystem;
    power: PowerLevel;
    health: number;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr`,
});

export const Weapons: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');
    
    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <WeaponsAppBar
                power={props.power}
                health={props.health}
                renderMenuItems={props.renderMenuItems}
            />

        </Root>
    );
};
