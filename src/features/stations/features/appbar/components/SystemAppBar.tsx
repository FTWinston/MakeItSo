import { AppBar, Toolbar, MenuIcon, IconButton, styled, Menu, Box, SxProps, Theme } from 'src/lib/mui';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { FullscreenToggle } from './FullscreenToggle';
import { CrewStation } from 'src/types/ShipSystem';
import { CrewIcon } from 'src/components';

interface Props {
    renderMenuItems?: () => JSX.Element;
    station: CrewStation;
    justifyContent?: 'flex-start' | 'flex-end' | 'center';
}

const MainToolbar = styled(Toolbar)({
    paddingLeft: '0.5em !important',
    paddingRight: '0 !important',
    minHeight: '2em !important',
});

const MenuButton = styled(IconButton)({
    fontSize: '0.8em',
    padding: '1em',
    marginLeft: '-1em',
});

const MenuIconImage = styled(MenuIcon)({
    fontSize: '2em',
});

const StationIcon = styled(CrewIcon)({
    fontSize: '1.5em',
    '@media (min-width: 500px)': {
        fontSize: '2.2em',
    },
});

export const AppBarHeight = '3em';

export const SystemAppBar: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const { t } = useTranslation('common');

    const menuRoot = useRef(null);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const showMenu = () => {
        setAnchorEl(menuRoot.current);
    };
  
    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" ref={menuRoot}>
            <MainToolbar>
                <MenuButton
                    onClick={showMenu}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label={t('menu')}    
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                >
                    <MenuIconImage />
                </MenuButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                >
                    <FullscreenToggle onClick={closeMenu} />
                    {props.renderMenuItems?.()}
                </Menu>
                <StationIcon
                    station={props.station}
                    role="img"
                    color="disabled"
                />
                <Box sx={{flexGrow: 1, display: 'flex', justifyContent: props.justifyContent, alignItems: 'center'}}>
                    {props.children}
                </Box>
            </MainToolbar>
        </AppBar>
    );
};