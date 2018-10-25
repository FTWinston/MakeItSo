import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { CardDisplay } from "./CardDisplay";
import './CardSelection.scss';
import { PowerCard } from "~/store/Power";

interface CardSelectionProps {
    text: TextLocalisation;
    cards: PowerCard[];
    queueSize: number;
    canSelect: boolean;
    cardSelected: (number: number) => void;
}

export class CardSelection extends React.PureComponent<CardSelectionProps, {}> {
    public render() {
        let queueSize = this.props.queueSize <= 0 ? undefined : <div className="damageCardChoice__queueSize">{this.props.queueSize}</div>;

        return (
        <div className="damageCardChoice">
            {queueSize}
            {this.props.cards.map((card, index) => this.renderCard(card, index))}
        </div>
        );
    }

    private renderCard(card: PowerCard, index: number) {
        return <CardDisplay
            card={card}
            selected={false}
            key={index}
            clicked={this.props.canSelect ? () => this.props.cardSelected(index) : undefined}
            text={this.props.text}
        />;
    }
}