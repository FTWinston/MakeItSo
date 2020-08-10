import { CircularProgressProps, Box, CircularProgress, Typography } from "@material-ui/core";
import React from "react";

interface Props extends CircularProgressProps {
    value: number;
}

export const SystemHealth: React.FC<Props> = props => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="static" {...props} />
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
                    {Math.round(props.value)}
                </Typography>
            </Box>
        </Box>
    );
}