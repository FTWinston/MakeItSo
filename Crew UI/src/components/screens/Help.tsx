import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { actionCreators } from '~/store/Screen';
import { TextLocalisation, ShipSystem, getSystemName } from '~/functionality';
import { PushButton, ButtonColor, Screen, Field } from '~/components/general';

interface IProps {
    text: TextLocalisation;
    system?: ShipSystem;
    showSystemView: () => void;
}

class Help extends React.Component<IProps> {
    public render() {
        const heading = this.props.system === undefined
            ? this.props.text.common.help
            : `${this.props.text.common.help}: ${getSystemName(this.props.system, this.props.text)}`;

        return <Screen heading={heading} pageLayout={true}>
            <div>
                {this.getHelpText()}
            </div>  

            <Field centered={true} displayAsRow={true}>
                <PushButton color={ButtonColor.Quaternary} clicked={() => this.props.showSystemView()} text={this.props.text.common.cancel} />
            </Field>
        </Screen>;
    }

    private getHelpText() {
        switch (this.props.system) {
            case ShipSystem.Helm:
                return this.props.text.systemHelp.helm;
            case ShipSystem.Warp:
                return this.props.text.systemHelp.warp;
            case ShipSystem.Weapons:
                return this.props.text.systemHelp.weapons;
            case ShipSystem.Sensors:
                return this.props.text.systemHelp.sensors;
            case ShipSystem.PowerManagement:
                return this.props.text.systemHelp.power;
            case ShipSystem.DamageControl:
                return this.props.text.systemHelp.damage;
            case ShipSystem.Communications:
                return this.props.text.systemHelp.comms;
            case ShipSystem.ViewScreen:
                return this.props.text.systemHelp.view;
            default:
                return undefined;
        }
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IProps = (state) => {
    const player = state.crew.players.find(p => p.id === state.crew.localPlayerID)!;
    const activeSystem = player.activeSystem;

    return {
        text: state.user.text,
        system: activeSystem,
        showSystemView: actionCreators.showSystemView,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
)(Help);