import { Button, ButtonGroup, Typography, styled } from 'src/lib/mui';
import { SensorBoostInfo } from '../types/SensorBoost';
import HintIcon from '@mui/icons-material/Help';

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
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '0.8em',
    lineHeight: '1.2em',
    whiteSpace: 'nowrap',

    '& > .MuiButton-startIcon': {
        margin: 0,
        '& > svg': {
            width: '1.25em',
            height: '1.25em',
        }
    }
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
            <Item disabled startIcon={<CountValue color={countColor}>{props.bombsLeft}</CountValue>}>
                bombs left
            </Item>

            {props.boosts.map((boost, index) => (<Item key={index} startIcon={<HintIcon fontSize="large" />}>{boost.type}</Item>))}
        </Root>
    );
}
