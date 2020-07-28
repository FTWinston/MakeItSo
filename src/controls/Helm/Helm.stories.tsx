import React from 'react';
import { Theme } from '../../style/theme';
import { Helm } from './Helm';
import { StoryGameProvider } from '../StoryGameProvider';
import { System } from '../../data/System';

export default { title: 'Helm' };

const WithState = () => {
    return (
        <Theme>
            <StoryGameProvider initialSystem={System.Helm}>
                <Helm />
            </StoryGameProvider>
        </Theme>
    );
};

export const example = () => <WithState />;
