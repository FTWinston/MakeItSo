import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { PowerCardInfo, PowerCardRarity, getPowerCardInfo, PowerTargetingMode, PowerCard } from '~/store/Power';
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
                targetingMode: PowerTargetingMode.Untargetted,
            };
        }

        let cardClasses = 'damageCard', wrapperClasses = 'damageCardWrapper';
        switch (card.rarity) {
            case PowerCardRarity.Common:
                cardClasses += ' damageCard--common'; break;
            case PowerCardRarity.Rare:
                cardClasses += ' damageCard--rare'; break;
            case PowerCardRarity.Epic:
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