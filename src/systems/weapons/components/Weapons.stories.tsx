import React from 'react';
import { Theme } from '../../../common/theme';
import { Weapons } from './Weapons';
import { StoryGameProvider } from '../../../common/components/StoryGameProvider';
import { System } from '../../../common/data/System';

export default { title: 'Weapons' };

const WithState = () => {
    return (
        <Theme>
            <StoryGameProvider initialSystem={System.Weapons}>
                <Weapons />
            </StoryGameProvider>
        </Theme>
    );
};

export const example = () => <WithState />;
