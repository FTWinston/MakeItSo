import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';

export const Tabs = styled(MuiTabs)({
    minHeight: '3em',
});

export const Tab = styled(MuiTab)({  
    minHeight: '3em',
    minWidth: '5.625em',
    maxWidth: '22.5em',
    padding: '0.75em 1em',
});