import React, { useEffect, useState } from 'react';
import { Theme } from '../../../common/theme';
import { SystemHealth } from './SystemHealth';

export default { title: 'Engineering/Components/System Health' };

const WithState = () => {
    const [value, setValue] = useState(100);

    useEffect(
        () => {
            const interval = setInterval(
                () => setValue(Math.round(Math.random() * 100)),
                1000
            );

            return () => clearInterval(interval);
        },
        []
    );

    return (
        <Theme>
            <SystemHealth value={value} />    
        </Theme>
    );
}

export const example = () => <WithState />