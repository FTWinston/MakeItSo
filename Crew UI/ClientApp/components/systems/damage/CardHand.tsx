import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { CardDisplay } from '~/components/systems/damage/CardDisplay';
import { DamageCard } from '~/store/Damage';
import './CardHand.scss';

interface CardHandProps {
    text: TextLocalisation;
    cards: DamageCard[];
    selectedHandPos?: number;
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
            selected={index===this.props.selectedHandPos}
            clicked={() => this.props.cardSelected(index)}
            text={this.props.text}
        />;
    }
}