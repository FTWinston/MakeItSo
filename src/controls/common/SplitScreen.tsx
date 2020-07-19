import React from 'react';
import { Screen } from './Screen';
import './SplitScreen.scss';

type RenderProp = () => JSX.Element | JSX.Element[] | string;

interface Props {
    className?: string;
    primary: RenderProp;
    secondary: RenderProp;
    primaryPadded?: boolean;
    secondaryPadded?: boolean;
}

export const SplitScreen: React.FC<Props> = props => {
    let classes = 'splitScreen';
    if (props.className) {
        classes = `${classes} ${props.className}`;
    }

    const primaryClasses = props.primaryPadded
        ? 'splitScreen__primary splitScreen__primary--padded'
        : 'splitScreen__primary'

    const secondaryClasses = props.secondaryPadded
        ? 'splitScreen__secondary splitScreen__secondary--padded'
        : 'splitScreen__secondary'

    return (
        <Screen className={classes}>
            <div className={primaryClasses}>
                {props.primary()}
            </div>
            
            <div className={secondaryClasses}>
                {props.secondary()}
            </div>
        </Screen>
    )
}