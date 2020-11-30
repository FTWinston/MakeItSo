import React from 'react';
import { Theme } from '../theme';
import { System } from '../data/System';
import { StoryGameProvider } from './StoryGameProvider';
import { SystemSwitcher } from './SystemSwitcher';

export default { title: 'Systems' };

const WithState = () => {
    return (
        <Theme>
            <StoryGameProvider initialSystem={System.Helm}>
                <SystemSwitcher />
            </StoryGameProvider>
        </Theme>
    );
};

export const example = () => <WithState />;
