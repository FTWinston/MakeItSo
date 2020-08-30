import React from 'react';
import { action } from '@storybook/addon-actions';
import { Theme } from '../theme';
import { IconButton } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { StoryGameProvider } from './StoryGameProvider';
import { SystemHeader } from './SystemHeader';
import { System } from '../data/System';

export default { title: 'Common/System Header' };

export const example = () => (
    <Theme>
        <StoryGameProvider initialSystem={System.Helm}>
            <SystemHeader showMenu={action('show menu')}>
                <IconButton edge="end" color="inherit">
                    <MoreIcon />
                </IconButton>
            </SystemHeader>
        </StoryGameProvider>
    </Theme>
);