import MuiStack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const Stack = styled(MuiStack)({
    '& > :not(style) + :not(style)': {
        marginLeft: '0.5em', // TODO: this should only apply to direction="row"
    }
}) as typeof MuiStack;