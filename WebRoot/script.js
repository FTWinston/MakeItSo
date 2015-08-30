var ws = new WebSocket('ws://' + location.host + '/ws');
if (!window.console) { window.console = { log: function() {} } };

ws.onerror = shutdown;
ws.onclose = shutdown;
ws.onmessage = messageReceived;

function messageReceived(ev) {
	var m = (ev.data || '').split(' ', 2);

	if (m[0] == 'id') {
		$('.playerIdentifier').text(m[1]);
	}
	else if (m[0] == 'msg') {
		var div = document.createElement('div');
		div.innerHTML = m[1];
		document.getElementById('messages').appendChild(div);
	}
	else if (m[0] == 'sys+') {
		$('#systemList li[value="' + m[1] + '"]').removeClass('taken');
	}
	else if (m[0] == 'sys-') {
		$('#systemList li[value="' + m[1] + '"]').addClass('taken');
	}
	else if (m[0] == 'setup+') {
		$('#btnSetupGame').removeClass('disabled');
	}
	else if (m[0] == 'setup-') {
		$('#btnSetupGame').addClass('disabled');
	}
	else if (m[0] == 'setup') {
		$('#systemSelect').hide();
		$('#gameSetup').show();
	}
	else if (m[0] == 'full') {
		showError('This ship is full: there is no room for you to join.');
	}
	else if (m[0] == 'game+') {
		$('#systemSelect, #gameSetup').hide();
		$('#gameActive').show();
		$('#systemSwitcher choice toggleClicker:visible:first').click();
		$('#btnSetupGame').removeClass('disabled');
	}
	else if (m[0] == 'game-') {
		$('#gameActive').hide();
		$('#systemSelect').show();
	}
};

function shutdown(ev) {
	showError("The connection to your ship has been lost.\nIf the game's still running, check your connection and try refreshing the page.");
}

function showError(msg) {
	$(document).add('*').off();
	
	$('#errorMsg').text(msg);
	
	$('screen').hide();
	$('#error').show();
}

$(function () {
	$('body').on('click', 'clicker.disabled, toggleClicker.disabled, confirmClicker.disabled, heldClicker.disabled', function (event) {
		event.stopImmediatePropagation();
	}).on('mousedown', 'toggleClicker:not(.enabled):not(.down)', function () {
		$(this).addClass('enabled down');
	}).on('mousedown', 'toggleClicker.enabled:not(.down)', function () {
		$(this).removeClass('enabled').addClass('down');
	}).on('mouseup', 'toggleClicker.down', function () {
		$(this).removeClass('down');
	});
	
	$('confirmClicker').click(function (event) {
		var clicker = $(this);
		if (!clicker.hasClass('primed'))
			event.stopImmediatePropagation();
		clicker.toggleClass('primed');
	});
	
	$('body').on('mouseleave', 'confirmClicker.primed', function() {
		$(this).removeClass('primed');
	}).on('mousedown', 'heldClicker:not(.disabled)', function() {
		$(this).addClass('held');
	}).on('mouseup', 'heldClicker:not(.disabled)', function() {
		$(this).removeClass('held');
	}).on('mouseleave', 'heldClicker.held:not(.disabled)', function() {
		$(this).mouseup();
	}).on('touchstart', 'clicker, heldClicker:not(.disabled)', function() {
		$(this).mousedown();
	}).on('touchend', 'heldClicker.held:not(.disabled)', function() {
		$(this).mouseup();
	}).on('mousedown', 'clicker[action]:not([down])', function () {
		ws.send($(this).attr('action'));
	}).on('mouseup', 'clicker[action]', function () {
		$(this).removeClass('down');
	});
	
	$('confirmClicker[action]').click(function () {
		ws.send($(this).addClass('down').attr('action'));
	});
	
	$('body').on('mousedown', 'heldClicker[start]:not(.down)', function () {
		ws.send($(this).addClass('down').attr('start'));
	}).on('mouseup', 'heldClicker[stop]', function () {
		ws.send($(this).removeClass('down').attr('stop'));
	}).on('mousedown', 'toggleClicker:not(.enabled)[start]:not(.down)', function () {
		ws.send($(this).addClass('down').attr('start'));
	}).on('mousedown', 'toggleClicker.enabled[stop]:not(.down)', function () {
		ws.send($(this).attr('stop'));
	});
	
	var keyPresses = {};
	$('clicker[key], heldClicker[key], toggleClicker[key], confirmClicker[key]').each(function () {
		var clicker = $(this);
		var keyCode = clicker.attr('key').charCodeAt(0);
		
		if (keyPresses.hasOwnProperty(keyCode))
			keyPresses[keyCode].push(clicker);
		else
			keyPresses[keyCode] = [clicker];
	});
	
	$(document).keydown(function(e){
		var presses = keyPresses[e.which];
		if (presses === undefined)
			return;
		for (var i=0; i<presses.length; i++) {
			var button = presses[i];
			if (button.is(':visible'))
			{
				button.mousedown();
				break;
			}
		}
	}).keyup(function(e){
		var presses = keyPresses[e.which];
		if (presses === undefined)
			return;
		for (var i=0; i<presses.length; i++) {
			var button = presses[i];
			if (button.is(':visible'))
			{
				button.mouseup().click();
				break;
			}
		}
	});
	
	$('choice toggleClicker').click(function () {
		var btn = $(this);
		
		if (!btn.hasClass('enabled'))
			btn.addClass('enabled');
		else
			btn.siblings('toggleClicker.enabled').removeClass('enabled');
	});
	
	$('choice').on('click', 'toggleClicker.enabled', function () {
		var clicker = $(this);
		var desc = clicker.attr('description');
		var display = clicker.siblings('description');
		
		var hide = clicker.attr('hide');
		if (hide != undefined)
			$(hide).hide();
		
		var show = clicker.attr('show');
		if (show != undefined)
			$(show).show();
		
		display.text(desc);
	});
	
	$('choice toggleClicker:first-of-type').click();
	$('system, #systemSwitcher choice toggleClicker').hide();
	
	
	
	
	
	
	$('#systemSwitcher choice toggleClicker').click(function () {
		var btn = $(this);
		var system = btn.attr('value');
		$('system#' + system).show().siblings('system').hide();
	});
	
	$('#systemList li.option').click(function () {
		var btn = $(this);
		var nowSelected = !btn.hasClass('selected');
		var operation = nowSelected ? '+sys ' : '-sys ';
		btn.toggleClass('selected');
		var sysNumber = btn.attr('value');
		ws.send(operation + sysNumber);
		
		var button = $('#systemSwitcher choice toggleClicker[value="system' + sysNumber + '"]');
		if (nowSelected)
			button.show();
		else
			button.hide();
	});
	
	$('#btnSetupBack').mousedown(function() {
		$('#gameSetup').hide();
		$('#systemSelect').show();
	});
});