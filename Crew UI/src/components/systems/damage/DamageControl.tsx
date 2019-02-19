import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { DamageState, actionCreators, DamageSystemType } from './store';
import './DamageControl.scss';
import { DamageSystemListItem } from './DamageSystemListItem';
import { connection } from '~/index';
import { ExpandedSystem } from './ExpandedSystem';

interface DamageControlProps extends DamageState {
    text: TextLocalisation;
    toggleDice: (index: number) => void;
    unlockDice: () => void;
}

class DamageControl extends ShipSystemComponent<DamageControlProps, {}> {
    name() { return 'damage'; }

    protected getOptionLabels() {
        return this.props.text.systems.helm; // obviously wrong
    }

    public render() {
        const classes = this.props.selectedSystem === DamageSystemType.None
            ? 'system damageControl damageControl--notSelected'
            : 'system damageControl damageControl--selected';

        const systems = this.props.systemHealth.map((health, i) => {
            const system = i as DamageSystemType;
            const select = () => this.selectSystem(system);

            return <DamageSystemListItem
                key={i}
                text={this.props.text}
                systemName={this.getSystemName(system)}
                health={health}
                selected={system === this.props.selectedSystem}
                powered={true} /* TODO: get this */
                select={select}
            />
        });

        const selectedSystem = this.props.selectedSystem === DamageSystemType.None
            ? undefined
            : <ExpandedSystem
                text={this.props.text}
                systemName={this.getSystemName(this.props.selectedSystem)}
                health={this.props.systemHealth[this.props.selectedSystem]}
                powered={true} /* TODO: get this */
                availableCombos={this.props.availableCombos}
                dice={this.props.dice}
                fixedDice={this.props.fixedDice}
                lockedDice={this.props.lockedDice}
                numReRolls={this.props.numReRolls}
                rollDice={() => this.rollDice()}
                toggleDice={i => this.props.toggleDice(i)}
                unlockDice={() => this.props.unlockDice()}
            />

        return <div className={classes}>
            {selectedSystem}
            <div className="damageControl__systemList">
                {systems}
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
    
    private selectSystem(system: DamageSystemType) {
        if (system === this.props.selectedSystem) {
            system = DamageSystemType.None;
        }

        connection.send(`dmg_system ${system}`);
        this.props.unlockDice();
    }
    
    private getSystemName(system: DamageSystemType) {
        switch (system) {
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
            case DamageSystemType.DamageControl:
                return this.props.text.systemNames.damage;
            default:
                return '';
        }
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