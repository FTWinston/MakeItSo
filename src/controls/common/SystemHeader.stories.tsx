import React from 'react';
import { action } from '@storybook/addon-actions';
import { Theme } from '../../style/theme';
import { IconButton } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { StoryGameProvider } from '../StoryGameProvider';
import { SystemHeader } from './SystemHeader';

export default { title: 'Common/System Header' };

export const example = () => (
    <Theme>
        <StoryGameProvider>
            <SystemHeader>
                <IconButton edge="end" color="inherit">
                    <MoreIcon />
                </IconButton>
            </SystemHeader>
        </StoryGameProvider>
    </Theme>
);