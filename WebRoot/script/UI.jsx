if (!window.console) { window.console = { log: function() {} } };

window.Hotkeys = {
	bindings: {},
	showHotkeys: false,
	register: function(hotkey, button) {
		var keyCode = hotkey.charCodeAt(0);
			
		if (this.bindings.hasOwnProperty(keyCode))
			this.bindings[keyCode].push(button);
		else
			this.bindings[keyCode] = [button];
	},
	initialize: function() {
		document.onkeydown = this.onKeyDown;
		document.onkeyup = this.onKeyUp;
	},
	onKeyDown: function(e) {
		var presses = Hotkeys.bindings[e.which];
		if (presses === undefined) {
			if (e.which == 112) {
				Hotkeys.showHotkeys = !Hotkeys.showHotkeys;
				gameClient.showHotkeys(Hotkeys.showHotkeys);
				
				e.preventDefault();
			}
			return;
		}
		
		for (var i=0; i<presses.length; i++) {
			var button = presses[i];
			
			if (button.isVisible())
			{
				if (button.mouseDown != undefined)
					button.mouseDown();
				return;
			}
		}
	},
	onKeyUp: function(e){
		var presses = Hotkeys.bindings[e.which];
		if (presses === undefined)
			return;
		
		for (var i=0; i<presses.length; i++) {
			var button = presses[i];
			
			if (button.isVisible())
			{
				if (button.mouseUp != undefined)
					button.mouseUp();
				if (button.click != undefined)
					button.click();
				return;
			}
		}
	}
}

window.TouchFunctions = {
	SwipeDir: {
		Up: 0,
		Down: 1,
		Left: 2,
		Right: 3
	},
	detectSwipe: function(surface, minDist, maxTime, callback) {
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
	},
	detectTap: function(surface, maxDist, maxTime, callback) {
		if (maxDist === undefined)
			maxDist = 75;
		if (maxTime === undefined)
			maxTime = 750;
		
		var startX, startY,
		distX, distY,
		startTime, duration;

		surface.addEventListener('touchstart', function(e) {
			var touch = e.changedTouches[0];
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

			if (Math.abs(distX) > maxDist || Math.abs(distY) > maxDist)
				return;
			
			callback();
		}, false);
	},
	detectMovement: function(surface, callback) {
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
};

var ButtonMixin = {
	componentDidMount: function() {
		if (this.props.hotkey != null)
			Hotkeys.register(this.props.hotkey, this);
	},
	isVisible: function() {
		return this.refs.btn.offsetParent !== null && this.props.visible;
	},
	prepClasses: function() {
		var classes = '';
		if (this.props.color != null)
			classes += 'color' + this.props.color;
		if (this.props.disabled)
			classes += ' disabled';
		if (this.props.first)
			classes += ' first';
		if (this.props.last)
			classes += ' last';
		return classes;
	}
};

window.PushButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, disabled: false, action: null, onClicked: null, color: null, hotkey: null };
	},
	mixins: [ButtonMixin],
	render: function() {
		return (
			<clicker ref="btn" type="push" style={{display: this.props.visible ? null : 'none'}} onClick={this.click} className={this.prepClasses()} data-hotkey={this.props.hotkey}>
				{this.props.children}
			</clicker>
		);
	},
	click: function(e) {
		if (this.props.disabled)
			return;
		
		if (this.props.action != null)
			gameClient.socket.send(this.props.action);
		
		if (this.props.onClicked != null)
			this.props.onClicked();
	}
});

window.ConfirmButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, disabled: false, action: null, color: null, hotkey: null };
	},
	getInitialState: function() {
        return { primed: false };
    },
	mixins: [ButtonMixin],
	render: function() {
		var classes = this.prepClasses();
		if (this.state.primed)
			classes += ' primed';
		
		return (
			<clicker ref="btn" type="confirm" style={{display: this.props.visible ? null : 'none'}} onClick={this.click} onMouseLeave={this.mouseLeave} className={classes} data-hotkey={this.props.hotkey}>
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
			gameClient.socket.send(this.props.action);
		this.setState({ primed: false });
	},
	mouseLeave: function(e) {
		this.setState({ primed: false });
	}
});

window.ToggleButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, forceEnable: false, disabled: false, inChoice: false, startAction: null, stopAction: null, color: null, onMounted: null, onSelected: null, onSelectedChoice: null, onDeselected: null, hotkey: null, first: false, last: false };
	},
	getInitialState: function() {
        return { active: this.props.forceEnable, pressed: false };
    },
	mixins: [ButtonMixin],
	componentDidMount: function() {
		if (this.props.onMounted != null)
			this.props.onMounted(this);
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.forceEnable && !this.state.active)
			this.setActive(true);
	},
	render: function() {
		var classes = this.prepClasses();
		if (this.state.active)
			classes += ' enabled';
		
		return (
			<clicker ref="btn" type="toggle" style={{display: this.props.visible ? null : 'none'}} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onMouseLeave={this.mouseUp} className={classes} data-hotkey={this.props.hotkey}>
				{this.props.children}
			</clicker>
		);
	},
	mouseDown: function(e) {
		if (this.props.disabled || this.state.pressed)
			return;

		if (this.state.active && this.props.inChoice)
			return;
		
		var nowActive = !this.state.active;
		
		var action = nowActive ? this.props.startAction : this.props.stopAction;
		if (action != null)
			gameClient.socket.send(action);
		
		if (nowActive) {
			if (this.props.onSelected != null)
				this.props.onSelected(this);
			if (this.props.onSelectedChoice != null)
				this.props.onSelectedChoice(this);
		}
		else if (this.props.onDeselected != null)
			this.props.onDeselected(this);
		
		this.setState({ active: nowActive, pressed: true });
	},
	mouseUp: function(e) {
		this.setState({ pressed: false });
	},
	touchStart: function(e) {
		this.mouseDown(e);
		e.preventDefault();
	},
	touchEnd: function(e) {
		this.mouseUp(e);
		e.preventDefault();
	},
	setActive: function(val) {
		this.setState({ active: val });
		
		if (val && this.props.onSelected != null)
			this.props.onSelected(this);
		
		if (val && this.props.onSelectedChoice != null)
			this.props.onSelectedChoice(this);
	}
});

window.HeldButton = React.createClass({
	getDefaultProps: function() {
		return { visible: true, disabled: false, startAction: null, stopAction: null, color: null, hotkey: null };
	},
	getInitialState: function() {
        return { held: false };
    },
	mixins: [ButtonMixin],
	render: function() {
		var classes = this.prepClasses();
		if (this.state.held)
			classes += ' held';
		
		return (
			<clicker ref="btn" type="held" style={{display: this.props.visible ? null : 'none'}} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onMouseLeave={this.mouseUp} className={classes} data-hotkey={this.props.hotkey}>
				{this.props.children}
			</clicker>
		);
	},
	mouseDown: function(e) {
		if (this.props.disabled || this.state.held)
			return;
		
		if (this.props.startAction != null)
			gameClient.socket.send(this.props.startAction);
		
		this.setState({ held: true });
	},
	mouseUp: function(e) {
		if (this.props.disabled || !this.state.held)
			
		if (this.props.stopAction != null)
			gameClient.socket.send(this.props.stopAction);
		
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
	}
});

window.ButtonGroup = React.createClass({
	getDefaultProps: function() {
		return { color: null, disabled: false, inline: false, visible: true, caption: null };
	},
	render: function() {
		var props = {}, gcProps = {};
		if (this.props.color != null)
			gcProps.color = props.color = this.props.color;
		if (this.props.disabled)
			gcProps.disabled = props.disabled = true;
		
		var isTable = false;
		var children = React.Children.map(this.props.children, function (c, index) {
			if (c.type == "row") {
				isTable = true;
				
				props.children = React.Children.map(c.props.children, function (gc, i) {
					return React.cloneElement(gc, gcProps);
				});
			}
			
			var child = React.cloneElement(c, props);
			delete props.children;
			return child;
		});
		
		var classes = this.props.inline ? 'inline' : '';
		if (isTable)
			classes += ' table';
		
		return (
			<buttonGroup className={classes} data-caption={this.props.caption} style={{display: this.props.visible ? null : 'none'}}>
				{children}
			</buttonGroup>
		);
	}
});

window.Choice = React.createClass({
	getDefaultProps: function() {
		return { prompt: null, color: null, disabled: false, inline: false, visible: true };
	},
	getInitialState: function() {
        return { description: null, mountedChildren: [] };
    },
	render: function() {
		var self = this;
		var props = { inChoice: true, onSelectedChoice: self.childSelected, onMounted: self.childMounted, first: false, last: false };
		var gcProps = { inChoice: true, onSelectedChoice: self.childSelected, onMounted: self.childMounted, first: false, last: false };
		
		if (this.props.color != null)
			gcProps.color = props.color = this.props.color;
		
		if (this.props.disabled)
			gcProps.disabled = props.disabled = true;
		
		// find the first and last visible children, to mark them as such
		var firstIndex = 0, lastIndex = this.props.children.length - 1;
		while (firstIndex < this.props.children.length && !this.props.children[firstIndex].props.visible) {
			firstIndex++;
		}
		while (lastIndex > 0 && !this.props.children[lastIndex].props.visible) {
			lastIndex--;
		}
		
		var isTable = false;
		var children = React.Children.map(this.props.children, function (c, index) {
			if (index == firstIndex)
				props.first = true;
			if (index == lastIndex)
				props.last = true;
			
			if (c.type == "row") {
				isTable = true;
				
				props.children = React.Children.map(c.props.children, function (gc, i) {
					return React.cloneElement(gc, gcProps);
				});
			}
			
            var child = React.cloneElement(c, props);
			
			props.first = false;
			props.last = false;
			delete props.children;
			
			return child;
		});
		
		var classes = this.props.inline ? 'inline' : '';
		if (isTable)
			classes += ' table';
		
		return (
			<choice className={classes} style={{display: this.props.visible ? null : 'none'}}>
				<prompt style={{display: this.props.prompt == null ? 'none' : null}} className={this.props.disabled ? 'disabled' : null}>{this.props.prompt}</prompt>
				{children}
				<description style={{display: this.state.description == null ? 'none' : null}} style={{visibility: this.props.disabled ? 'hidden' : null}}>{this.state.description}</description>
			</choice>
		);
	},
	childMounted: function(child) {
		if (this.state.mountedChildren.length == 0)
			child.setActive(true);
		this.state.mountedChildren.push(child);
	},
	childSelected: function(child) {
		for (var i = 0; i < this.state.mountedChildren.length; i++) {
			if (this.state.mountedChildren[i] != child)
				this.state.mountedChildren[i].setActive(false);
		}
		this.setState({description: child.props.description});
	}
});

window.AxisInput = React.createClass({
	getDefaultProps: function() {
		return { visible: true, direction: 'both', caption: null, color: null, movementCallback: null, scale: 1 };
	},
	render: function() {
		return (
			<touchArea ref="area" className="inline" style={{display: this.props.visible ? null : 'none'}} data-caption={this.props.caption} data-direction={this.props.direction} data-mode="continuous"></touchArea>
		);
	},
	componentDidMount: function () {
		TouchFunctions.detectMovement(this.refs.area, this.onMovement);
	},
	onMovement: function (dx, dy) {
		if (movementCallback != null)
			movementCallback(dx * this.props.scale, dy * this.props.scale);
	}
});

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

$(function () {
	var btnTouch = $('#btnTouchToggle');
	if (Features.TouchInterface == FeatureState.Unavailable) {
		btnTouch.hide();
		$('.touchMode').hide();
	}
});
*/