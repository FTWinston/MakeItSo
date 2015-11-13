window.ErrorDisplay = React.createClass({
	render: function() {
		return (
			<screen id="error" style={{display: this.props.show ? null : 'none'}}>
				{this.props.message}
			</screen>
		);
	}
});

window.SystemSelect = React.createClass({
	getDefaultProps: function() {
		return { systems: [], selectionChanged: null };
	},
	render: function() {
		var self = this;
		var systems = this.props.systems.map(function(system) {
			return <SystemPicker key={system.index} system={system} selectionChanged={self.props.selectionChanged} />
		});
		
		return (
			<screen style={{display: this.props.show ? null : 'none'}}>
				<div className="playerIdentifier">{this.props.playerID}</div>
				<ul id="systemList">
					<li className="prompt">Select systems to control:</li>
					{systems}
				</ul>
				
				<ToggleButton color="7" visible={this.props.touchMode != FeatureState.Unavailable} forceEnable={this.props.touchMode == FeatureState.Enabled} onSelected={function() {self.props.touchModeChanged(true)}} onDeselected={function() {self.props.touchModeChanged(false)}}>touch interface</ToggleButton>
				
				<PushButton action="+setup" color="4" visible={!this.props.gameActive} disabled={this.props.setupInProgress}>setup game</PushButton>
				<PushButton action="resume" color="4" visible={this.props.gameActive}>resume game</PushButton>
				
				<ConfirmButton action="quit" color="3" visible={this.props.gameActive}>end game</ConfirmButton>
			</screen>
		);
	}
});

window.SystemPicker = React.createClass({
	render: function() {
		var classes = "option";
		if (this.props.system.selected)
			classes += " selected";
		if (this.props.system.usedByOther)
			classes += " taken";
		
		return (
			<li className={classes} onClick={this.clicked}>{this.props.system.name}</li>
		);
	},
	clicked: function() {
		var nowSelected = !this.props.system.selected;
		gameClient.socket.send((nowSelected ? '+sys ' : '-sys ') + this.props.system.index);
		this.props.selectionChanged(this.props.system.index, nowSelected);
	}
});

window.GameSetup = React.createClass({
	render: function() {
		return (
			<screen style={{display: this.props.show ? null : 'none', overflow: 'auto'}}>
				<p>This screen should let you set up your ship and start a new game, browse servers, etc</p>
				
				<Choice color="1" prompt="Do you wish to play with just your own crew, or with others?">
					<ToggleButton onSelected={this.hideArena} showGameMode hideArena description="Play against the computer, with no other human crews.">Play a solo-crew game</ToggleButton>
					<ToggleButton onSelected={this.hideGameMode} description="Join a game being hosted by another human crew.">Join a multi-crew game</ToggleButton>
					<ToggleButton onSelected={this.showGameMode} description="Host a game which other human crews can connect to.">Host a multi-crew game</ToggleButton>
				</Choice>
				
				<Choice color="2" disabled={this.disableGameMode} prompt="Select the game mode you wish to play:">
					<ToggleButton forceEnable={this.disableArena && this.refs.arena.state.active} description="Carry out missions, explore the galaxy, and boldly go where no one has gone before.">Exploration</ToggleButton>
					<ToggleButton description="Survive for as long as possible against endless waves of computer-controlled ships.">Endurance</ToggleButton>
					<ToggleButton ref="arena" disabled={this.disableArena} description="Human-crewed ships compete to death in a single star system.">Arena</ToggleButton>
				</Choice>
				
				<ButtonGroup>
					<PushButton action="-setup" onClicked={function () {gameClient.setActiveScreen('systems')}} color="3">go back</PushButton>
					<ConfirmButton action="startGame" color="4">start game</ConfirmButton>
				</ButtonGroup>
			</screen>
		);
	},
	disableGameMode: false,
	disableArena: false,
	showGameMode: function() {
		this.disableGameMode = false;
		this.disableArena = false;
		this.forceUpdate();
	},
	hideGameMode: function() {
		this.disableGameMode = true;
		this.disableArena = false;
		this.forceUpdate();
	},
	hideArena: function() {
		this.disableGameMode = false;
		this.disableArena = true;
		this.forceUpdate();
	}
});

window.GameRoot = React.createClass({
	getInitialState: function() {
		return { currentSystem: -1 };
	},
	render: function() {		
		var self = this;
		var index = -1;
		var switchers = this.props.systems.map(function(system) {
			index++;
			return <ToggleButton key={system.index} forceEnable={system.selected && system.index == self.state.currentSystem} visible={system.selected} onSelected={function() {self.setState({currentSystem: system.index})}}>{system.name}</ToggleButton>
		});
	
		return (
			<screen id="gameActive" style={{display: this.props.show ? null : 'none'}}>
				<div id="systemSwitcher">
					<Choice inline={true} color="5">
						{switchers}
					</Choice>
					<PushButton action="pause" color="8">pause</PushButton>
				</div>
				
				<Helm registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 0} index={0} touchMode={this.props.touchMode} />
				<Viewscreen registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 1} index={1} touchMode={this.props.touchMode} />
				<Sensors registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 2} index={2} touchMode={this.props.touchMode} />
				<Weapons registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 3} index={3} touchMode={this.props.touchMode} />
				<Shields registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 4} index={4} touchMode={this.props.touchMode} />
				<DamageControl registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 5} index={5} touchMode={this.props.touchMode} />
				<PowerManagement registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 6} index={6} touchMode={this.props.touchMode} />
				<Deflector registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 7} index={7} touchMode={this.props.touchMode} />
			</screen>
		);
	}
});

window.ShipSystemMixin = {
	componentDidMount: function () {
		if (this.props.registerCallback != null)
			this.props.registerCallback(this.props.name, this.props.index);
	},
};