import { ShipType } from 'src/types/ShipType';
import { HelmState } from '../types/HelmState';
import { HelmConfiguration } from '../types/HelmConfiguration';
import { Random } from 'src/utils/random';

export function getInitialHelmState(shipType: ShipType, configuration: HelmConfiguration, random: Random): HelmState {
    // TODO: use ship type for speed and rotation limits.

    let nextTileId = 1;
    
    const maneuverDrawPile = configuration.activeCards
        .map(options => ({
            id: nextTileId++,
            options,
        }));

    random.shuffle(maneuverDrawPile);

    const maneuverChoice = maneuverDrawPile.pop()!;

    return {
        configuration,
        destination: null,
        maneuvers: [],
        replaceMotion: true,
        rotationalSpeed: 0.75,
        speedWhileRotating: 0.2,
        speed: 1,
        nextTileId,
        maneuverChoice,
        maneuverDrawPile,
        manueverDiscardPile: []
    };
}