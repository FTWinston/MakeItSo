import { styled } from '@mui/material/styles';
import { TileDisplayInfo } from '../types/TileInfo';
import { SystemTile } from './SystemTile';

interface Props {
    systems: TileDisplayInfo[];
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
                    system={tile.system}
                    name={tile.name}
                    health={tile.health}
                    effects={tile.effects}
                />
            ))}
        </Root>
    );
};