import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        /*
        primary: {
            main: '#ff0000',
            contrastText: 'white',
        },
        */
        error: {
            main: '#f44336',
            contrastText: 'black',
        },
    },
});