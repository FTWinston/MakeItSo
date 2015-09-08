var ws = new WebSocket('ws://' + location.host + '/ws');
ws.onerror = ws.onclose = function (e) { showError("The connection to your ship has been lost.\nIf the game is still running, check your network connection."); }
ws.onmessage = messageReceived;

var unloadEvent = function (e) {	
	var confirmationMessage = 'The game is still active.';

	(e || window.event).returnValue = confirmationMessage; //Gecko + IE
	return confirmationMessage; //Webkit, Safari, Chrome etc.
};

function messageReceived(ev) {
	var m = (ev.data || '').split(' ', 2);
	var cmd = m[0];
	
	if (cmd == 'id') {
		$('.playerIdentifier').text(m[1]);
		$('#error').hide();
		$('#systemSelect').show();
	}
	else if (cmd == 'msg') {
		var div = document.createElement('div');
		div.innerHTML = m[1];
		document.getElementById('messages').appendChild(div);
	}
	else if (cmd == 'sys+') {
		$('#systemList li[value="' + m[1] + '"]').removeClass('taken');
	}
	else if (cmd == 'sys-') {
		$('#systemList li[value="' + m[1] + '"]').addClass('taken');
	}
	else if (cmd == 'setup+') {
		$('#btnSetupGame').removeClass('disabled');
	}
	else if (cmd == 'setup-') {
		$('#btnSetupGame').addClass('disabled');
	}
	else if (cmd == 'setup') {
		$('#systemSelect').hide();
		$('#gameSetup').show();
	}
	else if (cmd == 'full') {
		showError('This ship is full: there is no room for you to join.');
	}
	else if (cmd == 'started') {
		showError('This game has already started: wait for the crew to pause or end the game, then try again.', false);
	}
	else if (cmd == 'game+') {
		switchToGame(true);
		$('#btnSetupGame').removeClass('disabled');
	}
	else if (cmd == 'game-') {
		var blame = m.length > 1 ? 'User \'' + m[1] + '\' ended the game.' : 'The game has ended.'
		showError(blame + ' Please wait...', false);
		
		$('#btnResumeGame, #btnEndGame').hide();
		$('#btnSetupGame').show();
		
		setTimeout(function() { $('#error').hide(); $('#systemSelect').show(); }, 3000);
	}
	else if (cmd == 'pause+') {
		$('#gameActive, #btnSetupGame, #error').hide();
		$('#systemSelect, #btnResumeGame, #btnEndGame').show();
		switchToGame(false);
	}
	else if (cmd == 'pause-') {
		switchToGame(true);
	}
};

function switchToGame(intoGame) {
	if (intoGame) {
		window.addEventListener('beforeunload', unloadEvent);
		
		$('screen, #btnResumeGame, #btnEndGame').hide();
		$('#gameActive, #btnSetupGame').show();
		$('#systemSwitcher choice clicker:visible:first').mousedown().mouseup();
	}
	else {
		window.removeEventListener('beforeunload', unloadEvent);
	}
}

function showError(msg, fatal) {
	fatal = typeof fatal !== 'undefined' ? fatal : true;
	
	if (fatal) {
		$(document).add('*').off();
		ws.close();
		msg +='\n\nRefresh the page to continue.';
	}
	
	switchToGame(false);
	$('#errorMsg').text(msg);
	
	$('screen').hide();
	$('#error').show();
}


$(function () {
	var btnTouch = $('#btnTouchToggle');
	if (Features.TouchInterface == FeatureState.Unavailable) {
		btnTouch.hide();
		$('.touchMode').hide();
	}
	else {
		if (Features.TouchInterface == FeatureState.Enabled)
			btnTouch.addClass('enabled');

		var toggleTouch = function () {
			var on = !btnTouch.hasClass('enabled');
			Features.TouchInterface = on ? FeatureState.Enabled : FeatureState.Disabled;
			$('.touchMode').toggle(on);
			$('.nonTouchMode').toggle(!on);
		};
		btnTouch.mousedown(toggleTouch);
		toggleTouch();
	}
	
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
});