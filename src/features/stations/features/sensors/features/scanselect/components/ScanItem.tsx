import { PropsWithChildren } from 'react';
import { Avatar, Box, Card, CardActionArea, CardContent, styled, SxProps, Theme, Typography } from 'src/lib/mui';

export type ItemStatus = 'active' | 'inactive' | 'available' | 'unavailable';

interface Props {
    title: string;
    status: ItemStatus;
    icon?: JSX.Element;
    clicked?: () => void;
    sx?: SxProps<Theme>;
}

export const itemWidth = '15em';

const Root = styled(Card)({
    width: itemWidth,
    height: '3em',
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
})

const ChildWrapper = styled(Box)({
    position: 'absolute',
    top: '0.75em',
    left: '0.4em',
    right: 0,
    bottom: 0,
    transition: 'all 0.5s ease-in-out',
})

export const ScanItem: React.FC<PropsWithChildren<Props>> = props => {
    const active = props.status === 'active';
    const inactive = props.status === 'inactive';
    const available = props.status === 'available';
    const unavailable = props.status === 'unavailable';

    return (
        <Root
            variant={available || inactive ? 'outlined' : undefined}
            sx={{
                ...props.sx,
                borderColor: available ? 'primary.dark' : undefined,
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
                        sx={{ bgcolor: available ? 'primary.main' : unavailable ? 'text.disabled' : 'secondary.main', opacity: active ? 0 : 1 }}
                        aria-hidden={active}
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