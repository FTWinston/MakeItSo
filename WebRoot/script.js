var ws = new WebSocket('ws://' + location.host + '/ws');
if (!window.console) { window.console = { log: function() {} } };

ws.onerror = shutdown;
ws.onclose = shutdown;
ws.onmessage = messageReceived;

function messageReceived(ev) {
	console.log(ev);
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
		$('#setupLink').removeClass('taken');
	}
	else if (m[0] == 'setup-') {
		$('#setupLink').addClass('taken');
	}
	else if (m[0] == 'setup') {
		$('#systemSelect').hide();
		$('#gameSetup').show();
	}
	else if (m[0] == 'full') {
		showError('This ship is full: there is no room for you to join.');
	}
	else if (m[0] == 'game+') {
		$('#systemSelect, gameSetup').hide();
		$('#gameActive').show();
		$('#setupLink').removeClass('taken');
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
	
	$('body > div').hide();
	$('#error').show();
}

$(function () {
	$('#systemList li.option').click(function () {
		var btn = $(this);
		var operation = btn.hasClass('selected') ? '-sys ' : '+sys ';
		btn.toggleClass('selected');
		ws.send(operation + btn.attr('value'));
	});
	
	$('#setupLink').click(function () {
		if ($(this).hasClass('taken'))
			return;
		
		ws.send('+setup');
	});
	$('#gameSetup .backLink').click(function() {
		ws.send('-setup');
		$('#gameSetup').hide();
		$('#systemSelect').show();
	});
	
	$('#gameSetup ul li.option').click(function () {
		var btn = $(this);
		
		if (btn.hasClass('selected'))
			return;
		
		btn.addClass('selected');
		btn.siblings('.option.selected').removeClass('selected');
	});
	
	$('#gameSetup ul li.option:first-child').click();
	
	$('#gameType li.option').click(function () {
		var option = this.getAttribute('value');
		var val = '';
		
		var arena = $('#gameMode li.option[value="arena"]');
		arena.removeClass('disabled');
		
		var showSetup = true;
		
		if (option == 'solo') {
			val = 'Play against the computer, with no other human crews.';
			arena.addClass('disabled');
		}
		else if (option == 'join') {
			val = 'Join a game being hosted by another human crew.';
			showSetup = false;
		}
		else if (option == 'host')
			val = 'Host a game which other human crews can connect to.';
		
		document.getElementById('gameTypeDescription').innerHTML = val;
		
		var elements = $('#gameMode, #gameModeDescription');
		if (showSetup)
			elements.show();
		else
			elements.hide();
	});
	
	$('#gameMode li.option').click(function () {
		var option = this.getAttribute('value');
		var val = '';
		
		if (option == 'exploration')
			val = 'Carry out missions, explore the galaxy, and boldly go where no one has gone before.';
		else if (option == 'arena')
			val = 'Human-crewed ships compete to death in a single star system.';
		else if (option == 'endurance')
			val = 'Survive for as long as possible against endless waves of computer-controlled ships.';
		
		document.getElementById('gameModeDescription').innerHTML = val;
	});
	
	$('#confirmLink').click(function () {
		ws.send('startGame');
	});
	
	$('#forward').mousedown(function(){
		ws.send('+forward');
	}).mouseup(function(){
		ws.send('-forward');
	}).mouseleave(function(){
		ws.send('-forward');
	});
});