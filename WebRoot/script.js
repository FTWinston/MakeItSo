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
	$('#systemSwitcher choice clicker:visible:first').mousedown().mouseup();
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
	
	$(document).on('click', 'clicker.disabled', function (event) {
		event.stopImmediatePropagation();
	}).on('mousedown', 'clicker[type="toggle"]:not(.enabled):not(.down)', function () {
		$(this).addClass('enabled down');
	}).on('mousedown', 'clicker[type="toggle"].enabled:not(.down)', function () {
		$(this).removeClass('enabled').addClass('down');
	}).on('mouseup', 'clicker[type="toggle"].down', function () {
		$(this).removeClass('down');
	}).on('click', 'clicker[type="confirm"]', function (event) {
		var clicker = $(this);
		if (!clicker.hasClass('primed'))
			event.stopImmediatePropagation();
		clicker.toggleClass('primed');
	}).on('mouseleave', 'clicker[type="confirm"].primed', function() {
		$(this).removeClass('primed');
	}).on('mousedown', 'clicker[type="held"]:not(.disabled)', function() {
		$(this).addClass('held');
	}).on('mouseup', 'clicker[type="held"]:not(.disabled)', function() {
		$(this).removeClass('held');
	}).on('mouseleave', 'clicker[type="held"].held:not(.disabled), clicker[type="toggle"].down:not(.disabled)', function() {
		$(this).mouseup();
	}).on('touchstart', 'clicker:not(.disabled)', function() {
		$(this).mousedown();
	}).on('touchend', 'clicker[type="held"].held:not(.disabled), clicker[type="toggle"], clicker[type="confirm"]', function() {
		$(this).mouseup();
	}).on('mousedown', 'clicker[type="push"][action]:not([down])', function () {
		ws.send($(this).attr('action'));
	}).on('mouseup', 'clicker[type="push"][action]', function () {
		$(this).removeClass('down');
	}).on('click', 'clicker[type="confirm"][action]', function () {
		ws.send($(this).addClass('down').attr('action'));
	}).on('mousedown', 'clicker[type="held"][start]:not(.down)', function () {
		ws.send($(this).addClass('down').attr('start'));
	}).on('mouseup', 'clicker[type="held"][stop]', function () {
		ws.send($(this).removeClass('down').attr('stop'));
	}).on('mousedown', 'clicker[type="toggle"].enabled[start]:not(.down)', function () {
		ws.send($(this).addClass('down').attr('start'));
	}).on('mousedown', 'clicker[type="toggle"]:not(.enabled)[stop]:not(.down)', function () {
		ws.send($(this).attr('stop'));
	});
	
	var keyPresses = {};
	$('clicker[key]').each(function () {
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
	
	$(document).on('mousedown', 'choice clicker[type="toggle"]', function () {
		var clicker = $(this);
				
		var choice = clicker.closest('choice');
		choice.find('clicker[type="toggle"].enabled').removeClass('enabled');
		clicker.addClass('enabled');
			
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
	
	$(document).on('showhide', 'choice clicker, .table clicker', function () {
		var choice = $(this).parent();
		choice.children().removeClass('first last');
		choice.children('clicker:not([style*="display: none"]):first').addClass('first');
		choice.children('clicker:not([style*="display: none"]):last').addClass('last');
	});
	
	$('choice:has(row), buttonGroup:has(row)').addClass('table');
	
	$('system, #systemSwitcher choice clicker').hide();
	
	$('#systemSwitcher choice clicker').mousedown(function () {
		var btn = $(this);
		var system = btn.attr('value');
		$('system#' + system).show().siblings('system').hide();
	});
	
	$('choice > clicker[type="toggle"]:first-of-type, choice row:first-of-type clicker[type="toggle"]:first-of-type').mousedown().mouseup();
	
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
});