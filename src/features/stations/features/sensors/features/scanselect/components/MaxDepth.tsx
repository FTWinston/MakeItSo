import { Box, styled } from 'src/lib/mui';

interface Props {
    column: number;
    endColumn: number;
}

const Root = styled(Box)({
    border: 'solid red 0px',
    marginLeft: '0.65em',
    borderLeftWidth: '0.2em',
    gridRowStart: 1,
    gridRowEnd: 9,
    backgroundColor: 'rgba(255, 0, 0, 0.1)'
});

export const MaxDepth: React.FC<Props> = props => {
    return (
        <Root sx={{ gridColumnStart: props.column, gridColumnEnd: props.endColumn }} />
    );
}

