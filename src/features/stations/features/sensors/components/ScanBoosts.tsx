import { Button, ButtonGroup, Typography, styled } from 'src/lib/mui';
import { ScanBoostInfo } from '../types/ScanBoost';
import { ScanBoostIcon } from './ScanBoostIcon';
import { useTranslation } from 'react-i18next';

interface Props {
    bombsLeft: number;
    boosts: ScanBoostInfo[];
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
    fontSize: '1.8em !important',
    lineHeight: '1em',
    fontWeight: 'bold',
    maxHeight: '1.25em',
    display: 'flex',
    alignItems: 'center',
})

export const ScanBoosts: React.FC<Props>= props => {
    const { t } = useTranslation('sensors');

    const countValue = (
        <CountValue
            component="div"
            color={props.bombsLeft !== 0 ? 'secondary' : undefined}
        >
            {props.bombsLeft}
        </CountValue>
    );

    return (
        <Root variant="text">
            <Item disabled startIcon={countValue}>
                {t('bombsLeft', { count: props.bombsLeft })}
            </Item>

            {props.boosts.map((boost, index) => (<Item key={index} startIcon={<ScanBoostIcon boost={boost.type} />}>{t(`boost ${boost.type}`)}</Item>))}
        </Root>
    );
}
