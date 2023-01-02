import { styled } from '@mui/material/styles';
import { Button } from 'src/components';

interface StateProps {
    value?: number;
    frozen: boolean;
}

interface Props extends StateProps {
    onClick?: () => void;
}

const Root = styled(Button, { shouldForwardProp: (prop) => prop !== 'value' && prop !== 'frozen' })<Props>(({ theme, value, frozen }) => ({
    backgroundColor: theme.palette.grey[500],
    width: '4em',
    height: '4em',
    padding: '0.5em',
    display: 'grid',
    placeItems: 'center',
    gridTemplateRows: '1fr 1fr 1fr',
    gridTemplateColumns: value === 6 ? '3fr 1fr 3fr' : '1fr 1fr 1fr',
    gridTemplateAreas: '"tl . tr" "l m r" "bl . br"',
    color: frozen
        ? theme.palette.primary.main
        : theme.palette.text.primary,
}));

const Dot = styled('div', { shouldForwardProp: () => false })<{ index: number, value: number }>(({ index, value }) => {
    let gridArea: string | undefined;
    switch (value) {
    case 1:
        gridArea = 'm';
        break;
    case 2:
    case 3:
        switch (index) {
        case 1:
            gridArea = 'tl';
            break;
        case 2:
            gridArea = 'br';
            break;
        case 3:
            gridArea = 'm';
            break;
        }
        break;
    case 4:
    case 5:
        switch (index) {
        case 1:
            gridArea = 'tl';
            break;
        case 2:
            gridArea = 'tr';
            break;
        case 3:
            gridArea = 'bl';
            break;
        case 4:
            gridArea = 'br';
            break;
        case 5:
            gridArea = 'm';
            break;
        }
        break;
    case 6:
        switch (index) {
        case 1:
            gridArea = 'tl';
            break;
        case 2:
            gridArea = 'tr';
            break;
        case 3:
            gridArea = 'l';
            break;
        case 4:
            gridArea = 'r';
            break;
        case 5:
            gridArea = 'bl';
            break;
        case 6:
            gridArea = 'br';
            break;
        }
    }

    return {
        backgroundColor: 'currentColor',
        width: '0.75em',
        height: '0.75em',
        borderRadius: '1em',
        gridArea,
    };
});

export const Dice: React.FC<Props> = props => {
    const { value, frozen, onClick } = props;

    const dots = value === undefined
        ? undefined
        : new Array(value).fill(0).map((_, index) => (
            <Dot
                key={index}
                index={index+1}
                value={value}
            />
        ));

    return (
        <Root value={value} frozen={frozen} onClick={onClick}>
            {dots}
        </Root>
    );
};