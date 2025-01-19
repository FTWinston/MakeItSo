import { Typography } from '@mui/material';
import { Box } from 'src/lib/mui';

type Props = {
    x: number;
    y: number;
    type: 'player';
}

export const EntityDisplay: React.FC<Props> = props => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                gridColumn: `${props.x + 1}`,
                gridRow: `${props.y + 1}`,
                backgroundColor: 'transparent',
            }}
        >
            <Typography 
                color="primary.light"
                fontSize="0.75em"
                lineHeight="1em"
            >
                P
            </Typography>
        </Box>
    );
}