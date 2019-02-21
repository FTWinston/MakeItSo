import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DiceComboType } from './store';
import './ComboDisplay.scss';

interface IProps {
    text: TextLocalisation;
    currentScore: number;
    combo: DiceComboType;
    health: number;
    select: () => void;
}

export class ComboDisplay extends React.PureComponent<IProps, {}> {
    public render() {
        let classes = 'damageCombo';
        let style;

        if (this.props.currentScore <= 0) {
            classes += ' damageCombo--zeroScore';
        }
        else {
            const maxHealth = 100;

            const scoreFraction = this.props.currentScore + this.props.health >= maxHealth
                ? 1 // if healing to full, that's always as good as you can do
                : this.props.currentScore / this.getMaxComboValue(this.props.combo)

            if (scoreFraction >= 1) {
                classes += ' damageCombo--fullScore';
            }
            else {
                const greenHex = Math.round(160 * scoreFraction).toString(16);
                style = { backgroundColor: `#00${greenHex}00` };
            }
        }

        const healIndication = this.props.currentScore <= 0
            ? undefined
            : <div className="damageCombo__heal">+{this.props.currentScore}%</div>

        return <div className={classes} style={style} onClick={() => this.props.select()}>
            <div className="damageCombo__name">
                {this.getComboName(this.props.combo)}
            </div>
            <div className="damageCombo__desc">
                {this.getComboDescription(this.props.combo)}
            </div>
            {healIndication}
        </div>
    }
    
    private getComboName(combo: DiceComboType) {
        switch (combo) {
            case DiceComboType.Aces:
                return this.props.text.systems.damage.comboNames.aces;
            case DiceComboType.Twos:
                return this.props.text.systems.damage.comboNames.twos;
            case DiceComboType.Threes:
                return this.props.text.systems.damage.comboNames.threes;
            case DiceComboType.Fours:
                return this.props.text.systems.damage.comboNames.fours;
            case DiceComboType.Fives:
                return this.props.text.systems.damage.comboNames.fives;
            case DiceComboType.Sixes:
                return this.props.text.systems.damage.comboNames.sixes;
            case DiceComboType.ThreeOfAKind:
                return this.props.text.systems.damage.comboNames.threeOfAKind;
            case DiceComboType.FourOfAKind:
                return this.props.text.systems.damage.comboNames.fourOfAKind;
            case DiceComboType.FullHouse:
                return this.props.text.systems.damage.comboNames.fullHouse;
            case DiceComboType.SmallStraight:
                return this.props.text.systems.damage.comboNames.smallStraight;
            case DiceComboType.LargeStraight:
                return this.props.text.systems.damage.comboNames.largeStraight;
            case DiceComboType.Yahtzee:
                return this.props.text.systems.damage.comboNames.yahtzee;
            case DiceComboType.Chance:
                return this.props.text.systems.damage.comboNames.chance;
            default:
                return undefined;
        }
    }

    private getComboDescription(combo: DiceComboType) {
        switch (combo) {
            case DiceComboType.Aces:
                return this.props.text.systems.damage.comboDescriptions.aces;
            case DiceComboType.Twos:
                return this.props.text.systems.damage.comboDescriptions.twos;
            case DiceComboType.Threes:
                return this.props.text.systems.damage.comboDescriptions.threes;
            case DiceComboType.Fours:
                return this.props.text.systems.damage.comboDescriptions.fours;
            case DiceComboType.Fives:
                return this.props.text.systems.damage.comboDescriptions.fives;
            case DiceComboType.Sixes:
                return this.props.text.systems.damage.comboDescriptions.sixes;
            case DiceComboType.ThreeOfAKind:
                return this.props.text.systems.damage.comboDescriptions.threeOfAKind;
            case DiceComboType.FourOfAKind:
                return this.props.text.systems.damage.comboDescriptions.fourOfAKind;
            case DiceComboType.FullHouse:
                return this.props.text.systems.damage.comboDescriptions.fullHouse;
            case DiceComboType.SmallStraight:
                return this.props.text.systems.damage.comboDescriptions.smallStraight;
            case DiceComboType.LargeStraight:
                return this.props.text.systems.damage.comboDescriptions.largeStraight;
            case DiceComboType.Yahtzee:
                return this.props.text.systems.damage.comboDescriptions.yahtzee;
            case DiceComboType.Chance:
                return this.props.text.systems.damage.comboDescriptions.chance;
            default:
                return undefined;
        }
    }

    private getMaxComboValue(combo: DiceComboType) {
        switch (combo) {
            case DiceComboType.Aces:
                return 5;
            case DiceComboType.Twos:
                return 10;
            case DiceComboType.Threes:
                return 15;
            case DiceComboType.Fours:
                return 20;
            case DiceComboType.Fives:
                return 25;
            case DiceComboType.Sixes:
            case DiceComboType.ThreeOfAKind:
            case DiceComboType.FourOfAKind:
            case DiceComboType.Chance:
                return 30;
            case DiceComboType.FullHouse:
                return 25;
            case DiceComboType.SmallStraight:
                return 30;
            case DiceComboType.LargeStraight:
                return 40;
            case DiceComboType.Yahtzee:
                return 50;
            default:
                return 0;
        }
    }
}