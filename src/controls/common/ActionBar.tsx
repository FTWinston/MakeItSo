import React from 'react';
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
    showNavigation: () => void;
}

const useStyles = makeStyles({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
});

export const ActionBar: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open menu" onClick={props.showNavigation}>
                    <MenuIcon />
                </IconButton>

                <div className={classes.grow} />
                
                {props.children}
            </Toolbar>
        </AppBar>
    )
}