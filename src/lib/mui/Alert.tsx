import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

export const Alert = styled(MuiAlert)({
    borderRadius: '0.25em',
    padding: '0.375em 1em',

    '& > .MuiAlert-icon': {
        marginRight: '0.75em',
        fontSize: '1.375rem',

    },
    '& > .MuiAlert-message': {
        padding: '0.5em 0',
    },
    '& > .MuiAlert-action': {
        padding: '0.05em 0 0 1em',
        marginRight: '-0.5em',
    }
});