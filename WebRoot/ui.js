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
				
				<choice id="chGameType" className="color1">
					<prompt>Do you wish to play with just your own crew, or with others?</prompt>
					<clicker type="toggle" value="solo" show="#chGameMode" hide="#chGameMode clicker[value='arena']" description="Play against the computer, with no other human crews.">Play a solo-crew game</clicker>
					<clicker type="toggle" value="join" hide="#chGameMode" description="Join a game being hosted by another human crew.">Join a multi-crew game</clicker>
					<clicker type="toggle" value="host" show="#chGameMode, #chGameMode clicker[value='arena']" description="Host a game which other human crews can connect to.">Host a multi-crew game</clicker>
					<description />
				</choice>
				
				<choice id="chGameMode" className="color2">
					<prompt>Select the game mode you wish to play:</prompt>
					<clicker type="toggle" value="exploration" description="Carry out missions, explore the galaxy, and boldly go where no one has gone before.">Exploration</clicker>
					<clicker type="toggle" value="endurance" description="Survive for as long as possible against endless waves of computer-controlled ships.">Endurance</clicker>
					<clicker type="toggle" value="arena" description="Human-crewed ships compete to death in a single star system.">Arena</clicker>
					<description />
				</choice>
				
				<buttonGroup>
					<PushButton action="-setup" color="3">go back</PushButton>
					<ConfirmButton action="startGame" color="4">start game</ConfirmButton>
				</buttonGroup>
			</screen>
		);
	}
});

var GameRoot = React.createClass({
	render: function() {
		return (
			<screen id="gameActive" style={{display: this.props.show ? null : 'none'}}>
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
		return { visible: true, disabled: false, action: null };
	},
	render: function() {
		var classes = 'color' + this.props.color;
		if (this.props.disabled)
			classes += ' disabled';
		
		return (
			<clicker type="push" style={{display: this.props.visible ? null : 'none'}} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} className={classes}>
				{this.props.children}
			</clicker>
		);
	},
	mouseDown: function(e) {
		if (this.props.disabled || this.pressed || this.props.action == null)
			return;
		
		this.pressed = true;
		ws.send(this.props.action);
	},
	mouseUp: function(e) {
		this.pressed = false;
	},
	touchStart: function(e) {
		this.mouseDown(e);
		e.preventDefault();
	},
	touchEnd: function(e) {
		this.mouseUp(e);
		e.preventDefault();
	},
	pressed: false
});

var ConfirmButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, disabled: false, action: null };
	},
	getInitialState: function() {
        return { primed: false };
    },
	render: function() {
		var classes = 'color' + this.props.color;
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
		return { visible: true, disabled: false, startAction: null, stopAction: null };
	},
	getInitialState: function() {
        return { active: false };
    },
	render: function() {
		var classes = 'color' + this.props.color;
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
		if (this.props.disabled || this.pressed)
			return;

		var nowActive = !this.state.active;
		
		var action = nowActive ? this.props.startAction : this.props.stopAction;
		if (action != null)
			ws.send(action);
		
		this.pressed = true;
		this.setState({ active: nowActive });
	},
	mouseUp: function(e) {
		this.pressed = false;
	},
	touchStart: function(e) {
		this.mouseDown(e);
		e.preventDefault();
	},
	touchEnd: function(e) {
		this.mouseUp(e);
		e.preventDefault();
	},
	pressed: false
});

var HeldButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, disabled: false, startAction: null, stopAction: null };
	},
	getInitialState: function() {
        return { held: false };
    },
	render: function() {
		var classes = 'color' + this.props.color;
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
	},
	pressed: false
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