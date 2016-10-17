interface IGameSetupProps {
    show?: boolean;
}

class GameSetup extends React.Component<IGameSetupProps, {}> {
    render() {
        return (
            <screen style={{display: this.props.show ? null : 'none', overflow: 'auto'}}>
                <p>{language.gameSetupIntro}</p>
                
                <Choice color="1" class="smVertical" prompt={language.gameSetupServerType}>
                    <Button type={ButtonType.Toggle} onActivated={this.hideArena.bind(this)} description={language.gameSetupServerTypeLocalDescription}>{language.gameSetupServerTypeLocal}</Button>
                    <Button type={ButtonType.Toggle} onActivated={this.hideGameMode.bind(this)} description={language.gameSetupServerTypeRemoteDescription}>{language.gameSetupServerTypeRemote}</Button>
                    <Button type={ButtonType.Toggle} onActivated={this.showGameMode.bind(this)} description={language.gameSetupServerTypeHostDescription}>{language.gameSetupServerTypeHost}</Button>
                </Choice>
                
                <Choice color="2" disabled={this.disableGameMode} prompt={language.gameSetupGameMode}>
                    <Button type={ButtonType.Toggle} forceActive={this.disableArena && (this.refs['arena'] as Button).state.active} description={language.gameSetupGameModeExplorationDescription}>{language.gameSetupGameModeExploration}</Button>
                    <Button type={ButtonType.Toggle} description={language.gameSetupGameModeEnduranceDescription}>{language.gameSetupGameModeEndurance}</Button>
                    <Button type={ButtonType.Toggle} ref="arena" disabled={this.disableArena} description={language.gameSetupGameModeArenaDescription}>{language.gameSetupGameModeArena}</Button>
                </Choice>
                
                <ButtonGroup>
                    <Button type={ButtonType.Push} action="-setup" onClicked={function () {gameClient.setActiveScreen('systems')}} color="3">{language.gameSetupGoBack}</Button>
                    <Button type={ButtonType.Confirm} action="startGame" color="4">{language.gameSetupStartGame}</Button>
                </ButtonGroup>
            </screen>
        );
    }
    disableGameMode: boolean;
    disableArena: boolean;
    showGameMode() {
        this.disableGameMode = false;
        this.disableArena = false;
        this.forceUpdate();
    }
    hideGameMode() {
        this.disableGameMode = true;
        this.disableArena = false;
        this.forceUpdate();
    }
    hideArena() {
        this.disableGameMode = false;
        this.disableArena = true;
        this.forceUpdate();
    }
}