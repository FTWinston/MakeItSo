import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DamageCardInfo, DamageCardRarity, getDamageCardInfo, DamageTargetingMode, DamageCard } from '~/store/Damage';
import './CardDisplay.scss';

interface CardDisplayProps {
    text: TextLocalisation;
    card: DamageCard;
    selected: boolean;
    clicked?: () => void;
}

export class CardDisplay extends React.Component<CardDisplayProps, {}> {
    public render() {
        let card = getDamageCardInfo(this.props.card, this.props.text);

        if (card === null) {
            card = {
                name: '???',
                desc: `Card ID ${this.props.card} not recognised`,
                rarity: DamageCardRarity.Common,
                targetingMode: DamageTargetingMode.SingleCard,
            };
        }

        let cardClasses = 'damageCard', wrapperClasses = 'damageCardWrapper';
        switch (card.rarity) {
            case DamageCardRarity.Common:
                cardClasses += ' damageCard--common'; break;
            case DamageCardRarity.Rare:
                cardClasses += ' damageCard--rare'; break;
            case DamageCardRarity.Epic:
                cardClasses += ' damageCard--epic'; break;
        }

        if (this.props.selected) {
            cardClasses += ' damageCard--selected';
            wrapperClasses += ' damageCardWrapper--selected';
        }
        
        if (this.props.clicked === undefined) {
            cardClasses += ' damageCard--cantSelect';
        }

        return (
        <div className={wrapperClasses}>
            <div className={cardClasses} onClick={this.props.clicked}>
                <div className="damageCard__name">{card.name}</div>
                <div className="damageCard__rarity" />
                <div className="damageCard__desc">{card.desc}</div>
            </div>
        </div>
        );
    }
}