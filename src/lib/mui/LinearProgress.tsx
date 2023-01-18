import MuiLinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export const LinearProgress = styled(MuiLinearProgress)({
    height: '0.25em',
    '& > .MuiLinearProgress-dashed': {
        backgroundSize: '0.625em 0.625em',
        backgroundPosition: '0 -1.4375em',
        left: 0,
    }
});
