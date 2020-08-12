import React from 'react';
import UnknownIcon from '@material-ui/icons/HelpOutline';
import { PowerCardType } from '../../data/PowerCard';

interface Props {
    className?: string;
    card: PowerCardType;
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
}

export const CardIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.card) {
        default:
            Icon = UnknownIcon;
            break;
    }

    return <Icon color={props.color} className={props.className} />
}