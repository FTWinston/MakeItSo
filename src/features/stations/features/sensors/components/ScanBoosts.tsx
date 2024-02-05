import { Button, ButtonGroup, Typography, styled } from 'src/lib/mui';
import { SensorBoostInfo } from '../types/SensorBoost';

interface Props {
    bombsLeft: number;
    boosts: SensorBoostInfo[];
}

const actionBarHeight = '3em';

const Root = styled(ButtonGroup)({
    height: actionBarHeight,
    overflow: 'hidden',
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

            {props.boosts.map((boost, index) => (<Item key={index}>{boost.type}</Item>))}
        </Root>
    );
}
