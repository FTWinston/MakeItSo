import { styled } from '@mui/material/styles';
import { ShipSystem } from 'src/types/ShipSystem';
import { TileDisplayInfo } from '../types/TileInfo';
import { SystemTile } from './SystemTile';

interface Props {
    systems: TileDisplayInfo[];
    allowedTargets: ShipSystem | null;
}

const Root = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: '0.5em 0.25em',
    gap: '0.25em',
    placeItems: 'center',
});

export const SystemTiles: React.FC<Props> = props => {
    return (
        <Root>
            {props.systems.map(tile => (
                <SystemTile
                    key={tile.system}
                    validTarget={props.allowedTargets === null ? undefined : (props.allowedTargets & tile.system) !== 0}
                    system={tile.system}
                    name={tile.name}
                    health={tile.health}
                    effects={tile.effects}
                />
            ))}
        </Root>
    );
};