import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { actionCreators, maxHandSize, getPowerCardInfo, PowerState, PowerSystemType } from './store';
import { TextLocalisation } from '~/functionality';
import { connection } from '~/index';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { CardHand } from './CardHand';
import { CardSelection } from './CardSelection';
import { SystemList } from './SystemList';
import './PowerManagement.scss';

interface PowerManagementProps extends PowerState {
    text: TextLocalisation;
    selectCard: (handPos?: number) => void;
}

class PowerManagement extends ShipSystemComponent<PowerManagementProps, {}> {
    name() { return 'power'; }

    protected getHelpText() {
        return this.props.text.systemHelp.power;
    }

    protected getOptionLabels() {
        return this.props.text.systems.power;
    }

    public render() {
        let selectedCard = this.props.selectedHandPos === undefined
            ? null
            : getPowerCardInfo(this.props.handCards[this.props.selectedHandPos], this.props.text);

        let selectSystem = selectedCard === null || !selectedCard.selectTarget
            ? undefined
            : (system: PowerSystemType) => this.selectSystem(system);

        return <div className="system power">
            <SystemList
                text={this.props.text}
                systems={this.props.systems}
                systemSelected={selectSystem}
            />
            <CardSelection
                text={this.props.text}
                cards={this.props.choiceCards}
                queueSize={this.props.queueSize}
                cardSelected={num => this.pickCard(num)}
                canSelect={this.props.handCards.length < maxHandSize}
            />
            <CardHand
                text={this.props.text}
                cards={this.props.handCards}
                cardSelected={num => this.selectCard(num)}
                selectedHandPos={this.props.selectedHandPos}
            />
        </div>;
    }

    private selectCard(handPos: number) {
        this.props.selectCard(handPos === this.props.selectedHandPos ? undefined : handPos);
    }

    private selectSystem(system: PowerSystemType) {
        if (this.props.selectedHandPos === undefined) {
            return; // do nothing if no card selected
        }

        this.playCard(this.props.handCards[this.props.selectedHandPos], this.props.selectedHandPos, system);
    }

    private pickCard(cardNum: number) {
        connection.send(`power_pickCard ${cardNum}`);
    }

    private playCard(cardID: number, handPos: number, targetSystem: PowerSystemType) {
        connection.send(`power_useCard ${cardID} ${handPos} ${targetSystem}`);
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => PowerManagementProps = (state) => {
    return {
        text: state.user.text,
        ...state.power,
        selectCard: actionCreators.selectCard,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {},
    null,
    { withRef: true },
)(PowerManagement);