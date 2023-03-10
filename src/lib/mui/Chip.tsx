import MuiChip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

export const Chip = styled(MuiChip)({  
    height: '2em',
    borderRadius: '1em',
   '& .MuiChip-label': {
        paddingLeft: '0.75em',
        paddingRight: '0.75em',
    },
   '& .MuiChip-icon': {
        marginLeft: '0.3125em',
        marginRight: '-0.375em',
   }
});