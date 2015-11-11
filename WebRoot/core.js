"use strict";

if (!window.console) { window.console = { log: function() {} } };

function createConnection()
{
	ws = new WebSocket('ws://' + location.host + '/ws');
	ws.onerror = ws.onclose = function (e) { gameClient.showError("The connection to your ship has been lost.\nIf the game is still running, check your network connection.", true); }
	ws.onmessage = messageReceived;
}

function messageReceived(ev) {
	var m = (ev.data || '').split(' ', 2);
	var cmd = m[0];
	
	if (cmd == 'id') {
		gameClient.setPlayerID(m[1]);
		gameClient.setActiveScreen('systems');
	}
	else if (cmd == 'sys+') {
		gameClient.markSystemInUse(m[1], false);
	}
	else if (cmd == 'sys-') {
		gameClient.markSystemInUse(m[1], true);
	}
	else if (cmd == 'setup+') {
		gameClient.setupScreenInUse(false);
	}
	else if (cmd == 'setup-') {
		gameClient.setupScreenInUse(true);
	}
	else if (cmd == 'setup') {
		gameClient.setActiveScreen('setup');
	}
	else if (cmd == 'full') {
		gameClient.showError('This ship is full: there is no room for you to join.', true);
	}
	else if (cmd == 'started') {
		gameClient.gameAlreadyStarted();
		gameClient.showError('This game has already started: wait for the crew to pause or end the game, then try again.', false);
	}
	else if (cmd == 'paused') {
		gameClient.gameAlreadyStarted();
		gameClient.setActiveScreen('systems');
	}
	else if (cmd == 'game+') {
		gameClient.setActiveScreen('game');
	}
	else if (cmd == 'game-') {
		var blame = m.length > 1 ? 'User \'' + m[1] + '\' ended the game.' : 'The game has ended.';
		gameClient.showError(blame + ' Please wait...', false);

		setTimeout(function() { gameClient.setActiveScreen('systems'); }, 3000);
	}
	else if (cmd == 'pause+') {
		gameClient.setActiveScreen('systems');
	}
	else if (cmd == 'pause-') {
		gameClient.setActiveScreen('game');
	}
};

/*
var FeatureState = {
	Unavailable: 0,
	Disabled: 1,
	Enabled: 2
};

var Features = {
	Vibration: ('vibrate' in navigator) ? FeatureState.Enabled : FeatureState.Unavailable,
	TouchInterface: ('ontouchstart' in window || navigator.msMaxTouchPoints) ? FeatureState.Disabled : FeatureState.Unavailable
};

var SwipeDir = {
	Up: 0,
	Down: 1,
	Left: 2,
	Right: 3
};

function detectSwipe(surface, minDist, maxTime, callback) {
	if (minDist === undefined)
		minDist = 100;
	if (maxTime === undefined)
		maxTime = 500;
	
	var swipedir,
	startX, startY,
	distX, distY,
	maxPerpDist = minDist * 0.67,
	startTime, duration;

	surface.addEventListener('touchstart', function(e) {
		var touch = e.changedTouches[0];
		swipedir = 'none';
		dist = 0;
		startX = touch.pageX;
		startY = touch.pageY;
		startTime = new Date().getTime(); // record time when finger first makes contact with surface
		e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e) {
		e.preventDefault(); // prevent scrolling when inside DIV
	}, false);

	surface.addEventListener('touchend', function(e) {
		e.preventDefault();
		
		var touch = e.changedTouches[0];
		distX = touch.pageX - startX;
		distY = touch.pageY - startY;
		duration = new Date().getTime() - startTime;
		if (duration > maxTime)
			return;
	
		if (Math.abs(distX) >= minDist && Math.abs(distY) <= maxPerpDist) {
			swipedir = (distX < 0) ? SwipeDir.Left : SwipeDir.Right;
		}
		else if (Math.abs(distY) >= minDist && Math.abs(distX) <= maxPerpDist) {
			swipedir = (distY < 0) ? SwipeDir.Up : SwipeDir.Down;
		}
		callback(swipedir);
	}, false);
}

function detectMovement(surface, callback) {
	var ongoingTouches = {};
	var distX; var distY;
	
	surface.addEventListener('touchstart', function(e) {
		e.preventDefault();
		
		for (var i=0; i<e.changedTouches.length; i++) {
			var touch = e.changedTouches[i];
			ongoingTouches[touch.identifier] = { pageX: touch.pageX, pageY: touch.pageY };
		}
	}, false);

	surface.addEventListener('touchmove', function(e) {
		e.preventDefault();
		
		for (var i=0; i<e.touches.length; i++) {
			var currentTouch = e.touches[i]; // if using changedTouches instead, additional (stationary) presses wouldn't slow movement
			var prevTouch = ongoingTouches[currentTouch.identifier];
			if (prevTouch === undefined)
				continue;
			
			distX = currentTouch.pageX - prevTouch.pageX;
			distY = currentTouch.pageY - prevTouch.pageY;

			callback(distX, distY);
		}
	}, false);

	var touchEnd = function(e) {
		e.preventDefault();
		
		for (var i=0; i<e.changedTouches.length; i++) {
			var touch = e.changedTouches[i];
			ongoingTouches[touch.identifier] = undefined;
			callback(0, 0);
		}
	};
	
	surface.addEventListener('touchend', touchEnd, false);
	surface.addEventListener('touchcancel', touchEnd, false);
	surface.addEventListener('touchleave', touchEnd, false);
}

$(function () {
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
});
*/