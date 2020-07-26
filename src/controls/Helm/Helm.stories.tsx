import React from 'react';
import { Theme } from '../../style/theme';
import { Helm } from './Helm';
import { StoryGameProvider } from '../StoryGameProvider';

export default { title: 'Helm' };

const WithState = () => {
    return (
        <Theme>
            <StoryGameProvider>
                <Helm />
            </StoryGameProvider>
        </Theme>
    );
};

export const example = () => <WithState />;
