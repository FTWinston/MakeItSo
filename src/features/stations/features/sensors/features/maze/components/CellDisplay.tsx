import { Box, Typography, alpha, useTheme } from 'src/lib/mui';
import { CellType } from '../types/Maze';

type Props = {
    type: CellType;
    visible: boolean;
    content?: 'entrance' | 'item' | 'goal';
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
    const theme = useTheme();
    
    let content: JSX.Element | undefined;
    
    if (props.type === CellType.Damaged) {
        content = (
            <Typography 
                color={alpha(theme.palette.warning.dark, 0.3)}
                lineHeight="1em"
                style={{fontSize: '0.5em'}}
            >
                ?
            </Typography>
        );
    }
    else if (props.content !== undefined) {
        content = (
            <Typography 
                color={props.content === 'entrance' ?
                    'info.light'
                    : props.content === 'item'
                        ? 'secondary.dark'
                        : props.content === 'goal'
                            ? 'secondary'
                            : undefined}
                style={{fontSize: '0.75em'}}
                lineHeight="1em"
            >
                {props.content === 'entrance' ? '█' : props.content === 'item' ? '·' : props.content === 'goal' ? 'X' : undefined}
            </Typography>
        );
    }

    let backgroundColor: string | undefined;

    switch (props.type) {
        case CellType.Damaged:
            backgroundColor = alpha(theme.palette.warning.dark, props.visible ? 0.4 : 0.2);
            break;
        case CellType.Normal:
            backgroundColor = alpha(theme.palette.primary.dark, props.visible ? 0.25 : 0.075);
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

                backgroundColor,
                transition: 'all 0.33s ease',

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