import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface Props {
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

    return (
        <AppBar position="static">
            <MainToolbar>
                <MenuButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label={t('menu')}
                >
                    <MenuIconImage />
                </MenuButton>
                
                {props.children}
            </MainToolbar>
        </AppBar>
    );
};