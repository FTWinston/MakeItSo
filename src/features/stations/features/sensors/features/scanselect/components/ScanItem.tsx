import { PropsWithChildren } from 'react';
import { Avatar, Box, Card, CardActionArea, CardContent, styled, SxProps, Theme, Typography } from 'src/lib/mui';
import { ScanType } from '../types/ScanTreeState';

export type ItemStatus = 'active' | 'inactive' | 'available' | 'unavailable';

interface Props {
    title: string;
    status: ItemStatus;
    itemType: ScanType;
    icon?: JSX.Element;
    clicked?: () => void;
    sx?: SxProps<Theme>;
}

export const itemWidth = '15em';
export const itemHeight = '3em';

const Root = styled(Card)({
    width: itemWidth,
    height: itemHeight,
    border: 'solid transparent 1px',
});

const Clickable = styled(CardActionArea)({
    fontSize: 'inherit',
    margin: '-1px',
    padding: 0,
})

const Title = styled(Typography)({
    position: 'relative',
    transition: 'all 0.5s ease-in-out',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    lineHeight: 1,
})

const Content = styled(CardContent)({
    display: 'flex',
    padding: '0.525em',
    position: 'relative',
})

const IconAvatar = styled(Avatar)({
    transition: 'all 0.5s ease-in-out',
    '& > *': {
        transition: 'color 0.5s ease-in-out',
    },
})

const ChildWrapper = styled(Box)({
    position: 'absolute',
    top: '0.75em',
    left: '0.4em',
    right: '2.75em',
    bottom: 0,
    transition: 'all 0.5s ease-in-out',
})

const activeInfoIconSx = {
    bgcolor: 'background.paper',
    '& > *': {
        color: 'primary.main'
    }
}

const activeActionIconSx = {
    bgcolor: 'primary.main'
}

const selectableIconSx = {
    bgcolor: 'secondary.main',
}

const unavailableIconSx = {
    bgcolor: 'text.disabled'
}

export const ScanItem: React.FC<PropsWithChildren<Props>> = props => {
    const active = props.status === 'active';
    const inactive = props.status === 'inactive';
    const available = props.status === 'available';
    const unavailable = props.status === 'unavailable';

    const iconSx = active
        ? (props.itemType === 'info' ? activeInfoIconSx : activeActionIconSx)
        : unavailable
            ? unavailableIconSx
            : selectableIconSx;

    return (
        <Root
            variant={unavailable ? undefined : 'outlined'}
            sx={{
                ...props.sx,
                borderColor: active
                    ? 'primary.dark'
                    : available 
                        ? 'secondary.main'
                        : undefined,
                cursor: unavailable ? 'not-allowed' : undefined,
            }}
        >
            <Clickable
                disabled={active || unavailable}
                onClick={props.clicked}
            >
                <Content>
                    <Title
                        variant="h5"
                        component="div"
                        left={active ? '-0.6em' : 0}
                        top={active ? '-1.6em' : 0}
                        color={unavailable ? 'text.disabled' : inactive ? 'text.secondary' : active ? 'primary.main' : undefined}
                        fontSize={active ? '0.75em !important' : '1em'}
                    >
                        {props.title}
                    </Title>
                    
                    <IconAvatar
                        variant="rounded"
                        sx={iconSx}
                    >
                        {props.icon}    
                    </IconAvatar>

                    <ChildWrapper
                        aria-hidden={!active}
                        sx={{ opacity: active ? 1 : 0, pointerEvents: active ? undefined : 'none' }}>
                        {props.children}
                    </ChildWrapper>
                </Content>
            </Clickable>
        </Root>
    );
}