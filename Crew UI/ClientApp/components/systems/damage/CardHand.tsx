import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { CardDisplay } from "~/components/systems/damage/CardDisplay";

interface CardHandProps {
    text: TextLocalisation;
    cardIDs: number[];
    cardSelected: (cardPos: number) => void;
}

export class CardHand extends React.Component<CardHandProps, {}> {
    public render() {
        return (
        <div className="damageCardHand">
            {this.props.cardIDs.map((cardID, index) => this.renderCard(cardID, index))}
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