var ws = new WebSocket('ws://' + location.host + '/ws');
if (!window.console) { window.console = { log: function() {} } };

ws.onerror = shutdown;
ws.onclose = shutdown;
ws.onmessage = messageReceived;

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
		switchToGame();
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
	}
	else if (cmd == 'pause-') {
		switchToGame();
	}
};

function shutdown(ev) {
	showError("The connection to your ship has been lost.\nIf the game's still running, check your network connection.");
}

function switchToGame() {
	$('screen, #btnResumeGame, #btnEndGame').hide();
	$('#gameActive, #btnSetupGame').show();
	$('#systemSwitcher choice toggleClicker:visible:first').mousedown().mouseup();
}

function showError(msg, fatal) {
	fatal = typeof fatal !== 'undefined' ? fatal : true;
	
	if (fatal) {
		$(document).add('*').off();
		ws.close();
		msg +='\n\nRefresh the page to continue.';
	}
	
	$('#errorMsg').text(msg);
	
	$('screen').hide();
	$('#error').show();
}

$(function () {
	var _oldhide = $.fn.hide;
	$.fn.hide = function(speed, callback) {
		var retval = _oldhide.apply(this,arguments);
		$(this).trigger('showhide');
		return retval;
	}
	
	var _oldshow = $.fn.show;
	$.fn.show = function(speed, callback) {
		var retval = _oldshow.apply(this,arguments);
		$(this).trigger('showhide');
		return retval;
	}
	
	$(document).on('click', 'clicker.disabled, toggleClicker.disabled, confirmClicker.disabled, heldClicker.disabled', function (event) {
		event.stopImmediatePropagation();
	}).on('mousedown', 'toggleClicker:not(.enabled):not(.down)', function () {
		$(this).addClass('enabled down');
	}).on('mousedown', 'toggleClicker.enabled:not(.down)', function () {
		$(this).removeClass('enabled').addClass('down');
	}).on('mouseup', 'toggleClicker.down', function () {
		$(this).removeClass('down');
	}).on('click', 'confirmClicker', function (event) {
		var clicker = $(this);
		if (!clicker.hasClass('primed'))
			event.stopImmediatePropagation();
		clicker.toggleClass('primed');
	}).on('mouseleave', 'confirmClicker.primed', function() {
		$(this).removeClass('primed');
	}).on('mousedown', 'heldClicker:not(.disabled)', function() {
		$(this).addClass('held');
	}).on('mouseup', 'heldClicker:not(.disabled)', function() {
		$(this).removeClass('held');
	}).on('mouseleave', 'heldClicker.held:not(.disabled), toggleClicker.down:not(.disabled)', function() {
		$(this).mouseup();
	}).on('touchstart', 'clicker, heldClicker:not(.disabled), toggleClicker, confirmClicker', function() {
		$(this).mousedown();
	}).on('touchend', 'heldClicker.held:not(.disabled), toggleClicker, confirmClicker', function() {
		$(this).mouseup();
	}).on('mousedown', 'clicker[action]:not([down])', function () {
		ws.send($(this).attr('action'));
	}).on('mouseup', 'clicker[action]', function () {
		$(this).removeClass('down');
	}).on('click', 'confirmClicker[action]', function () {
		ws.send($(this).addClass('down').attr('action'));
	}).on('mousedown', 'heldClicker[start]:not(.down)', function () {
		ws.send($(this).addClass('down').attr('start'));
	}).on('mouseup', 'heldClicker[stop]', function () {
		ws.send($(this).removeClass('down').attr('stop'));
	}).on('mousedown', 'toggleClicker.enabled[start]:not(.down)', function () {
		ws.send($(this).addClass('down').attr('start'));
	}).on('mousedown', 'toggleClicker:not(.enabled)[stop]:not(.down)', function () {
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
		if (presses === undefined) {
			if (e.which == 112) {
				console.log('help key pressed');
				$('body').toggleClass('showKeys');
				e.preventDefault();
			}
			return;
		}
		for (var i=0; i<presses.length; i++) {
			var button = presses[i];
			if (button.is(':visible'))
			{
				button.mousedown();
				return;
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
				return;
			}
		}
	});
	
	$(document).on('mousedown', 'choice toggleClicker', function () {
		var clicker = $(this);
		
		if (!clicker.hasClass('enabled')) {
			clicker.addClass('enabled');
			return;
		}
		
		clicker.siblings('toggleClicker.enabled').removeClass('enabled');
		
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
	
	$(document).on('showhide', 'choice toggleClicker', function () {
		var choice = $(this).parent();
		choice.children().removeClass('first last');
		choice.children('toggleClicker:not([style*="display: none"]):first').addClass('first');
		choice.children('toggleClicker:not([style*="display: none"]):last').addClass('last');
	});
	
	$('system, #systemSwitcher choice toggleClicker').hide();
	
	$('#systemSwitcher choice toggleClicker').mousedown(function () {
		var btn = $(this);
		var system = btn.attr('value');
		$('system#' + system).show().siblings('system').hide();
	});
	
	$('choice toggleClicker:first-of-type').mousedown().mouseup();
	
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