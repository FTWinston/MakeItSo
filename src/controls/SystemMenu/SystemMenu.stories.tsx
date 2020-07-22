import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { Theme } from '../../style/theme';
import { SystemMenu } from './SystemMenu';
import { StoryGameProvider } from '../StoryGameProvider';

export default { title: 'System Menu' };

const WithState = () => {
    const [open, setOpen] = useState(false);

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
            <StoryGameProvider>
                <SystemMenu
                    isOpen={open}
                    close={close}
                />
            </StoryGameProvider>
        </Theme>
    );
};

export const example = () => <WithState />;

