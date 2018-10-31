import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import './DamageSystem.scss';
import { DamageSystemType, DiceComboType } from './store';

interface IProps {
    text: TextLocalisation;
    system: DamageSystemType;
    health: number;
    combo: DiceComboType;
    healAmount: number;
    select: () => void;
}

export class DamageSystem extends React.PureComponent<IProps> {
    public render() {
        const clicked = this.props.healAmount > 0
            ? () => this.props.select()
            : undefined;

        const healIndication = this.props.healAmount === 0
            ? undefined
            : <div className="damageSystem__heal">+{this.props.healAmount}%</div>

        return <div className={this.determineClasses()} onClick={clicked}>
            <h2 className="damageSystem__name">{this.getSystemName()}</h2>
            <div className="damageSystem__comboName">{this.getComboName()}</div>
            <div className="damageSystem__comboDesc">{this.getComboDescription()}</div>
            <div className="damageSystem__health">{this.props.health}%</div>
            {healIndication}
        </div>
    }

    private determineClasses() {
        let classes = 'damageSystem';

        if (this.props.combo === DiceComboType.None) {
            classes += ' damageSystem--noCombo';
        }

        if (this.props.healAmount > 0) {
            classes += ' damageSystem--applicable';
        }

        if (this.props.health < 1) {
            classes += ' damageSystem--destroyed';
        }
        else if (this.props.health < 20) {
            classes += ' damageSystem--severelyDamaged';
        }
        else if (this.props.health < 40) {
            classes += ' damageSystem--badlyDamaged';
        }
        else if (this.props.health < 70) {
            classes += ' damageSystem--damaged';
        }
        else if (this.props.health >= 100) {
            classes += ' damageSystem--perfect';
        }

        return classes;
    }

    private getSystemName() {
        switch (this.props.system) {
            case DamageSystemType.Power:
                return this.props.text.systemNames.power;
            case DamageSystemType.Helm:
                return this.props.text.systemNames.helm;
            case DamageSystemType.Warp:
                return this.props.text.systemNames.warp;
            case DamageSystemType.Weapons:
                return this.props.text.systemNames.weapons;
            case DamageSystemType.Sensors:
                return this.props.text.systemNames.sensors;
            case DamageSystemType.Shields:
                return this.props.text.systemNames.shields;
            case DamageSystemType.Comms:
                return this.props.text.systemNames.comms;
            default:
                return undefined;
        }
    }

    private getComboName() {
        switch (this.props.combo) {
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
            default:
                return undefined;
        }
    }

    private getComboDescription() {
        switch (this.props.combo) {
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
            default:
                return undefined;
        }
    }
}