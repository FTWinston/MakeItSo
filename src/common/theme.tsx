import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepOrange, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#8986D8',
            contrastText: '#000',
        },
        secondary: {
            light: orange[300],
            main: orange[400],
            dark: orange[500],
            contrastText: '#000',
        },
        warning: {
            main: deepOrange[400],
            light: deepOrange[300],
            dark: deepOrange[600],
            contrastText: '#000',
        }
    },
    typography: {
        fontFamily: '"Jura", sans-serif',
    },
});

export const Theme: React.FC = props => (
    <ThemeProvider theme={theme}>
        {props.children}
    </ThemeProvider>
);