import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DamageCard } from "~/store/Damage";

interface CardSelectionProps {
    text: TextLocalisation;
    cards: DamageCard[];
    queueSize: number;
}

export class CardSelection extends React.Component<CardSelectionProps, {}> {
    public render() {
        return <div>
        </div>;
        // TODO: implement
    }
}