import { Box, Typography, alpha, useTheme } from 'src/lib/mui';
import { CellType } from '../types/Maze';
import { CrewStation, ShipSystem } from 'src/types/ShipSystem';
import { CrewIcon } from 'src/components';

type ContentProps = {
    type: CellType;
    visible: boolean;
    content?: 'entrance' | 'exit' | 'item';
    system?: ShipSystem;
}

type Props = ContentProps & {
    x: number;
    y: number;
    rightmost: boolean;
    bottommost: boolean;
    borderRight: boolean;
    borderBottom: boolean;
    borderLeft: boolean;
    borderTop: boolean;
}

const useCellContent: React.FC<ContentProps> = props => {
    let color: string;
    let fontSize: string;
    let content: string | JSX.Element;

    const theme = useTheme();

    if (props.content === 'exit' && props.system) {
        color = theme.palette.secondary.main;
        content = 'X';
        fontSize = '0.75em';
        content = <CrewIcon fontSize='small' station={props.system as unknown as CrewStation} />; // TODO: CrewIcon should be adapted to be SystemIcon, cos we want an icon for shields, and maybe for the hull too, if that's even a system.
    }
    else if (props.content) {
        fontSize = '0.75em';

        switch (props.content) {
            case 'entrance':
                color = theme.palette.info.light;
                content = '█';
                break;
            case 'exit':
                color = theme.palette.secondary.main;
                content = '?';
                break;
            case 'item':
                color = theme.palette.secondary.dark;
                content = '·';
                break;
            default:
                color = theme.palette.error.main;
                content = '!';
                break;
        }
    }
    else {
        return undefined;
    }

    return (
        <Typography 
            color={color}
            lineHeight="1em"
            style={{fontSize}}
        >
            {content}
        </Typography>
    );
}

export const CellDisplay: React.FC<Props> = props => {
    const theme = useTheme();
    
    const content = useCellContent(props);
    
    const backgroundColor = props.type === CellType.Outside
        ? undefined
        : alpha(theme.palette.primary.dark, props.visible ? 0.25 : 0.075);


    const borderRightWidth = props.rightmost ? 2 : 1;
    const borderBottomWidth = props.bottommost ? 2 : 1;
    const borderLeftWidth = props.x === 0 ? 2 : 1;
    const borderTopWidth = props.y === 0 ? 2 : 1;

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            sx={{
                borderColor: 'primary.dark',
                borderStyle: 'solid',

                gridColumn: `${props.x + 1}`,
                gridRow: `${props.y + 1}`,

                transition: 'all 0.33s ease',

                borderRightWidth,
                borderBottomWidth,
                borderLeftWidth,
                borderTopWidth,

                borderRightColor: props.borderRight ? undefined : 'transparent',
                borderBottomColor: props.borderBottom ? undefined : 'transparent',
                borderLeftColor: props.borderLeft ? undefined : 'transparent',
                borderTopColor: props.borderTop ? undefined : 'transparent',

                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -borderTopWidth,
                    left: -borderLeftWidth,
                    right: -borderRightWidth,
                    bottom: -borderBottomWidth,
                    backgroundColor,
                    backgroundImage: props.type === CellType.Damaged
                        ? 'repeating-linear-gradient(0deg, transparent, transparent 0.05em, #600 0.05em, #c00 0.15em, transparent 0.15em, transparent 0.2em)'
                        : undefined,
                    transition: 'all 0.33s ease',
                    zIndex: -1, /* Place it behind the content */
                }
            }}
        >
            {content}
        </Box>
    );
}