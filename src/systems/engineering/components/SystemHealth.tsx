import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';

interface Props {
    value: number;
}

const useStyles = makeStyles(theme => ({
    root: {
        transition: 'color 0.75s ease',
    }
}));

export const SystemHealth: React.FC<Props> = props => {
    const classes = useStyles();

    const animatedProps = useSpring({ health: props.value });

    const gb = props.value * 2 + 55; // 55-255, as health is 0-100

    return (
        <Typography component="div" className={classes.root} style={{color: `rgb(255, ${gb}, ${gb})`}}>
            <animated.div>
                {animatedProps.health.interpolate(x => x.toFixed(0))}
            </animated.div>
        </Typography>
    );
}