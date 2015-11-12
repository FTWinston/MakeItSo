var GameClient = React.createClass({
	getInitialState: function() {
        return { activeScreen: 'error', errorMessage: 'Connecting...', gameActive: false, setupInProgress: false, touchMode: false, playerID: null, systems: [] };
    },
	render: function() {
		return (
			<div>
				<SystemSelect show={this.state.activeScreen == 'systems'} gameActive={this.state.gameActive} setupInProgress={this.state.setupInProgress} playerID={this.state.playerID} systems={this.state.systems} selectionChanged={this.systemSelectionChanged} touchMode={this.state.touchMode} touchModeChanged={this.touchModeChanged} />
				<GameSetup show={this.state.activeScreen == 'setup'} />
				<GameRoot ref="game" show={this.state.activeScreen == 'game'} registerSystem={this.registerSystem} systems={this.state.systems} touchMode={this.state.touchMode} />
				<ErrorDisplay show={this.state.activeScreen == 'error'} message={this.state.errorMessage} />
			</div>
		);
	},
	registerSystem: function(name, id) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id] = {name: name, index: id, selected: false, usedByOther: false};
			return {systems: systems};
		});
	},
	systemSelectionChanged: function (id, state) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id].selected = state;
			return {systems: systems};
		});
	},
	markSystemInUse: function(id, state) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id].usedByOther = state;
			return {systems: systems};
		});
	},
	setActiveScreen: function(screen) {
		var newState = {activeScreen: screen};
		if (!this.state.gameActive && screen == 'game')
			newState.gameActive = true;
		
		if (screen != 'error')
			newState.errorMessage = null;
		
		this.setState(newState);
		
		if (screen == 'game')
		{
			// when switching to the game, ensure a selected system is the "current" one
			if (!this.state.systems[this.refs.game.state.currentSystem].selected)
			{
				for (var i=0; i<this.state.systems.length; i++)
					if (this.state.systems[i].selected) {
						this.refs.game.setState({currentSystem: i});
						break;
					}
			}
			
			window.addEventListener('beforeunload', unloadEvent);
		}
		else
			window.removeEventListener('beforeunload', unloadEvent);
	},
	showError: function(message, fatal) {
		fatal = typeof fatal !== 'undefined' ? fatal : true;
		
		if (fatal) {
			ws.close();
			message +='\n\nRefresh the page to continue.';
		}
		
		this.setState({ errorMessage: message, gameActive: false });
		this.setActiveScreen('error');
	},
	setPlayerID: function(val) {
		this.setState({ playerID: val });
	},
	setupScreenInUse: function(val) {
		this.setState({ setupInProgress: val });
	},
	gameAlreadyStarted: function() {
		this.setState({ gameActive: true });
	},
	touchModeChanged: function(val) {
		this.setState({touchMode: val});
	}
});

var SystemSelect = React.createClass({
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
				
				<ToggleButton color="7" forceEnable={this.props.touchMode} onSelected={function() {self.props.touchModeChanged(true)}} onDeselected={function() {self.props.touchModeChanged(false)}}>touch interface</ToggleButton>
				
				<PushButton action="+setup" color="4" visible={!this.props.gameActive} disabled={this.props.setupInProgress}>setup game</PushButton>
				<PushButton action="resume" color="4" visible={this.props.gameActive}>resume game</PushButton>
				
				<ConfirmButton action="quit" color="3" visible={this.props.gameActive}>end game</ConfirmButton>
			</screen>
		);
	}
});

var SystemPicker = React.createClass({
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
		ws.send((nowSelected ? '+sys ' : '-sys ') + this.props.system.index);
		this.props.selectionChanged(this.props.system.index, nowSelected);
	}
});

var GameSetup = React.createClass({
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

var GameRoot = React.createClass({
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

var ShipSystemMixin = {
	componentDidMount: function () {
		if (this.props.registerCallback != null)
			this.props.registerCallback(this.props.name, this.props.index);
	},
};

var Helm = React.createClass({
	getDefaultProps: function() {
		return { touchMode: false, registerCallback: null, name: "Helm" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<ButtonGroup inline={true} color="1" visible={!this.props.touchMode} caption="rotation">
					<row>
						<spacer></spacer>
						<HeldButton hotkey="W" startAction="+down" stopAction="-down">down</HeldButton>
						<spacer></spacer>
					</row>
					<row className="rounded">
						<HeldButton hotkey="A" startAction="+left" stopAction="-left">left</HeldButton>
						<PushButton action="stoprotate">stop</PushButton>
						<HeldButton hotkey="D" startAction="+right" stopAction="-right">right</HeldButton>
					</row>
					<row>
						<spacer></spacer>
						<HeldButton hotkey="S" startAction="+up" stopAction="-up">up</HeldButton>
						<spacer></spacer>
					</row>
				</ButtonGroup>
				<touchArea id="touchRotation" className="color1 inline" style={{display: this.props.touchMode ? null : "none"}} caption="rotation" direction="both" mode="continuous">
					This is a touch area. Honest
				</touchArea>
				
				<ButtonGroup inline={true} color="2" visible={!this.props.touchMode}>
					<row>
						<HeldButton hotkey="R" startAction="+forward" stopAction="-forward">accelerate</HeldButton>
					</row>
					<row>
						<ToggleButton hotkey="F" startAction="+backward" stopAction="-backward">brake</ToggleButton>
					</row>
				</ButtonGroup>
				<touchArea id="touchAcceleration" className="color2 inline" style={{display: this.props.touchMode ? null : "none"}} direction="vertical" mode="continuous">
					This too
				</touchArea>
				
				<ButtonGroup inline={true} color="3" visible={!this.props.touchMode} caption="translation">
					<row>
						<spacer></spacer>
						<HeldButton hotkey="I" startAction="+moveup" stopAction="-moveup">up</HeldButton>
						<spacer></spacer>
					</row>
					<row className="rounded">
						<HeldButton hotkey="J" startAction="+moveleft" stopAction="-moveleft">left</HeldButton>
						<PushButton action="stoptranslate">stop</PushButton>
						<HeldButton hotkey="L" startAction="+moveright" stopAction="-moveright">right</HeldButton>
					</row>
					<row>
						<spacer></spacer>
						<HeldButton hotkey="K" startAction="+movedown" stopAction="-movedown">down</HeldButton>
						<spacer></spacer>
					</row>
				</ButtonGroup>
				<touchArea id="touchTranslation" className="color3 inline" style={{display: this.props.touchMode ? null : "none"}} caption="translation" direction="both" mode="continuous">
					And also this
				</touchArea>
			</system>
		);
	}
});

var Viewscreen = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Viewscreen" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<section>
					<ButtonGroup inline={true} color="3">
						<row>
							<spacer></spacer>
							<HeldButton hotkey="W" startAction="+viewup" stopAction="-viewup">&#8679;</HeldButton>
							<spacer></spacer>
						</row>
						<row className="rounded">
							<HeldButton hotkey="A" startAction="+viewleft" stopAction="-viewleft">&#8678;</HeldButton>
							<spacer>Pan</spacer>
							<HeldButton hotkey="D" startAction="+viewright" stopAction="-viewright">&#8680;</HeldButton>
						</row>
						<row>
							<spacer></spacer>
							<HeldButton hotkey="S" startAction="+viewdown" stopAction="-viewdown">&#8681;</HeldButton>
							<spacer></spacer>
						</row>
					</ButtonGroup>
					
					<ButtonGroup inline={true} color="5">
						<row>
							<HeldButton hotkey="R" startAction="+zoomin" stopAction="-zoomin">&#8679;</HeldButton>
						</row>
						<row>
							<spacer>Zoom</spacer>
						</row>
						<row>
							<HeldButton hotkey="T" startAction="+zoomout" stopAction="-zoomout">&#8681;</HeldButton>
						</row>
					</ButtonGroup>
				</section>
				<section>
					<Choice inline={true} color="2">
						<row>
							<ToggleButton hotkey="F" startAction="view forward">forward</ToggleButton>
							<ToggleButton hotkey="G" startAction="view port">port</ToggleButton>
							<ToggleButton hotkey="H" startAction="view starboard">starboard</ToggleButton>
						</row>
						<row>
							<ToggleButton hotkey="C" startAction="view starboard">aft</ToggleButton>
							<ToggleButton hotkey="V" startAction="view starboard">dorsal</ToggleButton>
							<ToggleButton hotkey="B" startAction="view starboard">ventral</ToggleButton>
						</row>
					</Choice>
					<ToggleButton color="4" hotkey="N" startAction="+chase" stopAction="-chase">chase mode</ToggleButton>
					<ToggleButton color="8" hotkey="M" startAction="+viewcomms" stopAction="-viewcomms">comms channel</ToggleButton>
				</section>
			</system>
		);
	}
});

var Sensors = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Sensors" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});

var Weapons = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Weapons" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});

var Shields = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Shields" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});

var DamageControl = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Damage Control" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});

var PowerManagement = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Power" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});

var Deflector = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Deflector" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});

var ErrorDisplay = React.createClass({
	render: function() {
		return (
			<screen id="error" style={{display: this.props.show ? null : 'none'}}>
				{this.props.message}
			</screen>
		);
	}
});


var PushButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, disabled: false, action: null, onClicked: null, color: null };
	},
	render: function() {
		var classes = '';
		if (this.props.color != null)
			classes += 'color' + this.props.color;
		if (this.props.disabled)
			classes += ' disabled';
		
		return (
			<clicker type="push" style={{display: this.props.visible ? null : 'none'}} onClick={this.click} className={classes}>
				{this.props.children}
			</clicker>
		);
	},
	click: function(e) {
		if (this.props.disabled)
			return;
		
		if (this.props.action != null)
			ws.send(this.props.action);
		
		if (this.props.onClicked != null)
			this.props.onClicked();
	}
});

var ConfirmButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, disabled: false, action: null, color: null };
	},
	getInitialState: function() {
        return { primed: false };
    },
	render: function() {
		var classes = '';
		if (this.props.color != null)
			classes += 'color' + this.props.color;
		if (this.props.disabled)
			classes += ' disabled';
		if (this.state.primed)
			classes += ' primed';
		
		return (
			<clicker type="confirm" style={{display: this.props.visible ? null : 'none'}} onClick={this.click} onMouseLeave={this.mouseLeave} className={classes}>
				{this.props.children}
			</clicker>
		);
	},
	click: function(e) {
		if (this.props.disabled)
			return;

		if (!this.state.primed) {
			this.setState({ primed: true });
			return;
		}
		
		if (this.props.action != null)
			ws.send(this.props.action);
		this.setState({ primed: false });
	},
	mouseLeave: function(e) {
		this.setState({ primed: false });
	}
});

var ToggleButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, forceEnable: false, disabled: false, inChoice: false, startAction: null, stopAction: null, color: null, onMounted: null, onSelected: null, onSelectedChoice: null, onDeselected: null, hotkey: null, first: false, last: false };
	},
	getInitialState: function() {
        return { active: this.props.forceEnable, pressed: false };
    },
	componentDidMount: function() {
		if (this.props.onMounted != null)
			this.props.onMounted(this);
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.forceEnable && !this.state.active)
			this.setActive(true);
	},
	render: function() {
		var classes = '';
		if (this.props.color != null)
			classes += 'color' + this.props.color;
		if (this.props.disabled)
			classes += ' disabled';
		if (this.state.active)
			classes += ' enabled';
		if (this.props.first)
			classes += ' first';
		if (this.props.last)
			classes += ' last';
		
		return (
			<clicker type="toggle" style={{display: this.props.visible ? null : 'none'}} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onMouseLeave={this.mouseUp} className={classes}>
				{this.props.children}
			</clicker>
		);
	},
	mouseDown: function(e) {
		if (this.props.disabled || this.state.pressed)
			return;

		if (this.state.active && this.props.inChoice)
			return;
		
		var nowActive = !this.state.active;
		
		var action = nowActive ? this.props.startAction : this.props.stopAction;
		if (action != null)
			ws.send(action);
		
		if (nowActive) {
			if (this.props.onSelected != null)
				this.props.onSelected(this);
			if (this.props.onSelectedChoice != null)
				this.props.onSelectedChoice(this);
		}
		else if (this.props.onDeselected != null)
			this.props.onDeselected(this);
		
		this.setState({ active: nowActive, pressed: true });
	},
	mouseUp: function(e) {
		this.setState({ pressed: false });
	},
	touchStart: function(e) {
		this.mouseDown(e);
		e.preventDefault();
	},
	touchEnd: function(e) {
		this.mouseUp(e);
		e.preventDefault();
	},
	setActive: function(val) {
		this.setState({ active: val });
		
		if (val && this.props.onSelected != null)
			this.props.onSelected(this);
		
		if (val && this.props.onSelectedChoice != null)
			this.props.onSelectedChoice(this);
	}
});

var HeldButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, disabled: false, startAction: null, stopAction: null, color: null, hotkey: null };
	},
	getInitialState: function() {
        return { held: false };
    },
	render: function() {
		var classes = '';
		if (this.props.color != null)
			classes += 'color' + this.props.color;
		if (this.props.disabled)
			classes += ' disabled';
		if (this.state.held)
			classes += ' held';
		
		return (
			<clicker type="held" style={{display: this.props.visible ? null : 'none'}} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onMouseLeave={this.mouseUp} className={classes}>
				{this.props.children}
			</clicker>
		);
	},
	mouseDown: function(e) {
		if (this.props.disabled || this.state.held)
			return;
		
		if (this.props.startAction != null)
			ws.send(this.props.startAction);
		
		this.setState({ held: true });
	},
	mouseUp: function(e) {
		if (this.props.disabled || !this.state.held)
			
		if (this.props.stopAction != null)
			ws.send(this.props.stopAction);
		
		this.setState({ held: false });
	},
	touchStart: function(e) {
		this.mouseDown(e);
		e.preventDefault();
	},
	touchEnd: function(e) {
		if (this.props.disabled)
			return;
		
		this.mouseUp(e);
		e.preventDefault();
	}
});

var ButtonGroup = React.createClass({
	getDefaultProps: function() {
		return { color: null, disabled: false, inline: false, visible: true, caption: null };
	},
	render: function() {
		var props = {}, gcProps = {};
		if (this.props.color != null)
			gcProps.color = props.color = this.props.color;
		if (this.props.disabled)
			gcProps.disabled = props.disabled = true;
		
		var isTable = false;
		var children = React.Children.map(this.props.children, function (c, index) {
			if (c.type == "row") {
				isTable = true;
				
				props.children = React.Children.map(c.props.children, function (gc, i) {
					return React.cloneElement(gc, gcProps);
				});
			}
			
			var child = React.cloneElement(c, props);
			delete props.children;
			return child;
		});
		
		var classes = this.props.inline ? 'inline' : '';
		if (isTable)
			classes += ' table';
		
		return (
			<buttonGroup className={classes} caption={this.props.caption} style={{display: this.props.visible ? null : 'none'}}>
				{children}
			</buttonGroup>
		);
	}
});

var Choice = React.createClass({
	getDefaultProps: function() {
		return { prompt: null, color: null, disabled: false, inline: false, visible: true };
	},
	getInitialState: function() {
        return { description: null, mountedChildren: [] };
    },
	render: function() {
		var self = this;
		var props = { inChoice: true, onSelectedChoice: self.childSelected, onMounted: self.childMounted, first: false, last: false };
		var gcProps = { inChoice: true, onSelectedChoice: self.childSelected, onMounted: self.childMounted, first: false, last: false };
		
		if (this.props.color != null)
			gcProps.color = props.color = this.props.color;
		
		if (this.props.disabled)
			gcProps.disabled = props.disabled = true;
		
		// find the first and last visible children, to mark them as such
		var firstIndex = 0, lastIndex = this.props.children.length - 1;
		while (firstIndex < this.props.children.length && !this.props.children[firstIndex].props.visible) {
			firstIndex++;
		}
		while (lastIndex > 0 && !this.props.children[lastIndex].props.visible) {
			lastIndex--;
		}
		
		var isTable = false;
		var children = React.Children.map(this.props.children, function (c, index) {
			if (index == firstIndex)
				props.first = true;
			if (index == lastIndex)
				props.last = true;
			
			if (c.type == "row") {
				isTable = true;
				
				props.children = React.Children.map(c.props.children, function (gc, i) {
					return React.cloneElement(gc, gcProps);
				});
			}
			
            var child = React.cloneElement(c, props);
			
			props.first = false;
			props.last = false;
			delete props.children;
			
			return child;
		});
		
		var classes = this.props.inline ? 'inline' : '';
		if (isTable)
			classes += ' table';
		
		return (
			<choice className={classes} style={{display: this.props.visible ? null : 'none'}}>
				<prompt style={{display: this.props.prompt == null ? 'none' : null}} className={this.props.disabled ? 'disabled' : null}>{this.props.prompt}</prompt>
				{children}
				<description style={{display: this.state.description == null ? 'none' : null}} style={{visibility: this.props.disabled ? 'hidden' : null}}>{this.state.description}</description>
			</choice>
		);
	},
	childMounted: function(child) {
		if (this.state.mountedChildren.length == 0)
			child.setActive(true);
		this.state.mountedChildren.push(child);
	},
	childSelected: function(child) {
		for (var i = 0; i < this.state.mountedChildren.length; i++) {
			if (this.state.mountedChildren[i] != child)
				this.state.mountedChildren[i].setActive(false);
		}
		this.setState({description: child.props.description});
	}
});


gameClient = ReactDOM.render(
	<GameClient />,
	document.getElementById('gameRoot'),
	createConnection
);

var unloadEvent = function (e) {	
	var confirmationMessage = 'The game is still active.';

	(e || window.event).returnValue = confirmationMessage; //Gecko + IE
	return confirmationMessage; //Webkit, Safari, Chrome etc.
};

/*
$(function () {
	var btnTouch = $('#btnTouchToggle');
	if (Features.TouchInterface == FeatureState.Unavailable) {
		btnTouch.hide();
		$('.touchMode').hide();
	}

	detectMovement($('#touchRotation')[0], function (x, y) {
		// ideally, this should control "joystick" input directly, instead of messing with the "key" input
		var scale = 1/50;
		ws.send('yaw ' + (x * scale));
		ws.send('pitch ' + (y * scale));
	});
	
	detectMovement($('#touchAcceleration')[0], function (x, y) {
		// ideally, this should control "joystick" input directly, instead of messing with the "key" input
		var scale = 1/50;
		if (y < 0)
			ws.send('+forward ' + (-y * scale));
		else if (y == 0) {
			ws.send('-forward');
			ws.send('-backward');
		}
		else
			ws.send('+backward ' + (y * scale));
	});
	
	detectMovement($('#touchTranslation')[0], function (x, y) {
		// ideally, this should control "joystick" input directly, instead of messing with the "key" input
		var scale = 1/50;
		if (x < 0)
			ws.send('+rotleft ' + (-x * scale));
		else if (x == 0) {
			ws.send('-moveleft');
			ws.send('-moveright');
		}
		else
			ws.send('+moveright ' + (y * scale));
		
		if (y < 0)
			ws.send('+moveup ' + (-y * scale));
		else if (y == 0) {
			ws.send('-moveup');
			ws.send('-movedown');
		}
		else
			ws.send('+movedown ' + (y * scale));
	});
});

*/