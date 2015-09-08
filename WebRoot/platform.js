if (!window.console) { window.console = { log: function() {} } };

var FeatureState = {
	Unavailable: 0,
	Disabled: 1,
	Enabled: 2
};

var Features = {
	Vibration: ('vibrate' in navigator) ? FeatureState.Enabled : FeatureState.Unavailable,
	TouchInterface: ('ontouchstart' in window || navigator.msMaxTouchPoints) ? (Vibration == FeatureState.Unavailable ? FeatureState.Disabled : FeatureState.Enabled) : FeatureState.Unavailable
};

var SwipeDir = {
	Up: 0,
	Down: 1,
	Left: 2,
	Right: 3
};

function swipedetect(surface, minDist, maxTime, callback) {
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

function movedetect(surface, callback) {
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
			
			// by not updating the previous positions, the "difference" will always be relative to where the current touch started
			// this means that you don't have to keep moving your hand to keep the output moving, you just have to hold it (once it has already moved).
			//prevTouch.pageX = currentTouch.pageX;
			//prevTouch.pageY = currentTouch.pageY;
			
			callback(distX, distY);
		}
	}, false);

	var touchEnd = function(e) {
		e.preventDefault();
		
		for (var i=0; i<e.changedTouches.length; i++) {
			ongoingTouches[currentTouch.identifier] = undefined;
		}
	};
	
	surface.addEventListener('touchend', touchEnd, false);
	el.addEventListener('touchcancel', touchEnd, false);
	el.addEventListener('touchleave', touchEnd, false);
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
	
	$('choice > clicker[type="toggle"]:first-of-type, choice row:first-of-type clicker[type="toggle"]:first-of-type').mousedown().mouseup();
});