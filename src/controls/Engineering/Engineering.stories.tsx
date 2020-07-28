import React from 'react';
import { Theme } from '../../style/theme';
import { Engineering } from './Engineering';
import { StoryGameProvider } from '../StoryGameProvider';
import { System } from '../../data/System';

export default { title: 'Engineering' };

const WithState = () => {
    return (
        <Theme>
            <StoryGameProvider initialSystem={System.Engineering}>
                <Engineering />
            </StoryGameProvider>
        </Theme>
    );
};

export const example = () => <WithState />;
