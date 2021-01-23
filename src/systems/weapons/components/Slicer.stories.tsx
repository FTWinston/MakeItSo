import { action } from '@storybook/addon-actions';
import React from 'react';
import { Theme } from '../../../common/theme';
import { Slicer } from './Slicer';

export default { title: 'Weapons/Slicer' };

export const square = () => (
    <Theme>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh'
        }}>
            <Slicer
                slice={action("slice")}
                requiredAccuracy={0.9}
                polygon={[
                    { x: 1, y: 1 },
                    { x: 5, y: 1 },
                    { x: 5, y: 5 },
                    { x: 1, y: 5 }
                ]}
            />
        </div>
    </Theme>
);
