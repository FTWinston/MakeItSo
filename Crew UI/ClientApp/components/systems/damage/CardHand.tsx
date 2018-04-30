import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DamageCard } from "~/store/Damage";
import { CardDisplay } from "~/components/systems/damage/CardDisplay";

interface CardHandProps {
    text: TextLocalisation;
    cards: DamageCard[];
    cardSelected: (cardPos: number) => void;
}

export class CardHand extends React.Component<CardHandProps, {}> {
    public render() {
        return (
        <div className="damageCardHand">
            {this.props.cards.map((card, index) => this.renderCard(card, index))}
        </div>
        );
    }

    private renderCard(card: DamageCard, index: number) {
        return <CardDisplay
            card={card}
            key={index}
            clicked={() => this.props.cardSelected(index)}
            text={this.props.text}
        />;
    }
}