import React from 'react';
import { Screen } from './Screen';
import { action } from '@storybook/addon-actions';

export default { title: 'Common/Screen' };

export const unpadded = () => <Screen padded={false}>blah</Screen>;
export const padded = () => <Screen padded={true}>blah</Screen>;
