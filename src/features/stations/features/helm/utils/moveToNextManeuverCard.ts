import { Ship } from 'src/classes/Ship';
import { drawCard } from 'src/utils/drawCard';

export function moveToNextManeuverCard(state: Ship) {
    // Discard current choice, and get a new choice. Shuffle if needed.
    const [newChoice, didShuffle] = drawCard(state.helm.maneuverDrawPile, state.helm.manueverDiscardPile, state.helm.maneuverChoice);
    state.helm.maneuverChoice = newChoice;

    if (didShuffle) {
        // TODO: indicate shuffle?
    }
}
