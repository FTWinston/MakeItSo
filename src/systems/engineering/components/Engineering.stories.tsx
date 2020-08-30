import React from 'react';
import { Theme } from '../../../common/theme';
import { Engineering } from './Engineering';
import { StoryGameProvider } from '../../../common/components/StoryGameProvider';
import { System } from '../../../common/data/System';

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
