import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { CardDisplay } from './CardDisplay';
import { PowerCard } from './store';
import './CardSet.scss';

interface IProps {
    className?: string;
    text: TextLocalisation;
    cards: PowerCard[];
    selectedCardPos?: number;
    cardSelected?: (cardPos: number) => void;
}

export class CardSet extends React.PureComponent<IProps, {}> {
    public render() {
        let classes = 'powerCardSet';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        return (
        <div className={classes}>
            {this.props.cards.map((card, index) => this.renderCard(card, index))}
        </div>
        );
    }

    private renderCard(card: PowerCard, index: number) {
        const clicked = this.props.cardSelected === undefined
            ? undefined
            : () => this.props.cardSelected!(index);

        return <CardDisplay
            card={card}
            key={index}
            selected={index===this.props.selectedCardPos}
            clicked={clicked}
            text={this.props.text}
        />;
    }
}