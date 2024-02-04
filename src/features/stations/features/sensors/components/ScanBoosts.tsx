import { Box, Button, ButtonGroup, Paper, Typography, styled } from 'src/lib/mui';

interface Props {
    bombsLeft: number;
}

const actionBarHeight = '3em';

const Root = styled(ButtonGroup)({
    height: actionBarHeight,
})

const Item = styled(Button)({
    flexGrow: 1,
    flexBasis: 0,
})

const CountItem = styled(Item)({
    flexDirection: 'column',
})

const CountLabel = styled(Typography)({
    fontSize: '0.8em',
    lineHeight: '1em',
    whiteSpace: 'nowrap',
})

const CountValue = styled(Typography)({
    fontSize: '1.5em',
    lineHeight: '1em',
    fontWeight: 'bold',
})

export const ScanBoosts: React.FC<Props>= props => {
    const countColor = props.bombsLeft !== 0 ? 'secondary' : undefined;

    return (
        <Root variant="text">
            <CountItem disabled>
                <CountLabel component="div">bombs left</CountLabel>
                <CountValue component="div" color={countColor}>{props.bombsLeft}</CountValue>
            </CountItem>
            <Item>Hint</Item>
            <Item>Safety</Item>
            <Item>Reveal</Item>
        </Root>
    );
}
