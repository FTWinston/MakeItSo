import React from 'react';
import { action } from '@storybook/addon-actions';
import { Theme } from '../../style/theme';
import { ActionBar } from './ActionBar';
import { IconButton } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ActionBarPrimary } from './ActionBarPrimary';

export default { title: 'Common/Action Bar' };

const PrimaryWithState = () => {
    return (
        <Theme>
            <ActionBarPrimary
                showNavigation={action('show navigation')}
                primaryAction={action('primary clicked')}
                primaryLabel="primary action"
                primaryIcon={() => <WarningIcon />}
            >
                <IconButton color="inherit">
                    <SearchIcon />
                </IconButton>
                <IconButton edge="end" color="inherit">
                    <MoreIcon />
                </IconButton>
            </ActionBarPrimary>
        </Theme>
    );
};

const NoPrimaryWithState = () => {
    return (
        <Theme>
            <ActionBar
                showNavigation={action('show navigation')}
            >
                <IconButton color="inherit">
                    <SearchIcon />
                </IconButton>
                <IconButton edge="end" color="inherit">
                    <MoreIcon />
                </IconButton>
            </ActionBar>
        </Theme>
    );
};

export const withPrimary = () => <PrimaryWithState />;

export const noPrimary = () => <NoPrimaryWithState />;
