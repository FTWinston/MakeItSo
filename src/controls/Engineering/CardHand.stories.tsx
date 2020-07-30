import React from 'react';
import { Theme } from '../../style/theme';
import { CardHand } from './CardHand';
import { uncommonCard, commonCard, rareCard, epicCard } from './PowerCard.examples';

export default { title: 'Engineering/Card Hand' };

export const example = () => (
    <Theme>
        <CardHand
            cards={[uncommonCard, commonCard, rareCard, commonCard, epicCard]}
        />
    </Theme>
);

export const single = () => (
    <Theme>
        <CardHand
            cards={[uncommonCard]}
        />
    </Theme>
);

export const empty = () => (
    <Theme>
        <CardHand
            cards={[]}
        />
    </Theme>
);
