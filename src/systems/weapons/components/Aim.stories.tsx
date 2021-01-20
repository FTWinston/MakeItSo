import { action } from '@storybook/addon-actions';
import React from 'react';
import { Theme } from '../../../common/theme';
import { Aim } from './Aim';

export default { title: 'Weapons/Aim' };

export const square = () => (
    <Theme>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh'
        }}>
            <Aim
                fire={action("fire")}
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
