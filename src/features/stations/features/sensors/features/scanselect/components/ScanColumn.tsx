import { Box, SxProps, Theme, styled } from 'src/lib/mui';
import { ScanItemId, ShipScanItem } from '../types/ScanTreeState';
import { ScanItem, itemWidth } from './ScanItem';

interface Props {
    items: ShipScanItem[];
    selectedItemId?: ScanItemId;
    availableItemIds: ScanItemId[];
    selectItem: (id: ScanItemId) => void;
    sx?: SxProps<Theme>;
}

const Root = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridAutoRows: '1fr',
    gap: '0.15em',
    width: itemWidth,
});

export const ScanColumn: React.FC<Props> = props => {
    return (
        <Root sx={props.sx}>
            {props.items.map(item => (
                <ScanItem
                    key={item.id}
                    sx={{gridRow: item.row}}
                    title="Some scan item"
                    status={props.selectedItemId === item.id ? 'active' : (props.availableItemIds.includes(item.id) ? (props.selectedItemId ? 'inactive' : 'available') : 'unavailable')}
                    clicked={() => props.selectItem(item.id)}
                >
                    Active item content
                </ScanItem>
            ))}
        </Root>
    );
}