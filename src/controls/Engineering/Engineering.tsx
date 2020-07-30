import React, { useContext } from 'react';
import { ShipSystem } from '../common/ShipSystem';
import { GameContext } from '../GameProvider';
import { SystemList } from './SystemList';
import { CardHand } from './CardHand';

export const Engineering: React.FC = props => {
    const gameState = useContext(GameContext);

    return (
        <ShipSystem>
            TABS for draft vs system list

            Hand should be always visible

            <SystemList
                powerLevels={gameState.powerLevels}
                systemOrder={gameState.power.systemOrder}
                positiveEffects={gameState.power.positiveEffects}
                negativeEffects={gameState.power.negativeEffects}
            />
            
            <CardHand
                cards={gameState.power.hand}
            />
        </ShipSystem>
    )
}