import MuiBadge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const Badge = styled(MuiBadge)({  
    '& > .MuiBadge-badge': {
        fontSize: '1em',
        borderRadius: '1em',
        height: '1.25em',
        minWidth: '1.25em',
        padding: '0 0.25em',
    },
});