import React from 'react';
import { CircularProgressProps, Box, CircularProgress, Typography, makeStyles } from '@material-ui/core';

interface Props extends CircularProgressProps {
    value: number;
}

const useStyles = makeStyles(theme => ({
    progress: {
        color: theme.palette.error.main,
    }
}));

export const SystemHealth: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress 
                variant="static"
                value={100-props.value}
                className={classes.progress}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography component="div">
                    {props.value}
                </Typography>
            </Box>
        </Box>
    );
}