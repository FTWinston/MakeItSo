import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { CardDisplay } from "./CardDisplay";

interface CardSelectionProps {
    text: TextLocalisation;
    cardIDs: number[];
    queueSize: number;
    cardSelected: (number: number) => void;
}

export class CardSelection extends React.Component<CardSelectionProps, {}> {
    public render() {
        let queueSize = this.props.queueSize <= 0 ? undefined : <div className="damageCardChoice__queueSize">{this.props.queueSize}</div>;

        return (
        <div className="damageCardChoice">
            {this.props.cardIDs.map((card, index) => this.renderCard(card, index))}
            {queueSize}
        </div>
        );
    }

    private renderCard(cardID: number, index: number) {
        return <CardDisplay
            cardID={cardID}
            key={index}
            clicked={() => this.props.cardSelected(index)}
            text={this.props.text}
        />;
    }
}