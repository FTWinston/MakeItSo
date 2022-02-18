import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface Props {
    title: string;
    appBarContent?: () => JSX.Element;
}

const MainToolbar = styled(Toolbar)({
    paddingLeft: '1em !important',
    paddingRight: '0.75em !important',
    minHeight: '2em !important',
});

const MenuButton = styled(IconButton)({
    fontSize: '0.8em',
    padding: '1em',
    marginLeft: '-1em',
    marginRight: '1em',
});

const MenuIconImage = styled(MenuIcon)({
    fontSize: '2em',
});

export const AppBarHeight = '3em';

export const SystemAppBar: React.FC<Props> = (props) => {
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
            
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1.25em' }}>
                    {props.title}
                </Typography>
                
                {props.children}
            </MainToolbar>
        </AppBar>
    );
};