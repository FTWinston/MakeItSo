import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#8986D8',
            contrastText: '#000',
        },
        secondary: {
            main: '#E08138',
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