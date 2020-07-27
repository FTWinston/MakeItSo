import React from 'react';
import { ShipSystem } from './ShipSystem';
import { Theme } from '../../style/theme';
import { StoryGameProvider } from '../StoryGameProvider';

export default { title: 'Common/Generic/Ship System' };

export const example  = () => (
    <Theme>
        <StoryGameProvider>
            <ShipSystem>blah</ShipSystem>
        </StoryGameProvider>
    </Theme>
);
