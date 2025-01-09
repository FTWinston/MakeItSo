import { Typography } from '@mui/material';
import { Box } from 'src/lib/mui';

type Props = {
    content?: 'start' | 'item' | 'goal';

    rightmost: boolean;
    bottommost: boolean;
    leftmost: boolean;
    topmost: boolean;

    borderRight: boolean;
    borderBottom: boolean;
    borderLeft: boolean;
    borderTop: boolean;
}

export const CellDisplay: React.FC<Props> = props => {
    const content = props.content === undefined
        ? undefined
        : (
            <Typography 
                color={props.content === 'start' ? 'info.dark' : (props.content === 'item' || props.content === 'goal') ? 'secondary.dark' : undefined}
                fontSize="0.75em"
                lineHeight="1em"
            >
                {props.content === 'start' ? 'S' : props.content === 'item' ? '·' : props.content === 'goal' ? 'X' : undefined}
            </Typography>
        );

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                borderColor: 'primary.dark',
                borderStyle: 'solid',
                borderWidth: 0,

                borderRightWidth: props.rightmost ? 0 : 1,
                borderBottomWidth: props.bottommost ? 0 : 1,
                borderLeftWidth: props.leftmost ? 0 : 1,
                borderTopWidth: props.topmost ? 0 : 1,

                borderRightColor: props.borderRight ? undefined : 'transparent',
                borderBottomColor: props.borderBottom ? undefined : 'transparent',
                borderLeftColor: props.borderLeft ? undefined : 'transparent',
                borderTopColor: props.borderTop ? undefined : 'transparent',
            }}
        >
            {content}
        </Box>
    );
}