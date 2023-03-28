import { AppBar, Toolbar, MenuIcon, IconButton, styled, Menu, Divider } from 'src/lib/mui';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { FullscreenToggle } from './FullscreenToggle';

interface Props {
    renderMenuItems?: () => JSX.Element;
}

const MainToolbar = styled(Toolbar)({
    paddingLeft: '0.5em !important',
    paddingRight: '0 !important',
    minHeight: '2em !important',
});

const MenuButton = styled(IconButton)({
    fontSize: '0.8em',
    padding: '1em',
});

const MenuIconImage = styled(MenuIcon)({
    fontSize: '2em',
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
                    {props.renderMenuItems ? <Divider /> : undefined}
                    {props.renderMenuItems?.()}
                </Menu>
                
                {props.children}
            </MainToolbar>
        </AppBar>
    );
};