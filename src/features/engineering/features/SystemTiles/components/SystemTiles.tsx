import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { determineRepairAmount, determineRestoreAmount } from 'src/features/engineering/utils/systemActions';
import { ShipSystem } from 'src/types/ShipSystem';
import { EngineeringCardRarity } from '../../Cards/types/EngineeringCard';
import { ClientSystemInfo } from '../types/TileInfo';
import { SystemLog } from './SystemLog';
import { SystemTile } from './SystemTile';

interface Props {
    systems: ClientSystemInfo[];
    allowedTargets: ShipSystem | null;
    possibleRepair: EngineeringCardRarity | null;
    tileSelected: (system: ShipSystem) => void;
}

const Root = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: '0.5em 0.25em 0 0.25em',
    gap: '0.25em',
    placeItems: 'center',
});

export const SystemTiles: React.FC<Props> = props => {
    const [showingDrawer, showDrawer] = useState<ShipSystem>();
    const { allowedTargets, possibleRepair } = props;
    const selectingTarget = allowedTargets !== null;
    const eventLog = props.systems.find(system => system.system === showingDrawer)?.eventLog ?? [];

    return (
        <Root>
            {props.systems.map(tile => {
                const isActiveTarget = selectingTarget && (allowedTargets & tile.system) !== 0;
                const repairAmount = possibleRepair === null
                    ? 0
                    : tile.health === 0
                        ? determineRestoreAmount(possibleRepair)
                        : determineRepairAmount(tile.health, possibleRepair);

                return (
                    <SystemTile
                        key={tile.system}
                        validTarget={selectingTarget ? isActiveTarget : undefined}
                        system={tile.system}
                        health={tile.health}
                        restoration={tile.restoration}
                        healAmount={repairAmount}
                        power={tile.power}
                        effects={tile.effects}
                        onClick={() => {
                            if (isActiveTarget) {
                                props.tileSelected?.(tile.system);
                            } else if (!selectingTarget) {
                                showDrawer(tile.system);
                            }
                        }}
                        onDragEnd={isActiveTarget ? () => props.tileSelected(tile.system) : undefined}
                    />
                );
            })}
            <Drawer
                anchor="right"
                open={showingDrawer !== undefined}
                onClose={() => showDrawer(undefined)}
            >
                <SystemLog system={showingDrawer ?? ShipSystem.Hull} events={eventLog} />
            </Drawer>
        </Root>
    );
};