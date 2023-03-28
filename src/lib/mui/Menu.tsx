import { default as MuiMenu } from '@mui/material/Menu';
import { styled } from '@mui/material/styles';

export const Menu = styled(MuiMenu)({
    '& > .MuiMenu-list': {
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
    }
});