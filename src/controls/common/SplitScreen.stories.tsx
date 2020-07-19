import React from 'react';
import { SplitScreen } from './SplitScreen';
import { action } from '@storybook/addon-actions';

export default { title: 'Common/Split Screen' };

const primary = () => 'blah';
const secondary = () => 'blah blah';

export const unpadded = () => <SplitScreen primary={primary} secondary={secondary} primaryPadded={false} secondaryPadded={false} />;
export const primaryPadded = () => <SplitScreen primary={primary} secondary={secondary} primaryPadded={true} secondaryPadded={false} />;
export const secondaryPadded = () => <SplitScreen primary={primary} secondary={secondary} primaryPadded={false} secondaryPadded={true} />;
export const bothPadded = () => <SplitScreen primary={primary} secondary={secondary} primaryPadded={true} secondaryPadded={true} />;