var GameClient = React.createClass({
	getInitialState: function() {
        return { activeScreen: 'error', errorMessage: 'Connecting, please wait' };
    },
	render: function() {
		return (
			<div>
				<SystemSelect active={this.state.activeScreen == 'systems'} gameActive={false} />
				<GameSetup active={this.state.activeScreen == 'setup'} />
				<GameRoot active={this.state.activeScreen == 'game'} />
				<ErrorDisplay active={this.state.activeScreen == 'error'} message={this.state.errorMessage} />
			</div>
		);
	},
	setGameActive(active) {
		// ...
	},
	setActiveScreen(screen) {
		this.setState({ activeScreen: screen });
	}
});

var SystemSelect = React.createClass({
	render: function() {
		return (
			<screen id="systemSelect" style={{display: this.props.active ? null : 'none'}}>
				<div className="playerIdentifier"></div>
				<ul id="systemList">
					<li className="prompt">Select systems to control:</li>
				</ul>
				
				<ToggleButton color="7">touch interface</ToggleButton>
				
				<PushButton action="+setup" color="4" show={!this.props.gameActive}>setup game</PushButton>
				<PushButton action="resume" color="4" show={this.props.gameActive}>resume game</PushButton>
				
				<ConfirmButton action="quit" color="3" show={this.props.gameActive}>end game</ConfirmButton>
			</screen>
		);
	}
});

var GameSetup = React.createClass({
	render: function() {
		return (
			<screen id="gameSetup" style={{display: this.props.active ? null : 'none'}}>
			</screen>
		);
	}
});

var GameRoot = React.createClass({
	render: function() {
		return (
			<screen id="gameActive" style={{display: this.props.active ? null : 'none'}}>
			</screen>
		);
	}
});

var ErrorDisplay = React.createClass({
	render: function() {
		return (
			<screen id="error" style={{display: this.props.show ? '' : 'none'}}>
				{this.props.message}
			</screen>
		);
	}
});



var PushButton = React.createClass({
	render: function() {
		return (
			<clicker type="push" style={{display: this.props.show == undefined || this.props.show ? null : 'none'}} action={this.props.action} className={'color' + this.props.color}>
				{this.props.children}
			</clicker>
		);
	}
});

var ConfirmButton = React.createClass({
	render: function() {
		return (
			<clicker type="confirm" style={{display: this.props.show == undefined || this.props.show ? null : 'none'}} action={this.props.action} className={'color' + this.props.color}>
				{this.props.children}
			</clicker>
		);
	}
});

var ToggleButton = React.createClass({
	render: function() {
		return (
			<clicker type="toggle" style={{display: this.props.show == undefined || this.props.show ? null : 'none'}} start={this.props.startAction} stop={this.props.stopAction} className={'color' + this.props.color}>
				{this.props.children}
			</clicker>
		);
	}
});




gameClient = ReactDOM.render(
  <GameClient />,
  document.getElementById('gameRoot')
);

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
	
	$('#btnSetupBack').mousedown(function() {
		$('#gameSetup').hide();
		$('#systemSelect').show();
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