import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { Theme } from '../theme';
import { ConfirmDialog } from './ConfirmDialog';

export default { title: 'Common/Generic/Confirm Dialog' };

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
            <ConfirmDialog
                title="Dialog title"
                prompt="Dialog prompt. This might be quite long."
                isOpen={open}
                close={close}
                confirm={action('confirm')}
            />
        </Theme>
    );
};

export const example = () => <WithState />;

