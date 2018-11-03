import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation, Hotkey } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { DamageState, actionCreators, DamageSystemType, DiceComboType } from './store';
import './DamageControl.scss';
import { DamageSystem } from './DamageSystem';
import { Dice } from './Dice';
import { PushButton, ButtonColor } from '~/components/general';
import { connection } from '~/index';

interface DamageControlProps extends DamageState {
    text: TextLocalisation;
    toggleDice: (index: number) => void;
    unlockDice: () => void;
}

class DamageControl extends ShipSystemComponent<DamageControlProps, {}> {
    name() { return 'power'; }

    protected getHelpText() {
        return this.props.text.systemHelp.power;
    }

    protected getOptionLabels() {
        return this.props.text.systems.power;
    }

    public render() {
        const systems = this.props.systems.map((s, i) => {
            const select = () => this.selectSystem(s.type);

            return <DamageSystem
                key={i}
                text={this.props.text}
                system={s.type}
                health={s.health}
                combo={s.combo}
                healAmount={this.getDiceScore(s.combo)}
                select={select}
            />
        });

        const canLock = this.props.dice[0] !== 0;
        const dice = this.props.dice.map((d, i) =>
            <Dice
                key={i}
                value={d}
                canLock={canLock}
                locked={this.props.lockedDice[i]}
                toggle={() => this.props.toggleDice(i)}
                hotkey={(i + 1).toString() as Hotkey}
            />
        );

        const rollText = `${this.props.text.systems.damage.roll} (${this.props.numReRolls})`;

        const roll = () => this.rollDice();
        const unlock = () => this.props.unlockDice();

        return <div className="system damageControl">
            <div className="damageControl__systemList">
                {systems}
            </div>
            <div className="damageControl__diceList">
                {dice}
            </div>
            <div className="damageControl__diceActions">
                <PushButton
                    disabled={this.props.numReRolls === 0}
                    color={ButtonColor.Primary}
                    text={rollText}
                    clicked={roll}
                    hotkey="space"
                />

                <PushButton
                    disabled={this.props.dice[0] === 0}
                    color={ButtonColor.Tertiary}
                    text={this.props.text.systems.damage.discard}
                    command="dmg_discard"
                    clicked={unlock}
                    hotkey="D"
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
                const sorted = this.props.dice.sort();
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
                const sorted = this.props.dice.sort();
                let prevVal = sorted[0];
                let sequenceLength = 1;

                for (let i = 1; i < 4; i++) {
                    if (sorted[i] === prevVal) {
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
                    if (sorted[i] === prevVal) {
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
                const sorted = this.props.dice.sort();
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

    private rollDice() {
        let msg = 'dmg_roll';

        for (let lock of this.props.lockedDice) {
            msg += lock ? ' 0' : ' 1';
        }

        connection.send(msg);
    }
    
    private selectSystem(type: DamageSystemType) {
        connection.send(`dmg_system ${type}`);
        this.props.unlockDice();
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => DamageControlProps = (state) => {
    return {
        text: state.user.text,
        toggleDice: actionCreators.toggleDice,
        unlockDice: actionCreators.unlockDice,
        ...state.damage,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
    null,
    { withRef: true },
)(DamageControl);