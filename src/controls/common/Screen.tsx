import React from 'react';
import './Screen.scss';

interface Props {
    padded?: boolean;
    className?: string;
}

export const Screen: React.FC<Props> = props => {
    let classes = 'screen';
    if (props.padded) {
        classes += ' screen--padded';
    }

    if (props.className) {
        classes = `${classes} ${props.className}`;
    }

    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}