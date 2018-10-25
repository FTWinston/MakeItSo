import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { CardDisplay } from './CardDisplay';
import { PowerCard } from './store';
import './CardHand.scss';

interface CardHandProps {
    text: TextLocalisation;
    cards: PowerCard[];
    selectedHandPos?: number;
    cardSelected: (cardPos: number) => void;
}

export class CardHand extends React.PureComponent<CardHandProps, {}> {
    public render() {
        return (
        <div className="powerCardHand">
            {this.props.cards.map((card, index) => this.renderCard(card, index))}
        </div>
        );
    }

    private renderCard(card: PowerCard, index: number) {
        return <CardDisplay
            card={card}
            key={index}
            selected={index===this.props.selectedHandPos}
            clicked={() => this.props.cardSelected(index)}
            text={this.props.text}
        />;
    }
}