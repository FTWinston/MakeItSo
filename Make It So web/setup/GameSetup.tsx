interface IGameSetupProps {
    show?: boolean;
}

class GameSetup extends React.Component<IGameSetupProps, {}> {
	render() {
		return (
			<screen style={{display: this.props.show ? null : 'none', overflow: 'auto'}}>
				<p>This screen should let you set up your ship and start a new game, browse servers, etc</p>
				
                <Choice color="1" class="smVertical" prompt="Do you wish to play with just your own crew, or with others?">
					<Button type={ButtonType.Toggle} onActivated={this.hideArena.bind(this)} description="Play against the computer, with no other human crews.">Play a solo-crew game</Button>
                    <Button type={ButtonType.Toggle} onActivated={this.hideGameMode.bind(this)} description="Join a game being hosted remotely.">Join a multi-crew game</Button>
                    <Button type={ButtonType.Toggle} onActivated={this.showGameMode.bind(this)} description="Host a game which other human crews can connect to.">Host a multi-crew game</Button>
				</Choice>
				
				<Choice color="2" disabled={this.disableGameMode} prompt="Select the game mode you wish to play:">
                    <Button type={ButtonType.Toggle} forceActive={this.disableArena && (this.refs['arena'] as Button).state.active} description="Carry out missions, explore the galaxy, and boldly go where no one has gone before.">Exploration</Button>
                    <Button type={ButtonType.Toggle} description="Survive for as long as possible against endless waves of computer-controlled ships.">Endurance</Button>
                    <Button type={ButtonType.Toggle} ref="arena" disabled={this.disableArena} description="Human-crewed ships compete to death in a single star system.">Arena</Button>
				</Choice>
				
				<ButtonGroup>
					<Button type={ButtonType.Push} action="-setup" onClicked={function () {gameClient.setActiveScreen('systems')}} color="3">go back</Button>
					<Button type={ButtonType.Confirm} action="startGame" color="4">start game</Button>
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