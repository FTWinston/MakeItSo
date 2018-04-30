import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DamageCardInfo, DamageCardRarity, getDamageCardInfo } from '~/store/Damage';

interface CardDisplayProps {
    text: TextLocalisation;
    cardID: number;
    clicked: () => void;
}

export class CardDisplay extends React.Component<CardDisplayProps, {}> {
    public render() {
        let card = getDamageCardInfo(this.props.cardID, this.props.text);

        if (card === null) {
            card = {
                name: '???',
                desc: `Card ID ${this.props.cardID} not recognised`,
                rarity: DamageCardRarity.Common,
            };
        }

        let classes = 'damageCard';
        switch (card.rarity) {
            case DamageCardRarity.Common:
                classes += ' damageCard--common'; break;
            case DamageCardRarity.Rare:
                classes += ' damageCard--rare'; break;
            case DamageCardRarity.Epic:
                classes += ' damageCard--epic'; break;
        }
        
        return (
        <div className={classes} onClick={() => this.props.clicked()}>
            <div className="damageCard__name">{card.name}</div>
            <div className="damageCard__rarity" />
            <div className="damageCard__desc">{card.desc}</div>
        </div>
        );
    }
}