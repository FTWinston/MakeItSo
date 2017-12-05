import * as React from 'react';
import { connect } from 'react-redux';
import { store, connection }  from '../../Client';
import { ApplicationState }  from '../../store';
import * as CrewStore from '../../store/User';
import { TextLocalisation } from '../../functionality/Localisation';
import { ShipSystem, allSystems } from '../../functionality/ShipSystem';
import { PushButton, ToggleButton, ButtonColor, Field, Screen } from '../general';
import './SystemSelection.scss';

interface SystemSelectionProps {
    playersBySystem: { [key: number]: string };
    //groupsBySystem?: { [key: number]: string };
    text: TextLocalisation;
}

class SystemSelection extends React.Component<SystemSelectionProps, {}> {
    public render() {
        let words = this.props.text.screens.systemSelection;
        let systemNames = this.props.text.systemNames;

        return <Screen heading={words.intro} pageLayout={true}>
            <Field centered={true}>
                <div className="systemSelection">
                    {this.renderSystemControls(systemNames.helm, ShipSystem.Helm)}
                    {this.renderSystemControls(systemNames.warp, ShipSystem.Warp)}
                    {this.renderSystemControls(systemNames.weapons, ShipSystem.Weapons)}
                    {this.renderSystemControls(systemNames.sensors, ShipSystem.Sensors)}
                    {this.renderSystemControls(systemNames.power, ShipSystem.PowerManagement)}
                    {this.renderSystemControls(systemNames.damage, ShipSystem.DamageControl)}
                    {this.renderSystemControls(systemNames.comms, ShipSystem.Communications)}
                    {this.renderSystemControls(systemNames.view, ShipSystem.ViewScreen)}
                </div>
            </Field>
            <Field centered={true}>
                <PushButton color={ButtonColor.Secondary} text={words.setupGame} />
            </Field>
        </Screen>;
    }
    private renderSystemControls(name: string, system: ShipSystem) {
        let players = this.props.playersBySystem[system as number];

        return [
            <div key="a" className="systemSelection__group" />,
            <ToggleButton
                key="b"
                text={name}
                color={ButtonColor.Primary}
                activateCommand={`sys+ ${system}`}
                deactivateCommand={`sys- ${system}`}
            />,
            <div key="c" className="systemSelection__help">?</div>,
            <div key="d" className="systemSelection__who">{players}</div>
        ];
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => SystemSelectionProps = (state) => {
    let players: { [key: number]: string } = {};

    for (var system of allSystems) {
        players[system] = state.crew.players.filter(p => p.flags & system).map(p => p.name).join(', ');
    }

    return {
        playersBySystem: players,
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(SystemSelection);