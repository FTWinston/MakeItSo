import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { TextLocalisation } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { CardHand } from './CardHand';
import { CardSelection } from './CardSelection';
import { SystemList } from './SystemList';
import { DamageSystemType, DamageState, DamageSystem, actionCreators, maxHandSize } from '~/store/Damage';
import { connection } from '~/Client';
import './DamageControl.scss';

interface DamageControlProps extends DamageState {
    text: TextLocalisation;
    selectCard: (handPos?: number) => void;
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
        return <div className="system damageControl">
            <SystemList
                text={this.props.text}
                systems={this.props.systems}
                systemSelected={sys => this.selectSystem(sys)}
            />
            <CardSelection
                text={this.props.text}
                cardIDs={this.props.choiceCardIDs}
                queueSize={this.props.queueSize}
                cardSelected={num => this.pickCard(num)}
                canSelect={this.props.handCardIDs.length < maxHandSize}
            />
            <CardHand
                text={this.props.text}
                cardIDs={this.props.handCardIDs}
                cardSelected={num => this.selectCard(num)}
                selectedHandPos={this.props.selectedHandPos}
            />
        </div>;
    }

    private selectCard(handPos: number) {
        this.props.selectCard(handPos === this.props.selectedHandPos ? undefined : handPos);
    }

    private selectSystem(system: DamageSystem) {
        if (this.props.selectedHandPos === undefined) {
            return; // do nothing if no card selected
        }

        this.playCard(this.props.handCardIDs[this.props.selectedHandPos], this.props.selectedHandPos, system.type);
    }

    private pickCard(cardNum: number) {
        connection.send(`dmg_pickCard ${cardNum}`);
    }

    private playCard(cardID: number, handPos: number, targetSystem: DamageSystemType) {
        connection.send(`dmg_useCard ${cardID} ${handPos} ${targetSystem}`);
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => DamageControlProps = (state) => {
    return {
        text: state.user.text,
        systems: state.damage.systems,
        choiceCardIDs: state.damage.choiceCardIDs,
        queueSize: state.damage.queueSize,
        handCardIDs: state.damage.handCardIDs,
        selectedHandPos: state.damage.selectedHandPos,
        selectCard: actionCreators.selectCard,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
    null,
    { withRef: true },
)(DamageControl);