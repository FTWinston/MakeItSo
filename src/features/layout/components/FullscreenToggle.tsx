import { ListItemIcon, ListItemText, MenuItem, styled } from 'src/lib/mui';
import { useTranslation } from 'react-i18next';
import { default as EnterIcon } from '@mui/icons-material/Fullscreen';
import { default as ExitIcon } from '@mui/icons-material/FullscreenExit';
import { Global, Interpolation, Theme } from '@emotion/react';
import { enterFullscreen, exitFullscreen, toggleFullscreen } from '../utils/fullscreen';

interface Props {
    onClick?: () => void;
}

const EnterMenuItem = styled(MenuItem)({
    // When running as a PWA, dont show a fullscreen toggle, as it's already effectively fullscreen.
    '@media all and (display-mode: standalone)': {
        display: 'none',
    },
    // When in browser F11 browser fullscreen mode, don't show "enter" button.
    '@media all and (display-mode: fullscreen)': {
        display: 'none',
    },
    // Don't show enter/exit items if we don't support detecting fullscreen with CSS. (Will show a toggle instead.)
    '@supports not selector(:fullscreen)': {
        display: 'none',
    },
});

const ExitMenuItem = styled(MenuItem)({
    // Don't show enter/exit items if we don't support detecting fullscreen with CSS. (Will show a toggle instead.)
    '@supports not selector(:fullscreen)': {
        display: 'none',
    },
    // When running as a PWA, dont show a fullscreen toggle, as it's already effectively fullscreen.
    '@media all and (display-mode: standalone)': {
        display: 'none',
    },
});

const ToggleMenuItem = styled(MenuItem)({
    // When running as a PWA, dont show a fullscreen toggle, as it's already effectively fullscreen.
    '@media all and (display-mode: standalone)': {
        display: 'none',
    },
    // Only show a "toggle" button (as opposed to enter/exit) if we don't support detecting fullscreen with CSS.
    '@supports selector(:fullscreen)': {
        display: 'none',
    },
});

const globalStyle: Interpolation<Theme> = {
    'body:fullscreen #enterFullscreen': {
        display: 'none',
    },
    'body:not(:fullscreen) #exitFullscreen': {
        display: 'none',
    }
}

export const FullscreenToggle: React.FC<Props> = (props) => {
    const { t } = useTranslation('common');

    const enter = () => {
        props.onClick?.();
        enterFullscreen();
    };

    const exit = () => {
        props.onClick?.();
        exitFullscreen();
    };

    const toggle = () => {
        props.onClick?.();
        toggleFullscreen();
    };

    return (
        <>
            <Global styles={globalStyle} />
            <EnterMenuItem id="enterFullscreen" onClick={enter}>
                <ListItemIcon>
                    <EnterIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                    {t('fullscreen enter')}
                </ListItemText>
            </EnterMenuItem>
            <ExitMenuItem id="exitFullscreen" onClick={exit}>
                <ListItemIcon>
                    <ExitIcon fontSize="small" />    
                </ListItemIcon>
                <ListItemText>
                    {t('fullscreen exit')}
                </ListItemText>
            </ExitMenuItem>
            <ToggleMenuItem id="toggleFullscreen" onClick={toggle}>
                <ListItemIcon>
                    <EnterIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                    {t('fullscreen toggle')}
                </ListItemText>
            </ToggleMenuItem>
        </>
    );
};