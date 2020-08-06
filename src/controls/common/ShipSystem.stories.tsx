import React from 'react';
import { ShipSystem } from './ShipSystem';
import { Theme } from '../../style/theme';
import { StoryGameProvider } from '../StoryGameProvider';
import { System } from '../../data/System';

export default { title: 'Common/Generic/Ship System' };

export const example  = () => (
    <Theme>
        <StoryGameProvider initialSystem={System.Helm}>
            <ShipSystem>blah</ShipSystem>
        </StoryGameProvider>
    </Theme>
);
