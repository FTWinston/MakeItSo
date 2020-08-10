import React from 'react';
import { makeStyles, Container } from '@material-ui/core';

interface Props {
    padded?: boolean;
    className?: string;
}

const useStyles = makeStyles(theme => ({
    main: (props: Props) => ({
        minHeight: '100vh',
        padding: props.padded ? '1em' : 0,
        overflow: 'hidden',
    }),
}));

export const Screen: React.FC<Props> = props => {
    const classes = useStyles(props);

    const className = props.className
        ? `${classes.main} ${props.className}`
        : classes.main;

    return (
        <Container className={className}>
            {props.children!}
        </Container>
    )
}