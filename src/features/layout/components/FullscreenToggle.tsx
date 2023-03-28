import { ListItemIcon, ListItemText, MenuItem, styled } from 'src/lib/mui';
import { useTranslation } from 'react-i18next';
import { default as EnterIcon } from '@mui/icons-material/Fullscreen';
import { default as ExitIcon } from '@mui/icons-material/FullscreenExit';
import { Global, Interpolation, Theme } from '@emotion/react';

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
});

const ExitMenuItem = styled(MenuItem)({
    '@media all and (display-mode: standalone)': {
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

export const enterFullscreen = () => document.body.requestFullscreen();
export const exitFullscreen = () => document.exitFullscreen();

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
        </>
    );
};