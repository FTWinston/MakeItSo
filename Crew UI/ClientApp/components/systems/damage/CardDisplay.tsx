import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DamageCard } from "~/store/Damage";

interface CardDisplayProps {
    text: TextLocalisation;
    card: DamageCard;
    clicked: () => void;
}

export class CardDisplay extends React.Component<CardDisplayProps, {}> {
    public render() {
        return (
        <div className="damageCard" onClick={() => this.props.clicked()}>
            ...
        </div>
        );
    }
}