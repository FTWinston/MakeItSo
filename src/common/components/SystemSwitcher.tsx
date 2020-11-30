import React, { useContext } from 'react';
import { GameContext } from './GameProvider';
import { System } from '../data/System';
import { Helm } from '../../systems/helm/components/Helm';
import { Engineering } from '../../systems/engineering/components/Engineering';

export const SystemSwitcher: React.FC = () => {
    const [gameState] = useContext(GameContext);
    
    switch (gameState.currentSystem) {
        case System.Helm:
            return <Helm />
        case System.Engineering:
            return <Engineering />
        default:
            return <div />
    }
}
