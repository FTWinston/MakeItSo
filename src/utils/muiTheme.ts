import { createTheme } from '@mui/material/styles';
import '@fontsource/jura/400.css';
import '@fontsource/jura/500.css';
import '@fontsource/jura/700.css';

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
            dark: '#d32f2f',
            light: '#e57373',
            contrastText: 'black',
        },
    },
    typography: {
        fontFamily: 'Jura,sans-serif'
    }
});