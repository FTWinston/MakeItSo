import { ShipSystem } from 'src/types/ShipSystem';
import { EngineeringState } from '../types/EngineeringState';
import { ShipType } from 'src/types/ShipType';
import { EngineeringConfiguration } from '../types/EngineeringConfiguration';
import { Random } from 'src/utils/random';
import { createCard } from '../features/Cards';

export function getInitialEngineeringState(shipType: ShipType, configuration: EngineeringConfiguration, random: Random): EngineeringState {
    // TODO: use ship type for system order? Or is that configuration driven too?
    // TODO: use ship type for max hand size?

    let nextCardId = 1;
    
    const cards = configuration.activeCards
        .map(type => createCard(nextCardId++, type));

    random.shuffle(cards);

    const handCards = cards.splice(0, 3);

    // TODO: rework engineering to expect a rotating deck of cards, instead of generating random ones.
    // const choiceCards = ohNoThisIsntCurrentlySetUpForRotatingDeckOfCards;

    return {
        configuration,
        systemOrder: [ShipSystem.Hull, ShipSystem.Shields, ShipSystem.Sensors, ShipSystem.Weapons, ShipSystem.Engines, ShipSystem.Reactor],
        handCards,
        maxHandSize: 7,
        choiceCards: [],
        numChoices: 0,
        nextCardId,
        nextEffectId: 1,
    }
}