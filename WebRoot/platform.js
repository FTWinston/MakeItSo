if (!window.console) { window.console = { log: function() {} } };

var SwipeDir = {
	Up: 0,
	Down: 1,
	Left: 2,
	Right: 3
};

function swipedetect(el, callback) {
	var touchsurface = el,
	swipedir,
	startX,
	startY,
	distX,
	distY,
	threshold = 150, //required min distance traveled to be considered swipe
	restraint = 100, // maximum distance allowed at the same time in perpendicular direction
	allowedTime = 300, // maximum time allowed to travel that distance
	elapsedTime,
	startTime,
	handleswipe = callback || function(swipedir) {}

	touchsurface.addEventListener('touchstart', function(e){
		var touchobj = e.changedTouches[0]
		swipedir = 'none'
		dist = 0
		startX = touchobj.pageX
		startY = touchobj.pageY
		startTime = new Date().getTime() // record time when finger first makes contact with surface
		e.preventDefault()
	}, false)

	touchsurface.addEventListener('touchmove', function(e){
		e.preventDefault() // prevent scrolling when inside DIV
	}, false)

	touchsurface.addEventListener('touchend', function(e){
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		elapsedTime = new Date().getTime() - startTime // get time elapsed
		if (elapsedTime <= allowedTime){ // first condition for awipe met
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
				swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
			}
			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
				swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
			}
		}
		handleswipe(swipedir)
		e.preventDefault()
	}, false)
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