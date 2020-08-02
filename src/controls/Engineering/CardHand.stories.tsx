import React from 'react';
import { Theme } from '../../style/theme';
import { CardHand } from './CardHand';
import { uncommonCard, commonCard, rareCard, epicCard } from './PowerCard.examples';

export default { title: 'Engineering/Card Hand' };

export const eight = () => (
    <Theme>
        <CardHand
            cards={[commonCard(), commonCard(), commonCard(), uncommonCard(), commonCard(), rareCard(), commonCard(), epicCard()]}
        />
    </Theme>
);

export const seven = () => (
    <Theme>
        <CardHand
            cards={[commonCard(), commonCard(), uncommonCard(), commonCard(), rareCard(), commonCard(), epicCard()]}
        />
    </Theme>
);

export const six = () => (
    <Theme>
        <CardHand
            cards={[commonCard(), uncommonCard(), commonCard(), rareCard(), commonCard(), epicCard()]}
        />
    </Theme>
);

export const five = () => (
    <Theme>
        <CardHand
            cards={[uncommonCard(), commonCard(), rareCard(), commonCard(), epicCard()]}
        />
    </Theme>
);

export const four = () => (
    <Theme>
        <CardHand
            cards={[commonCard(), rareCard(), commonCard(), epicCard()]}
        />
    </Theme>
);

export const three = () => (
    <Theme>
        <CardHand
            cards={[uncommonCard(), commonCard(), commonCard()]}
        />
    </Theme>
);

export const two = () => (
    <Theme>
        <CardHand
            cards={[commonCard(), commonCard()]}
        />
    </Theme>
);

export const one = () => (
    <Theme>
        <CardHand
            cards={[uncommonCard()]}
        />
    </Theme>
);

export const zero = () => (
    <Theme>
        <CardHand
            cards={[]}
        />
    </Theme>
);
