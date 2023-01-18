import MuiBadge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const Badge = styled(MuiBadge)({  
    '& > .MuiBadge-badge': {
        fontSize: '1em',
        borderRadius: '1em',
    },
    '& > .MuiBadge-standard': {
        height: '1.25em',
        minWidth: '1.25em',
        padding: '0 0.25em',
    },
    '& > .MuiBadge-dot': {
        height: '0.5em',
        minWidth: '0.5em',
    },
});