var GameClient = React.createClass({
	getInitialState: function() {
        return { activeScreen: 'error', errorMessage: 'Connecting...', gameActive: false, setupInProgress: false, playerID: null };
    },
	render: function() {
		return (
			<div>
				<SystemSelect show={this.state.activeScreen == 'systems'} gameActive={this.state.gameActive} setupInProgress={this.state.setupInProgress} playerID={this.state.playerID} />
				<GameSetup show={this.state.activeScreen == 'setup'} />
				<GameRoot show={this.state.activeScreen == 'game'} />
				<ErrorDisplay show={this.state.activeScreen == 'error'} message={this.state.errorMessage} />
			</div>
		);
	},
	setActiveScreen(screen) {
		var newState = {activeScreen: screen};
		if (!this.state.gameActive && screen == 'active')
		{
			newState.gameActive = true;
			//$('#systemSwitcher choice clicker:visible:first').mousedown().mouseup(); // todo: remove this
		}
		if (screen != 'error')
			newState.errorMessage = null;
		
		if (screen == 'active')
			window.addEventListener('beforeunload', unloadEvent);
		else
			window.removeEventListener('beforeunload', unloadEvent);
		
		this.setState(newState);
	},
	showError(message, fatal) {
		fatal = typeof fatal !== 'undefined' ? fatal : true;
		
		if (fatal) {
			ws.close();
			message +='\n\nRefresh the page to continue.';
		}
		
		this.setState({ errorMessage: message, gameActive: false });
		this.setActiveScreen('error');
	},
	setPlayerID(val) {
		this.setState({ playerID: val });
	},
	setupScreenInUse(val) {
		this.setState({ setupInProgress: val });
	},
	gameAlreadyStarted() {
		this.setState({ gameActive: true });
	}
});

var SystemSelect = React.createClass({
	render: function() {
		return (
			<screen style={{display: this.props.show ? null : 'none'}}>
				<div className="playerIdentifier">{this.props.playerID}</div>
				<ul id="systemList">
					<li className="prompt">Select systems to control:</li>
				</ul>
				
				<ToggleButton color="7">touch interface</ToggleButton>
				
				<PushButton action="+setup" color="4" visible={!this.props.gameActive} disabled={this.props.setupInProgress}>setup game</PushButton>
				<PushButton action="resume" color="4" visible={this.props.gameActive}>resume game</PushButton>
				
				<ConfirmButton action="quit" color="3" visible={this.props.gameActive}>end game</ConfirmButton>
			</screen>
		);
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
					<PushButton action="-setup" localAction={function () {gameClient.setActiveScreen('systems')}} color="3">go back</PushButton>
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
	render: function() {
		return (
			<screen id="gameActive" style={{display: this.props.show ? null : 'none'}}>


				<div id="systemSwitcher">
					<choice className="systems color5"></choice>
					<clicker type="push" id="btnPause" className="color8" action="pause">pause</clicker>
				</div>
				
				<system id="system0" name="Helm">
					<buttonGroup className="color1 inline nonTouchMode" caption="rotation">
						<row>
							<spacer></spacer>
							<clicker type="held" key="W" start="+down" stop="-down">down</clicker>
							<spacer></spacer>
						</row>
						<row className="rounded">
							<clicker type="held" key="A" start="+left" stop="-left">left</clicker>
							<clicker type="press" action="stoprotate">stop</clicker>
							<clicker type="held" key="D" start="+right" stop="-right">right</clicker>
						</row>
						<row>
							<spacer></spacer>
							<clicker type="held" key="S" start="+up" stop="-up">up</clicker>
							<spacer></spacer>
						</row>
					</buttonGroup>
					<touchArea id="touchRotation" className="color1 touchMode inline" caption="rotation" direction="both" mode="continuous">
						This is a touch area. Honest
					</touchArea>
					
					<buttonGroup id="touchAcceleration" className="color2 inline nonTouchMode">
						<row>
							<clicker type="held" className="color2" key="R" start="+forward" stop="-forward">accelerate</clicker>
						</row>
						<row>
							<clicker type="toggle" className="color2" key="F" start="+backward" stop="-backward">brake</clicker>
						</row>
					</buttonGroup>
					<touchArea className="color2 touchMode inline" direction="vertical" mode="continuous">
						This too
					</touchArea>
					
					<buttonGroup id="touchTranslation" className="color3 inline nonTouchMode" caption="translation">
						<row>
							<spacer></spacer>
							<clicker type="held" key="I" start="+moveup" stop="-moveup">up</clicker>
							<spacer></spacer>
						</row>
						<row className="rounded">
							<clicker type="held" key="J" start="+moveleft" stop="-moveleft">left</clicker>
							<clicker type="press" action="stoptranslate">stop</clicker>
							<clicker type="held" key="L" start="+moveright" stop="-moveright">right</clicker>
						</row>
						<row>
							<spacer></spacer>
							<clicker type="held" key="K" start="+movedown" stop="-movedown">down</clicker>
							<spacer></spacer>
						</row>
					</buttonGroup>
					<touchArea className="color3 touchMode inline" caption="translation" direction="both" mode="continuous">
						And also this
					</touchArea>
				</system>
				<system id="system1" name="Viewscreen">
					<section>
						<buttonGroup className="color3 inline">
							<row>
								<spacer></spacer>
								<clicker type="held" key="W" start="+viewup" stop="-viewup">&#8679;</clicker>
								<spacer></spacer>
							</row>
							<row className="rounded">
								<clicker type="held" key="A" start="+viewleft" stop="-viewleft">&#8678;</clicker>
								<spacer>Pan</spacer>
								<clicker type="held" key="D" start="+viewright" stop="-viewright">&#8680;</clicker>
							</row>
							<row>
								<spacer></spacer>
								<clicker type="held" key="S" start="+viewdown" stop="-viewdown">&#8681;</clicker>
								<spacer></spacer>
							</row>
						</buttonGroup>
						
						<buttonGroup className="color5 inline">
							<row>
								<clicker type="held" key="R" start="+zoomin" stop="-zoomin">&#8679;</clicker>
							</row>
							<row>
								<spacer>Zoom</spacer>
							</row>
							<row>
								<clicker type="held" key="T" start="+zoomout" stop="-zoomout">&#8681;</clicker>
							</row>
						</buttonGroup>
					</section>
					<section>
						<choice className="color2 inline">
							<row>
								<clicker type="toggle" key="F" start="view forward">forward</clicker>
								<clicker type="toggle" key="G" start="view port">port</clicker>
								<clicker type="toggle" key="H" start="view starboard">starboard</clicker>
							</row>
							<row>
								<clicker type="toggle" key="C" start="view starboard">aft</clicker>
								<clicker type="toggle" key="V" start="view starboard">dorsal</clicker>
								<clicker type="toggle" key="B" start="view starboard">ventral</clicker>
							</row>
						</choice>
						<clicker type="toggle" className="color4" key="N" start="+chase" stop="-chase">chase mode</clicker>
						<clicker type="toggle" className="color8" key="M" start="+viewcomms" stop="-viewcomms">comms channel</clicker>
					</section>
				</system>
				<system id="system2" name="Sensors">
					
				</system>
				<system id="system3" name="Weapons">
					
				</system>
				<system id="system4" name="Shields">
					
				</system>
				<system id="system5" name="Damage Control">
					
				</system>
				<system id="system6" name="Power">
					
				</system>
				<system id="system7" name="Deflector">
					
				</system>
			
			</screen>
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
		return { visible: true, disabled: false, action: null, localAction: null, color: null };
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
		
		if (this.props.localAction != null)
			this.props.localAction();
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
		return { visible: true, forceEnable: false, disabled: false, inChoice: false, startAction: null, stopAction: null, color: null, onMounted: null, onSelected: null, onSelectedChoice: null };
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
		
		if (nowActive && this.props.onSelected != null)
			this.props.onSelected(this);
		if (nowActive && this.props.onSelectedChoice != null)
			this.props.onSelectedChoice(this);
		
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
		return { visible: true, disabled: false, startAction: null, stopAction: null, color: null };
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
			ws.send(action);
		
		this.setState({ held: true });
	},
	mouseUp: function(e) {
		if (this.props.disabled || !this.state.held)
			
		if (this.props.stopAction != null)
			ws.send(action);
		
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
		return { color: null, disabled: false };
	},
	render: function() {
		var children = this.props.children;
		
		if (this.props.color != null || this.props.disabled) {
			var props = {};
			if (this.props.color != null)
				props.color = this.props.color;
			if (this.props.disabled)
				props.disabled = true;
			
			children = React.Children.map(children, function (c, index) {
				return React.cloneElement(c, props);
			});
		}
		
		return (
			<buttonGroup>
				{children}
			</buttonGroup>
		);
	}
});

var Choice = React.createClass({
	getDefaultProps: function() {
		return { prompt: null, color: null, disabled: false };
	},
	getInitialState: function() {
        return { description: null, mountedChildren: [] };
    },
	render: function() {
		var self = this;
		var props = { inChoice: true, onSelectedChoice: self.childSelected, onMounted: self.childMounted };
		
		if (this.props.color != null)
			props.color = this.props.color;
		
		if (this.props.disabled)
			props.disabled = true;
		
		var children = React.Children.map(this.props.children, function (c, index) {
            return React.cloneElement(c, props);
		});
		
		return (
			<choice>
				<prompt className={this.props.disabled ? 'disabled' : null}>{this.props.prompt}</prompt>
				{children}
				<description style={{visibility: this.props.disabled ? 'hidden' : null}}>{this.state.description}</description>
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
	else {
		if (Features.TouchInterface == FeatureState.Enabled) {
			btnTouch.addClass('enabled');
			$('.nonTouchMode').hide();
		}
		else {
			$('.touchMode').hide();
		}
		var toggleTouch = function () {
			var on = !btnTouch.hasClass('enabled');
			Features.TouchInterface = on ? FeatureState.Enabled : FeatureState.Disabled;
			$('.touchMode').toggle(on);
			$('.nonTouchMode').toggle(!on);
		};
		btnTouch.mousedown(toggleTouch);
		
	}
	
	$('#gameActive > system').each(function () {
		var sys = $(this);
		var id = sys.attr('id');
		var idNum = id.replace('system', '');
		var name = sys.attr('name');
		
		$('#systemSwitcher > .systems').append('<clicker type="toggle" value="' + id + '">' + name + '</clicker>');
		$('#systemList').append('<li class="option" value="' + idNum + '">' + name + '</li>');
	});
	
	$('#systemList li.option').click(function () {
		var btn = $(this);
		var nowSelected = !btn.hasClass('selected');
		var operation = nowSelected ? '+sys ' : '-sys ';
		btn.toggleClass('selected');
		var sysNumber = btn.attr('value');
		ws.send(operation + sysNumber);
		
		var button = $('#systemSwitcher choice clicker[value="system' + sysNumber + '"]');
		if (nowSelected)
			button.show();
		else
			button.hide();
	});
	
	$('system, #systemSwitcher choice clicker').hide();
	
	$('#systemSwitcher choice clicker').mousedown(function () {
		var btn = $(this);
		var system = btn.attr('value');
		$('system#' + system).show().siblings('system').hide();
	});

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