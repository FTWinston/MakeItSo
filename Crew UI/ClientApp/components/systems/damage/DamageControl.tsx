import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { TextLocalisation } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { CardHand } from './CardHand';
import { CardSelection } from './CardSelection';
import { SystemList } from './SystemList';
import { DamageSystemType, DamageState, DamageSystem } from "~/store/Damage";
import { connection } from "~/Client";
import './DamageControl.scss';

interface DamageControlProps extends DamageState {
    text: TextLocalisation;
}

interface DamageControlState {
    selectedHandPos?: number;
}

class DamageControl extends ShipSystemComponent<DamageControlProps, DamageControlState> {
    constructor(props: DamageControlProps) {
        super(props);
        
        this.state = {
        };
    }

    name() { return 'power'; }

    protected getHelpText() {
        return this.props.text.systemHelp.power;
    }

    protected getOptionLabels() {
        return this.props.text.systems.power;
    }

    public render() {
        return <div className="system">
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
            />
            <CardHand
                text={this.props.text}
                cardIDs={this.props.handCardIDs}
                cardSelected={num => this.selectCard(num)}
            />
        </div>;
    }

    private selectCard(handPos: number) {
        this.setState({
            selectedHandPos: handPos === this.state.selectedHandPos ? undefined : handPos,
        });
    }

    private selectSystem(system: DamageSystem) {
        if (this.state.selectedHandPos === undefined) {
            return; // do nothing if no card selected
        }

        // TODO: if a card is removed from the hand, need to decrement selectedHandPos ... or if its the ID, set it to null
        // as such, this ought to be in the store rather than component status

        this.playCard(this.props.handCardIDs[this.state.selectedHandPos], this.state.selectedHandPos, system.type);
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
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {},
    null,
    { withRef: true },
)(DamageControl);