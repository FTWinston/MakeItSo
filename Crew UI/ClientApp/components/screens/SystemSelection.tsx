import * as React from 'react';
import { connect } from 'react-redux';
import { store, connection }  from '../../Client';
import { ApplicationState }  from '../../store';
import * as CrewStore from '../../store/User';
import * as ScreenStore from '../../store/Screen';
import { ShipSystem, allSystems, TextLocalisation } from '../../functionality';
import { PushButton, ToggleButton, IconButton, Icon, ButtonColor, Field, Screen } from '../general';
import './SystemSelection.scss';

interface SystemSelectionDataProps {
    playersBySystem: { [key: number]: string };
    canEnterSetup: boolean;
    gameInProgress: boolean;
    text: TextLocalisation;
    numPlayers: number;
    preselectedSystems?: ShipSystem;
}

type SystemSelectionProps = SystemSelectionDataProps
    & typeof ScreenStore.actionCreators;

class SystemSelection extends React.Component<SystemSelectionProps, {}> {
    public render() {
        let words = this.props.text.screens.systemSelection;
        let systemNames = this.props.text.systemNames;
        let suggestedGroupings = this.determineSuggestedGroupings();

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
                <p>{suggestedGroupings.length === 0 ? undefined : words.suggestionPrompt}</p>
                <div className="systemSelection">
                    {this.renderSystemControls(systemNames.helm, ShipSystem.Helm, suggestedGroupings)}
                    {this.renderSystemControls(systemNames.warp, ShipSystem.Warp, suggestedGroupings)}
                    {this.renderSystemControls(systemNames.weapons, ShipSystem.Weapons, suggestedGroupings)}
                    {this.renderSystemControls(systemNames.sensors, ShipSystem.Sensors, suggestedGroupings)}
                    {this.renderSystemControls(systemNames.power, ShipSystem.PowerManagement, suggestedGroupings)}
                    {this.renderSystemControls(systemNames.damage, ShipSystem.DamageControl, suggestedGroupings)}
                    {this.renderSystemControls(systemNames.comms, ShipSystem.Communications, suggestedGroupings)}
                    {this.renderSystemControls(systemNames.view, ShipSystem.ViewScreen, suggestedGroupings)}
                </div>
            </Field>
            <Field centered={true} displayAsRow={true}>
                {settingsButton}
                {setupButton}
                {resumeButton}
            </Field>
        </Screen>;
    }

    private renderSystemControls(name: string, system: ShipSystem, suggestedGroupings: ShipSystem[]) {
        let players = this.props.playersBySystem[system as number];

        const groupNames = ['Δ', 'Ω', 'Ψ', 'Χ', 'Θ', 'Σ'];
        let groups = '';
        for (let i=0; i<suggestedGroupings.length; i++) {
            if ((suggestedGroupings[i] & system) !== 0) {
                groups += groupNames[i];
            }
        }

        // select by default systems chosen by the current player, so they can go to settings and back without screwing with the UI
        let preselected = this.props.preselectedSystems !== undefined && (this.props.preselectedSystems & system) !== 0;

        return [
            <div key="a" className="systemSelection__group">{groups}</div>,
            <ToggleButton
                key="b"
                text={name}
                color={ButtonColor.Primary}
                activateCommand={`sys+ ${system}`}
                deactivateCommand={`sys- ${system}`}
                startActive={preselected}
            />,
            <div key="c" className="systemSelection__help">
                <IconButton color={ButtonColor.Quandry} icon={Icon.Help} title={this.props.text.common.help} />
            </div>,
            <div key="d" className="systemSelection__who">{players}</div>
        ];
    }

    private determineSuggestedGroupings() {
        switch (this.props.numPlayers) {
            case 2:
                return [
                    ShipSystem.Helm | ShipSystem.Warp | ShipSystem.ViewScreen,
                    ShipSystem.Warp | ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.Communications | ShipSystem.ViewScreen,
                ];
            case 3:
                return [
                    ShipSystem.Helm | ShipSystem.Warp | ShipSystem.ViewScreen,
                    ShipSystem.Weapons | ShipSystem.Sensors |ShipSystem.Communications | ShipSystem.ViewScreen,
                    ShipSystem.Warp | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen,
                ];
            case 4:
                return [
                    ShipSystem.Helm | ShipSystem.Warp,
                    ShipSystem.Weapons | ShipSystem.Communications | ShipSystem.ViewScreen,
                    ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen,
                    ShipSystem.Warp | ShipSystem.Sensors | ShipSystem.Communications | ShipSystem.ViewScreen,
                ];
            case 5:
                return [
                    ShipSystem.Helm,
                    ShipSystem.Weapons | ShipSystem.Communications | ShipSystem.ViewScreen,
                    ShipSystem.PowerManagement | ShipSystem.Warp,
                    ShipSystem.DamageControl | ShipSystem.Warp,
                    ShipSystem.Sensors | ShipSystem.Communications | ShipSystem.ViewScreen,
                ];
            case 6:
                return [
                    ShipSystem.Helm,
                    ShipSystem.Weapons | ShipSystem.ViewScreen,
                    ShipSystem.PowerManagement,
                    ShipSystem.Warp | ShipSystem.Communications,
                    ShipSystem.Sensors | ShipSystem.ViewScreen,
                    ShipSystem.DamageControl,
                ];
            default:
                return [];
        }
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => SystemSelectionDataProps = (state) => {
    // use the current player's selections if we have any
    let localPlayer = state.crew.players.filter(p => p.id === state.crew.localPlayerID);
    let preselectedSystems = localPlayer.length === 0 ? 0 : localPlayer[0].selectedSystems; // if 0, use saved session values?

    let players: { [key: number]: string } = {};

    for (var system of allSystems) {
        players[system] = state.crew.players.filter(p => p.selectedSystems & system).map(p => p.name).join(', ');
    }

    return {
        playersBySystem: players,
        text: state.user.text,
        canEnterSetup: state.crew.playerInSetup !== undefined && state.crew.playerInSetup !== state.crew.localPlayerID,
        gameInProgress: state.screen.gameState === ScreenStore.GameState.Paused,
        numPlayers: state.crew.players.length,
        preselectedSystems: preselectedSystems,
    };
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    ScreenStore.actionCreators
)(SystemSelection);