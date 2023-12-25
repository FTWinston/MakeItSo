import { PropsWithChildren } from 'react';
import { Button, styled, SxProps, Theme, Typography } from 'src/lib/mui';
import { ScanType } from '../types/ScanTreeState';
import { ScanItemId } from '../types/ScanItemId';
import { ScanItemIcon } from './ScanItemIcon';
import { useTranslation } from 'react-i18next';

export type ItemStatus = 'active' | 'inactive' | 'available' | 'unavailable';

interface Props {
    status: ItemStatus;
    itemId: ScanItemId;
    itemType: ScanType;
    clicked?: () => void;
    sx?: SxProps<Theme>;
}

export const itemWidth = '3em';
export const itemHeight = '3em';

const Root = styled(Button)({
    minWidth: itemWidth,
    height: itemHeight,
    position: 'relative',
    overflow: 'visible',
    display: 'flex',
    justifyContent: 'center',
    border: 'solid transparent 1px',

    transition: 'all 0.5s ease-in-out',
    '& > *': {
        transition: 'color 0.5s ease-in-out',
    },
});

const Title = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    fontSize: '0.65em',
    top: `calc(${itemHeight} + 1.75em)`,
    lineHeight: '1em',
    textAlign: 'center',
    minWidth: `calc(${itemWidth} * 1.75)`,
    color: theme.palette.text.primary,
}))

const inactiveRootSx = {
    borderColor: 'secondary.main',
}

const unavailableRootSx = {
    borderColor: 'text.disabled',
    '& > svg': {
        color: 'text.disabled',
    }
}

export const ScanItem: React.FC<PropsWithChildren<Props>> = props => {
    const active = props.status === 'active';
    const inactive = props.status === 'inactive';
    const available = props.status === 'available';
    const unavailable = props.status === 'unavailable';

    const rootSx = unavailable
        ? unavailableRootSx
            : inactive
                ? inactiveRootSx
                : undefined;

    const { t } = useTranslation('sensors');
    const title = t(`scan ${props.itemId}`);

    return (
        <Root
            variant={active || available ? 'contained' : 'outlined'}
            color={active ? 'primary' : (available || inactive ? 'secondary' : undefined)}
            sx={{
                ...props.sx,
                ...rootSx,
                cursor: unavailable ? 'not-allowed' : undefined,
            }}
            onClick={props.clicked}
        >
            <ScanItemIcon
                id={props.itemId}
                fontSize="large"
            />

            <Title>
                {title}
            </Title>
        </Root>
    );
}