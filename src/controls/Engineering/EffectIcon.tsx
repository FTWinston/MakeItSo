import React from 'react';
import DamageIcon from '@material-ui/icons/Whatshot';
import { PowerEffectType } from '../../data/PowerEffect';

interface Props {
    className?: string;
    effect: PowerEffectType;
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
}

export const EffectIcon: React.FC<Props> = props => {
    let Icon;
    switch (props.effect) {
        default:
            Icon = DamageIcon;
            break;
    }

    return <Icon color={props.color} className={props.className} />
}