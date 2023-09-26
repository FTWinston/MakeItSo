import { Box, styled } from 'src/lib/mui';
import { ScanItemId, ShipScanItem } from '../types/ScanTreeState';
import { ScanItem } from './ScanItem';

interface Props {
    items: ShipScanItem[];
    selectedItem?: ScanItemId;
    availableItems: Set<ScanItemId>;
    selectItem: (id: ScanItemId) => void;
}

const Root = styled(Box)({
    padding: '0.5em 0',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridAutoRows: '1fr',
    gap: '0.15em',
});

export const ScanColumn: React.FC<Props> = props => {
    return (
        <Root>
            {props.items.map(item => (
                <ScanItem
                    key={item.id}
                    sx={{gridRow: item.row}}
                    title="Some scan item"
                    status={props.selectedItem === item.id ? 'active' : (props.availableItems.has(item.id) ? (props.selectedItem ? 'inactive' : 'available') : 'unavailable')}
                    clicked={() => props.selectItem(item.id)}
                >
                    Active item content
                </ScanItem>
            ))}
        </Root>
    );
}