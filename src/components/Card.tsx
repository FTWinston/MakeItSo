import MuiCard from '@mui/material/Card';
import MuiCardHeader from '@mui/material/CardHeader';
import MuiCardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

export const Card = styled(MuiCard)({
    borderRadius: '0.225em',
});

export const CardHeader = styled(MuiCardHeader)({
    padding: '0.8em',
    '& .MuiCardHeader-title': {
        fontSize: '0.75em',
    },
    '& .MuiCardHeader-avatar': {
        marginRight: '0.7em',
    },
});

export const CardContent = styled(MuiCardContent)({
    padding: '0.8em',
});
