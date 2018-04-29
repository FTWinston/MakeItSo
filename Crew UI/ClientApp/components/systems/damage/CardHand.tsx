import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DamageCard } from "~/store/Damage";

interface CardHandProps {
    text: TextLocalisation;
    cards: DamageCard[];
}

export class CardHand extends React.Component<CardHandProps, {}> {
    public render() {
        return <div>
        </div>;
        // TODO: implement
    }
}