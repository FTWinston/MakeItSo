import { styled } from '@mui/material/styles';
import { AppBarHeight, Page } from 'src/features/layout';
import { ShipDestroyingSystem } from 'src/types/ShipSystem';
import { HelmAppBar } from './HelmAppBar';
import { useTranslation } from 'react-i18next';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr`,
});

export const Helm: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');
    
    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <HelmAppBar />

        </Root>
    );
};
