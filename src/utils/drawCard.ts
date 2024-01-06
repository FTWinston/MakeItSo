import { Random } from './random';

export function drawCard<T>(drawPile: T[], discardPile: T[], toDiscard?: T): [T, boolean] {
    if (toDiscard !== undefined) {
        discardPile.push(toDiscard);
    }

    const drawn = drawPile.pop();
    
    if (drawn !== undefined) {
        return [drawn, false];
    }

    if (discardPile.length === 0) {
        throw new Error('Got no cards, cannot draw');
    }

    // Draw pile is now empty, so shuffle the discard pile.
    // Actually shuffle a copy, to avoid generating too much patch difference.
    const copyOfDiscardPile = [...discardPile];
    new Random().shuffle(copyOfDiscardPile);

    // Move the discard pile's contents into the draw pile.
    discardPile.splice(0, discardPile.length);
    drawPile.splice(0, 0, ...copyOfDiscardPile);

    // And now draw a card. There WILL be cards.
    return [drawPile.pop()!, true];
}