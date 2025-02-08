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

    if (props.type === CellType.Damaged) {
        return undefined;
    }
    else if (props.content === 'exit' && props.system) {
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