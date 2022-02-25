import { styled } from '@mui/material/styles';
import { ShipSystem } from 'src/types/ShipSystem';
import { TileDisplayInfo } from '../types/TileInfo';
import { SystemTile } from './SystemTile';

interface Props {
    systems: TileDisplayInfo[];
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
    const targets = props.allowedTargets;
    
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
                        name={tile.name}
                        health={tile.health}
                        effects={tile.effects}
                        onClick={() => props.tileSelected(tile.system)}
                        onMouseUp={isActiveTarget ? () => props.tileSelected(tile.system) : undefined}
                        onDragEnd={isActiveTarget ? () => props.tileSelected(tile.system) : undefined}
                    />
                );
            })}
        </Root>
    );
};