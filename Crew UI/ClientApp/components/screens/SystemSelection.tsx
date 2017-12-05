import * as React from 'react';
import { connect } from 'react-redux';
import { store, connection }  from '../../Client';
import { ApplicationState }  from '../../store';
import * as CrewStore from '../../store/User';
import * as ScreenStore from '../../store/Screen';
import { TextLocalisation } from '../../functionality/Localisation';
import { ShipSystem, allSystems } from '../../functionality/ShipSystem';
import { PushButton, ToggleButton, ButtonColor, Field, Screen } from '../general';
import './SystemSelection.scss';

interface SystemSelectionDataProps {
    playersBySystem: { [key: number]: string };
    //groupsBySystem?: { [key: number]: string };
    canEnterSetup: boolean;
    gameInProgress: boolean;
    text: TextLocalisation;
}

type SystemSelectionProps = SystemSelectionDataProps
    & typeof ScreenStore.actionCreators;

class SystemSelection extends React.Component<SystemSelectionProps, {}> {
    public render() {
        let words = this.props.text.screens.systemSelection;
        let systemNames = this.props.text.systemNames;

        let setupButton: JSX.Element | undefined, resumeButton: JSX.Element | undefined;

        if (this.props.gameInProgress) {
            resumeButton = <PushButton
                color={ButtonColor.Secondary}
                text={words.resumeGame}
                command="resume"
            />;
        } else {
            setupButton = <PushButton
                color={ButtonColor.Secondary}
                text={words.setupGame}
                command="+setup"
                disabled={this.props.canEnterSetup}
            />;
        }

        let settingsButton = <PushButton
            color={ButtonColor.Tertiary}
            text={this.props.text.common.settings}
            clicked={() => this.props.showUserSettings()}
        />;

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
            <Field centered={true} displayAsRow={true}>
                {settingsButton}
                {setupButton}
                {resumeButton}
            </Field>
        </Screen>;
    }
    private renderSystemControls(name: string, system: ShipSystem) {
        let players = this.props.playersBySystem[system as number];

        // TODO: select by default systems chosen by the current player, so they can go to settings and back without screwing with the UI
        let preselected = false;

        return [
            <div key="a" className="systemSelection__group" />,
            <ToggleButton
                key="b"
                text={name}
                color={ButtonColor.Primary}
                activateCommand={`sys+ ${system}`}
                deactivateCommand={`sys- ${system}`}
                startActive={preselected}
            />,
            <div key="c" className="systemSelection__help">?</div>,
            <div key="d" className="systemSelection__who">{players}</div>
        ];
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => SystemSelectionDataProps = (state) => {
    let players: { [key: number]: string } = {};

    for (var system of allSystems) {
        players[system] = state.crew.players.filter(p => p.flags & system).map(p => p.name).join(', ');
    }

    return {
        playersBySystem: players,
        text: state.user.text,
        canEnterSetup: state.crew.playerInSetup !== undefined && state.crew.playerInSetup !== state.crew.localPlayerID,
        gameInProgress: state.screen.gameInProgress,
    };
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    ScreenStore.actionCreators
)(SystemSelection);