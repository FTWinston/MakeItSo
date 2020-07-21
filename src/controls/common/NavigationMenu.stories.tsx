import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { Theme } from '../../style/theme';
import { NavigationMenu } from './NavigationMenu';
import { System } from '../../data/System';

export default { title: 'Common/Navigation Menu' };

const WithState = () => {
    const [paused, setPaused] = useState(false);
    const [open, setOpen] = useState(false);
    const [system, setSystem] = useState(System.Helm);

    const close = () => {
        setOpen(false);

        setTimeout(() => {
            setOpen(true);
        }, 1000);
    }

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 100);
    }, []);

    return (
        <Theme>
            <NavigationMenu
                currentSystem={system}
                setCurrentSystem={setSystem}
                isPaused={paused}
                setPaused={setPaused}
                isOpen={open}
                close={close}
                endGame={action('end game')}
            />
        </Theme>
    );
};

export const example = () => <WithState />;

