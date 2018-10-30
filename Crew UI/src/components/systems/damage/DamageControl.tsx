import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { DamageState, actionCreators } from './store';
import './DamageControl.scss';
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
        const canLock = this.props.dice[0] !== 0;
        const dice = this.props.dice.map((d, i) =>
            <Dice
                key={i}
                value={d}
                canLock={canLock}
                locked={this.props.lockedDice[i]}
                toggle={() => this.props.toggleDice(i)}
            />
        )

        const rollText = `${this.props.text.systems.damage.roll} (${this.props.numReRolls})`;

        const roll = () => this.rollDice();
        const unlock = () => this.props.unlockDice();

        return <div className="system damageControl">
            <div className="damageControl__systemList">
                ... systems
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
                />

                <PushButton
                    disabled={this.props.dice[0] === 0}
                    color={ButtonColor.Tertiary}
                    text={this.props.text.systems.damage.discard}
                    command="dmg_discard"
                    clicked={unlock}
                />
            </div>
        </div>
    }

    private rollDice() {
        let msg = 'dmg_roll';

        for (let lock of this.props.lockedDice) {
            msg += lock ? ' 0' : ' 1';
        }

        connection.send(msg);
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