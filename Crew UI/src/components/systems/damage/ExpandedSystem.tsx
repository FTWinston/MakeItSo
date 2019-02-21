import * as React from 'react';
import { TextLocalisation, Hotkey } from '~/functionality';
import { DiceComboType } from './store';
import { Dice } from './Dice';
import { PushButton, ButtonColor } from '~/components/general';
import { ComboDisplay } from './ComboDisplay';
import './ExpandedSystem.scss';

interface IProps {
    text: TextLocalisation;
    systemName: string;
    powered: boolean;
    availableCombos: DiceComboType[];
    health: number;

    dice: [number, number, number, number, number];
    lockedDice: [boolean, boolean, boolean, boolean, boolean];
    fixedDice: [boolean, boolean, boolean, boolean, boolean];
    numReRolls: number;
    
    rollDice: () => void;
    toggleDice: (index: number) => void;
    selectCombo: (index: number) => void;
}

export class ExpandedSystem extends React.PureComponent<IProps, {}> {
    public render() {
        const canLockAny = this.props.dice[0] !== 0;
        const dice = this.props.dice.map((d, i) => {
            let canLock: boolean;
            let locked: boolean;

            if (this.props.fixedDice[i]) {
                canLock = false;
                locked = true;
            }
            else {
                canLock = canLockAny;
                locked = this.props.lockedDice[i]
            }

            return <Dice
                key={i}
                value={d}
                canToggle={canLock}
                locked={locked}
                toggle={() => this.props.toggleDice(i)}
                hotkey={(i + 1).toString() as Hotkey}
            />
        });

        const combos = this.props.availableCombos.map((c, i) => {
            const select = () => this.props.selectCombo(i);
            
            return <ComboDisplay
                key={i}
                health={this.props.health}
                text={this.props.text}
                combo={c}
                currentScore={this.getDiceScore(c)}
                select={select}
            />
        });

        const rollText = `${this.props.text.systems.damage.roll} (${this.props.numReRolls})`;

        const disableRoll = this.props.numReRolls === 0 || this.props.lockedDice.every(b => b);
        const roll = () => this.props.rollDice();

        // TODO: show health & power on/off

        return <div className="expandedDamage damageControl__expanded">
            <div className="expandedDamage__name">
                {this.props.systemName}
            </div>
            <div className="expandedDamage__comboList">
                {combos}
            </div>
            <div className="expandedDamage__diceList">
                {dice}
            </div>
            <div className="expandedDamage__diceActions">
                <PushButton
                    disabled={disableRoll}
                    color={ButtonColor.Primary}
                    text={rollText}
                    clicked={roll}
                    hotkey="space"
                />
            </div>
        </div>
    }

    private getDiceScore(combo: DiceComboType) {
        if (this.props.dice[0] === 0) {
            return 0;
        }

        switch (combo) {
            case DiceComboType.Aces:
                return this.props.dice
                    .filter(d => d === 1)
                    .reduce((tot, val) => tot + val, 0);

            case DiceComboType.Twos:
                return this.props.dice
                    .filter(d => d === 2)
                    .reduce((tot, val) => tot + val, 0);

            case DiceComboType.Threes:
                return this.props.dice
                    .filter(d => d === 3)
                    .reduce((tot, val) => tot + val, 0);

            case DiceComboType.Fours:
                return this.props.dice
                    .filter(d => d === 4)
                    .reduce((tot, val) => tot + val, 0);

            case DiceComboType.Fives:
                return this.props.dice
                    .filter(d => d === 5)
                    .reduce((tot, val) => tot + val, 0);

            case DiceComboType.Sixes:
                return this.props.dice
                    .filter(d => d === 6)
                    .reduce((tot, val) => tot + val, 0);

            case DiceComboType.ThreeOfAKind: {
                if (this.props.dice.filter(d => d === 1).length < 3
                    && this.props.dice.filter(d => d === 2).length < 3
                    && this.props.dice.filter(d => d === 3).length < 3
                    && this.props.dice.filter(d => d === 4).length < 3
                    && this.props.dice.filter(d => d === 5).length < 3
                    && this.props.dice.filter(d => d === 6).length < 3)
                    return 0;
                    
                return this.props.dice
                    .reduce((tot, val) => tot + val, 0);
            }
            case DiceComboType.FourOfAKind: {
                if (this.props.dice.filter(d => d === 1).length < 4
                    && this.props.dice.filter(d => d === 2).length < 4
                    && this.props.dice.filter(d => d === 3).length < 4
                    && this.props.dice.filter(d => d === 4).length < 4
                    && this.props.dice.filter(d => d === 5).length < 4
                    && this.props.dice.filter(d => d === 6).length < 4)
                    return 0;
                    
                return this.props.dice
                    .reduce((tot, val) => tot + val, 0);
            }
            case DiceComboType.FullHouse: {
                const sorted = this.props.dice.slice().sort();
                if (sorted[0] === sorted[4]) {
                    return 0;
                }

                if (sorted[1] !== sorted[0] || sorted[3] !== sorted[4] ) {
                    return 0;
                }

                if (sorted[2] !== sorted[1] && sorted[2] !== sorted[3]) {
                    return 0;
                }

                return 25;
            }
            case DiceComboType.SmallStraight: {
                const sorted = this.props.dice.slice().sort();
                let prevVal = sorted[0];
                let sequenceLength = 1;

                for (let i = 1; i < 4; i++) {
                    if (sorted[i] !== prevVal + 1) {
                        break;
                    }

                    prevVal ++;
                    sequenceLength ++;
                }

                if (sequenceLength >= 4) {
                    return 30;
                }


                prevVal = sorted[0];
                sequenceLength = 1;

                for (let i = 2; i < 5; i++) {
                    if (sorted[i] !== prevVal + 1) {
                        break;
                    }

                    prevVal ++;
                    sequenceLength ++;
                }

                if (sequenceLength >= 4) {
                    return 30;
                }

                return 0;
            }
            case DiceComboType.LargeStraight: {
                const sorted = this.props.dice.slice().sort();
                let prevVal = sorted[0];

                for (let i = 1; i < sorted.length; i++) {
                    if (sorted[i] !== prevVal) {
                        return 0;
                    }

                    prevVal ++;
                }

                return 40;
            }
            case DiceComboType.Yahtzee: {
                const first = this.props.dice[0];
                for (let dice of this.props.dice) {
                    if (dice !== first) {
                        return 0;
                    }
                }

                return 50;
            }
            case DiceComboType.Chance:
                return this.props.dice
                    .reduce((tot, val) => tot + val, 0);
            
            default:
                return 0;
        }
    }
}