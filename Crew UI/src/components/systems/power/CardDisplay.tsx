import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { PowerCardRarity, getPowerCardInfo, PowerCard } from './store';
import './CardDisplay.scss';


interface CardDisplayProps {
    text: TextLocalisation;
    card: PowerCard;
    selected: boolean;
    clicked?: () => void;
}

export class CardDisplay extends React.Component<CardDisplayProps, {}> {
    public render() {
        let card = getPowerCardInfo(this.props.card, this.props.text);

        if (card === null) {
            card = {
                name: '???',
                desc: `Card ID ${this.props.card} not recognised`,
                rarity: PowerCardRarity.Common,
            };
        }

        let cardClasses = 'powerCard', wrapperClasses = 'powerCardWrapper';
        switch (card.rarity) {
            case PowerCardRarity.Common:
                cardClasses += ' powerCard--common'; break;
            case PowerCardRarity.Rare:
                cardClasses += ' powerCard--rare'; break;
            case PowerCardRarity.Epic:
                cardClasses += ' powerCard--epic'; break;
        }

        if (this.props.selected) {
            cardClasses += ' powerCard--selected';
            wrapperClasses += ' powerCardWrapper--selected';
        }
        
        if (this.props.clicked === undefined) {
            cardClasses += ' powerCard--cantSelect';
        }

        return (
        <div className={wrapperClasses}>
            <div className={cardClasses} onClick={this.props.clicked}>
                <div className="powerCard__name">{card.name}</div>
                <div className="powerCard__rarity" />
                <div className="powerCard__desc">{card.desc}</div>
            </div>
        </div>
        );
    }
}