import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { ShipSystem } from 'src/types/ShipSystem';
import { ClientSystemInfo } from '../types/TileInfo';
import { SystemLog } from './SystemLog';
import { SystemRepair } from './SystemRepair';
import { SystemTile } from './SystemTile';

interface Props {
    systems: ClientSystemInfo[];
    allowedTargets: ShipSystem | null | undefined;
    tileSelected: (system: ShipSystem) => void;
}

const Root = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: '0.5em 0.25em',
    gap: '0.25em',
    placeItems: 'center',
});

export const SystemTiles: React.FC<Props> = props => {
    const [showingDrawer, showDrawer] = useState<ShipSystem>();
    const targets = props.allowedTargets;
    const selectingTargets = targets !== null;
    const drawerSystemInfo = props.systems.find(system => system.system === showingDrawer);

    const drawerContent = drawerSystemInfo === undefined || drawerSystemInfo.health === 0
        ? <SystemRepair system={showingDrawer ?? ShipSystem.Hull} />
        : <SystemLog system={showingDrawer ?? ShipSystem.Hull} events={drawerSystemInfo.eventLog} />;

    return (
        <Root>
            {props.systems.map(tile => {
                const isActiveTarget = (targets && (targets & tile.system) !== 0) ?? false;
                const isValidTarget = targets === null ? undefined : (targets === undefined ? true : isActiveTarget);

                return (
                    <SystemTile
                        key={tile.system}
                        validTarget={isValidTarget}
                        system={tile.system}
                        health={tile.health}
                        effects={tile.effects}
                        onClick={() => selectingTargets ? props.tileSelected(tile.system) : showDrawer(tile.system)}
                        onMouseUp={isActiveTarget ? () => props.tileSelected(tile.system) : undefined}
                        onDragEnd={isActiveTarget ? () => props.tileSelected(tile.system) : undefined}
                    />
                );
            })}
            <Drawer
                anchor="right"
                open={showingDrawer !== undefined}
                onClose={() => showDrawer(undefined)}
            >
                {drawerContent}
            </Drawer>
        </Root>
    );
};