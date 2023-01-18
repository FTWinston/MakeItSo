import MuiSwitch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

export const Switch = styled(MuiSwitch)({
    width: '3.625em',
    height: '2.375em',
    padding: '0.75em',
    '& > .MuiSwitch-switchBase': {
        padding: '0.5625em',

    },
    '& > .MuiSwitch-switchBase.Mui-checked': {
        'transform': 'translateX(1.25em)',
    },
    '& .MuiSwitch-thumb': {
        width: '1.25em',
        height: '1.25em',
    },
    '& > .MuiSwitch-track': {
        borderRadius: '0.4375em',
    },
});