import React, { useState, useContext } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { SystemMenu } from '../SystemMenu/SystemMenu';

export interface Props {
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

    const [showNav, setShowNav] = useState(false);
    
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open menu" onClick={() => setShowNav(true)}>
                    <MenuIcon />
                </IconButton>

                <div className={classes.grow} />

                {props.children}
            </Toolbar>

            <SystemMenu
                isOpen={showNav}
                close={() => setShowNav(false)}
            />
        </AppBar>
    )
}