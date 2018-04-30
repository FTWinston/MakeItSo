import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { CardDisplay } from "./CardDisplay";
import './CardSelection.scss';

interface CardSelectionProps {
    text: TextLocalisation;
    cardIDs: number[];
    queueSize: number;
    canSelect: boolean;
    cardSelected: (number: number) => void;
}

export class CardSelection extends React.Component<CardSelectionProps, {}> {
    public render() {
        let queueSize = this.props.queueSize <= 0 ? undefined : <div className="damageCardChoice__queueSize">{this.props.queueSize}</div>;

        return (
        <div className="damageCardChoice">
            {queueSize}
            {this.props.cardIDs.map((card, index) => this.renderCard(card, index))}
        </div>
        );
    }

    private renderCard(cardID: number, index: number) {
        return <CardDisplay
            cardID={cardID}
            selected={false}
            key={index}
            clicked={this.props.canSelect ? () => this.props.cardSelected(index) : undefined}
            text={this.props.text}
        />;
    }
}