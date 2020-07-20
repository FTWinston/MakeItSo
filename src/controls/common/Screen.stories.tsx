import React from 'react';
import { Screen } from './Screen';
import { action } from '@storybook/addon-actions';
import { Theme } from '../../style/theme';

export default { title: 'Common/Screen' };

export const unpadded = () => (
    <Theme>
        <Screen padded={false}>blah</Screen>
    </Theme>
);

export const padded = () => <Screen padded={true}>blah</Screen>;
