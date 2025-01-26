import { Typography } from '@mui/material';
import { Box } from 'src/lib/mui';
import { CellType } from '../types/Maze';

type Props = {
    type: CellType;
    content?: 'entrance' | 'item' | 'goal';
    group: number;
    x: number;
    y: number;

    rightmost: boolean;
    bottommost: boolean;

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
                color={props.content === 'entrance' ?
                    'info.light'
                    : props.content === 'item'
                        ? 'secondary.dark'
                        : props.content === 'goal'
                            ? 'secondary'
                            : undefined}
                fontSize="0.75em"
                lineHeight="1em"
            >
                {props.content === 'entrance' ? '█' : props.content === 'item' ? '·' : props.content === 'goal' ? 'X' : undefined}
            </Typography>
        );

    const hue = props.group * 70;

    let alpha: number;

    switch (props.type) {
        case CellType.Outside:
            alpha = 0;
            break;
        case CellType.Unseen:
            alpha = 0.05;
            break;
        case CellType.Obscured:
            alpha = 0.1;
            break;
        case CellType.Visible:
            alpha = 0.2;
            break;
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                borderColor: 'primary.dark',
                borderStyle: 'solid',
                borderWidth: 0,

                gridColumn: `${props.x + 1}`,
                gridRow: `${props.y + 1}`,

                backgroundColor: props.type === CellType.Outside ? undefined : `hsla(${hue}, 100%, 50%, ${alpha})`,
                transition: 'background-color 0.33s ease',

                borderRightWidth: props.rightmost ? 2 : 1,
                borderBottomWidth: props.bottommost ? 2 : 1,
                borderLeftWidth: props.x === 0 ? 2 : 1,
                borderTopWidth: props.y === 0 ? 2 : 1,

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