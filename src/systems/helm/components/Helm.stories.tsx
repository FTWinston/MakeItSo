import React from 'react';
import { Theme } from '../../../common/theme';
import { Helm } from './Helm';
import { StoryGameProvider } from '../../../common/components/StoryGameProvider';
import { System } from '../../../common/data/System';

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
