import React, { useState } from 'react';
import { Screen } from './Screen';
import { SystemHeader } from './SystemHeader';
import { SystemMenu } from '../SystemMenu/SystemMenu';

interface Props {
    className?: string;
}

export const ShipSystem: React.FC<Props> = props => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Screen className={props.className} padded={false}>
            <SystemHeader
                showMenu={() => setMenuOpen(true)}
            />
            
            <SystemMenu
                isOpen={menuOpen}
                close={() => setMenuOpen(false)}
            />

            {props.children}
        </Screen>
    )
}