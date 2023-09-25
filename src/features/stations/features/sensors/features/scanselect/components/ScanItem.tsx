import { PropsWithChildren } from 'react';
import { Card, CardActionArea, CardContent, styled, Typography } from 'src/lib/mui';

export type ItemStatus = 'active' | 'inactive' | 'available' | 'unavailable';

interface Props {
    title: string;
    status: ItemStatus;
    clicked?: () => void;
}

const Root = styled(Card)({
    width: '15em',
    height: '3em',
});

const Clickable = styled(CardActionArea)({
    fontSize: 'inherit',
    margin: '-1px',
    padding: 0,
})

const Title = styled(Typography)({
    position: 'relative',
    transition: 'all 0.5s ease-in-out'
})

export const ScanItem: React.FC<PropsWithChildren<Props>> = props => {
    const title = (
        <Title
            variant="h5"
            component="div"
            left={props.status === 'active' ? '-1em' : 0}
            top={props.status === 'active' ? '-1.3em' : undefined}
            color={props.status === 'unavailable' ? 'text.secondary' : undefined}
            fontSize={props.status === 'active' ? '0.75em !important' : undefined}
        >
            {props.title}
        </Title>
    );

    if (props.status === 'available' || props.status === 'inactive') {
        return (
            <Root variant="outlined" sx={props.status === 'available' ? { borderColor: 'primary.dark' } : undefined}>
                <Clickable onClick={props.clicked}>
                    <CardContent key="c">
                        {title}
                        {props.children}
                    </CardContent>
                </Clickable>
            </Root>
        );
    }
    else {
        return (
            <Root>
                <CardContent key="c">
                    {title}
                    {props.children}
                </CardContent>
            </Root>
        );
    }
}