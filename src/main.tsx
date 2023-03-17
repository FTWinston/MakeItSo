import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'src/lib/mui';
import { theme } from './lib/mui/theme';
import './language';
import './base.css';
import { enableMapSet } from 'immer';
import { createRouter } from './utils/createRouter';

enableMapSet();

const router = createRouter();

const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)
