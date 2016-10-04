enum FeatureState {
	Unavailable = 0,
	Disabled,
	Enabled
};

const Hotkeys = {
    bindings: {},
    showHotkeys: false,
    register(hotkey, button) {
        var keyCode = typeof hotkey === 'string' ? hotkey.charCodeAt(0) : hotkey;

        if (this.bindings.hasOwnProperty(keyCode))
            this.bindings[keyCode].push(button);
        else
            this.bindings[keyCode] = [button];
    },
	unregister(hotkey, button) {
		var keyCode = typeof hotkey === 'string' ? hotkey.charCodeAt(0) : hotkey;
		
		var keys = this.bindings[keyCode];
		var pos = keys.indexOf(button);
		if (pos != -1)
			keys.splice(pos, 1);
	},
	initialize() {
		document.onkeydown = this.onKeyDown;
		document.onkeyup = this.onKeyUp;
	},
	onKeyDown(e) {
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
				if (button.keyDown != undefined)
					button.keyDown(e);
				return;
			}
		}
	},
	onKeyUp(e){
		var presses = Hotkeys.bindings[e.which];
		if (presses === undefined)
			return;
		
		for (var i=0; i<presses.length; i++) {
			var button = presses[i];
			
			if (button.isVisible())
			{
				if (button.keyUp != undefined)
					button.keyUp(e);
				if (button.keyPress != undefined)
					button.keyPress(e);
				return;
			}
		}
	}
};

enum SwipeDir {
    Up = 0,
    Down,
    Left,
    Right
};

const TouchFunctions = {
	detectSwipe(surface, minDist, maxTime, callback) {
		if (minDist === undefined)
			minDist = 100;
		if (maxTime === undefined)
			maxTime = 500;
		
		var swipedir,
		startX, startY,
		distX, distY,
		maxPerpScale = 0.67,
		startTime, duration;

		surface.addEventListener('touchstart', function(e) {
			var touch = e.changedTouches[0];
			swipedir = null;
			distX = 0; distY = 0;
			startX = touch.clientX;
			startY = touch.clientY;
			startTime = new Date().getTime(); // record time when finger first makes contact with surface
			e.preventDefault();
		}, false);

		surface.addEventListener('touchmove', function(e) {
			e.preventDefault(); // prevent scrolling when inside DIV
		}, false);

		surface.addEventListener('touchend', function(e) {
			e.preventDefault();
			
			var touch = e.changedTouches[0];
			distX = touch.clientX - startX;
			distY = touch.clientY - startY;
			duration = new Date().getTime() - startTime;
			
			if (duration > maxTime)
				return;

			var absX = Math.abs(distX), absY = Math.abs(distY);
			if (absX >= minDist && absY <= maxPerpScale * absX)
				swipedir = (distX < 0) ? SwipeDir.Left : SwipeDir.Right;
			else if (absY >= minDist && absX <= maxPerpScale * absY)
				swipedir = (distY < 0) ? SwipeDir.Up : SwipeDir.Down;
			else
				return;
			callback(swipedir, startX, startY);
		}, false);
	},
	detectTap(surface, maxDist, maxTime, callback) {
		if (maxDist === undefined)
			maxDist = 75;
		if (maxTime === undefined)
			maxTime = 750;
		
		var startX, startY,
		distX, distY,
		startTime, duration;

		surface.addEventListener('touchstart', function(e) {
			var touch = e.changedTouches[0];
			distX = 0; distY = 0;
			startX = touch.clientX;
			startY = touch.clientY;
			startTime = new Date().getTime(); // record time when finger first makes contact with surface
			e.preventDefault();
		}, false);

		surface.addEventListener('touchmove', function(e) {
			e.preventDefault(); // prevent scrolling when inside DIV
		}, false);

		surface.addEventListener('touchend', function(e) {
			e.preventDefault();
			
			var touch = e.changedTouches[0];
			distX = touch.clientX - startX;
			distY = touch.clientY - startY;
			duration = new Date().getTime() - startTime;
			if (duration > maxTime)
				return;

			if (Math.abs(distX) > maxDist || Math.abs(distY) > maxDist)
				return;
			
			callback(startX, startY);
		}, false);
    },
    detectMovement(surface: HTMLElement, callback: (dx: number, dy: number) => void) {
		var ongoingTouches = {};
		var distX; var distY;
		
		surface.addEventListener('touchstart', function(e) {
			e.preventDefault();
			
			for (var i=0; i<e.changedTouches.length; i++) {
				var touch = e.changedTouches[i];
				ongoingTouches[touch.identifier] = { clientX: touch.clientX, clientY: touch.clientY };
			}
		}, false);

		surface.addEventListener('touchmove', function(e) {
			e.preventDefault();
			
			for (var i=0; i<e.touches.length; i++) {
				var currentTouch = e.touches[i]; // if using changedTouches instead, additional (stationary) presses wouldn't slow movement
				var prevTouch = ongoingTouches[currentTouch.identifier];
				if (prevTouch === undefined)
					continue;
				
				distX = currentTouch.clientX - prevTouch.clientX;
				distY = currentTouch.clientY - prevTouch.clientY;

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

interface IButtonProps {
    visible?: boolean;
    disabled?: boolean;
    color?: any;
    hotkey?: any;
    first?: boolean;
    last?: boolean;
};

var ButtonMixin = {
	componentDidMount() {
		if (this.props.hotkey != null)
			Hotkeys.register(this.props.hotkey, this);
	},
	componentWillUnmount() {
		if (this.props.hotkey != null)
			Hotkeys.unregister(this.props.hotkey, this);
	},
	isVisible() {
		return this.refs.btn.offsetParent !== null && this.props.visible;
	},
	prepClasses() {
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
	},
	keyDown(e) { if (this.mouseDown != undefined) this.mouseDown(); },
	keyUp(e) { if (this.mouseUp != undefined) this.mouseUp(); },
	keyPress(e) { if (this.click != undefined) this.click(); }
};

interface IPushButtonProps extends IButtonProps {
    action?: any;
    onClicked?: any;
}

interface IPushButtonState {
    pressed?: boolean;
}

var PushButton = React.createClass<IPushButtonProps, IPushButtonState> ({
    getDefaultProps(): IPushButtonProps {
		return { visible: true, disabled: false, action: null, onClicked: null, color: null, hotkey: null };
    },
    getInitialState(): IPushButtonState {
		return { pressed: false };
	},
	mixins: [ButtonMixin],
    render(): JSX.Element {
		var classes = this.prepClasses();
		if (this.state.pressed)
			classes += ' enabled';
		
		return (
			<clicker ref="btn" type="push" style={{display: this.props.visible ? null : 'none'}} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseLeave={this.mouseUp} onClick={this.click} className={classes} data-hotkey={this.props.hotkey}>
				{this.props.children}
			</clicker>
		);
	},
	mouseDown(e) {
		this.setState({ pressed: true });
	},
	mouseUp(e) {
		this.setState({ pressed: false });
	},
	click(e) {
		if (this.props.disabled)
			return;
		
		if (this.props.action != null)
			gameClient.socket.send(this.props.action);
		
		if (this.props.onClicked != null)
			this.props.onClicked();
	}
});

interface IConfirmButtonProps extends IButtonProps {
    action?: any;
}

interface IConfirmButtonState {
    primed?: boolean;
}

var ConfirmButton = React.createClass<IConfirmButtonProps, IConfirmButtonState>({
    getDefaultProps(): IConfirmButtonProps {
		return { visible: true, disabled: false, action: null, color: null, hotkey: null };
    },
    getInitialState(): IConfirmButtonState {
        return { primed: false };
    },
	mixins: [ButtonMixin],
    render() {
		var classes = this.prepClasses();
		if (this.state.primed)
			classes += ' primed';
		
		return (
			<clicker ref="btn" type="confirm" style={{display: this.props.visible ? null : 'none'}} onClick={this.click} onMouseLeave={this.mouseLeave} className={classes} data-hotkey={this.props.hotkey}>
				{this.props.children}
			</clicker>
		);
	},
	click(e) {
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
	mouseLeave(e) {
		this.setState({ primed: false });
	}
});

interface IToggleButtonProps extends IButtonProps {
    forceEnable?: boolean;
    inChoice?: boolean;
    startAction?: any;
    stopAction?: any;
    onMounted?: any;
    onSelected?: any;
    onSelectedChoice?: any;
    onDeselected?: any;
    description?: string;
}

interface IToggleButtonState {
    active?: boolean;
    pressed?: boolean;
}

var ToggleButton = React.createClass<IToggleButtonProps, IToggleButtonState>({
    getDefaultProps(): IToggleButtonProps {
		return { visible: true, forceEnable: false, disabled: false, inChoice: false, startAction: null, stopAction: null, color: null, onMounted: null, onSelected: null, onSelectedChoice: null, onDeselected: null, hotkey: null, first: false, last: false };
    },
    getInitialState(): IToggleButtonState {
        return { active: this.props.forceEnable, pressed: false };
    },
	mixins: [ButtonMixin],
	componentDidMount() {
		if (this.props.onMounted != null)
			this.props.onMounted(this);
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.forceEnable && !this.state.active)
			this.setActive(true);
	},
	render() {
		var classes = this.prepClasses();
		if (this.state.active)
			classes += ' enabled';
		
		return (
			<clicker ref="btn" type="toggle" style={{display: this.props.visible ? null : 'none'}} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onMouseLeave={this.mouseUp} className={classes} data-hotkey={this.props.hotkey}>
				{this.props.children}
			</clicker>
		);
	},
	mouseDown(e) {
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
	mouseUp(e) {
		this.setState({ pressed: false });
	},
	touchStart(e) {
		this.mouseDown(e);
		e.preventDefault();
	},
	touchEnd(e) {
		this.mouseUp(e);
		e.preventDefault();
	},
	setActive(val) {
		this.setState({ active: val });
		
		if (val && this.props.onSelected != null)
			this.props.onSelected(this);
		
		if (val && this.props.onSelectedChoice != null)
			this.props.onSelectedChoice(this);
	}
});

interface IHeldButtonProps extends IButtonProps {
    startAction?: any;
    stopAction?: any;
}

interface IHeldButtonState {
    held?: boolean;
}

var HeldButton = React.createClass<IHeldButtonProps, IHeldButtonState>({
	getDefaultProps() {
		return { visible: true, disabled: false, startAction: null, stopAction: null, color: null, hotkey: null };
	},
	getInitialState() {
        return { held: false };
    },
	mixins: [ButtonMixin],
	render() {
		var classes = this.prepClasses();
		if (this.state.held)
			classes += ' held';
		
		return (
			<clicker ref="btn" type="held" style={{display: this.props.visible ? null : 'none'}} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onMouseLeave={this.mouseUp} className={classes} data-hotkey={this.props.hotkey}>
				{this.props.children}
			</clicker>
		);
	},
	mouseDown(e) {
		if (this.props.disabled || this.state.held)
			return;
		
		if (this.props.startAction != null)
			gameClient.socket.send(this.props.startAction);
		
		this.setState({ held: true });
	},
	mouseUp(e) {
		if (this.props.disabled || !this.state.held)
			
		if (this.props.stopAction != null)
			gameClient.socket.send(this.props.stopAction);
		
		this.setState({ held: false });
	},
	touchStart(e) {
		this.mouseDown(e);
		e.preventDefault();
	},
	touchEnd(e) {
		if (this.props.disabled)
			return;
		
		this.mouseUp(e);
		e.preventDefault();
	}
});

interface IButtonGroupProps {
    color?: string;
    disabled?: boolean;
    inline?: boolean;
    visible?: boolean;
    caption?: string;
}

class ButtonGroup extends React.Component<IButtonGroupProps, {}> {
    static defaultProps = {
		color: null, disabled: false, inline: false, visible: true, caption: null
	};
	render() {
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
}

interface IChoiceProps {
    prompt?: string;
    color?: string;
    disabled?: boolean;
    inline?: boolean;
    visible?: boolean;
    children?: any;
}

interface IChoiceState {
    description?: string;
    mountedChildren?: any[];
}

class Choice extends React.Component<IChoiceProps, IChoiceState> {
    constructor(props) {
        super(props);
        this.state = { description: null, mountedChildren: [] };
    }
    static defaultProps = {
        prompt: null, color: null, disabled: false, inline: false, visible: true
    };
	render() {
		var self = this;
		var props = { inChoice: true, onSelectedChoice: self.childSelected.bind(this), onMounted: self.childMounted.bind(this), first: false, last: false };
        var gcProps = { inChoice: true, onSelectedChoice: self.childSelected.bind(this), onMounted: self.childMounted.bind(this), first: false, last: false };
		
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
				<description style={{display: this.state.description == null ? 'none' : null, visibility: this.props.disabled ? 'hidden' : null}}>{this.state.description}</description>
			</choice>
		);
	}
	childMounted(child) {
		if (this.state.mountedChildren.length == 0)
			child.setActive(true);
		this.state.mountedChildren.push(child);
	}
	childSelected(child) {
		for (var i = 0; i < this.state.mountedChildren.length; i++) {
			if (this.state.mountedChildren[i] != child)
				this.state.mountedChildren[i].setActive(false);
		}
		this.setState({description: child.props.description});
	}
}

class IAxisInputProps {
    visible?: boolean;
    direction?: string;
    caption?: string;
    color?: string;
    movementCallback?: (dx: number, dy: number) => void;
    scale?: number;
}

class AxisInput extends React.Component<IAxisInputProps, {}> {
	getDefaultProps() {
		return { visible: true, direction: 'both', caption: null, color: null, movementCallback: null, scale: 1 };
	}
	render() {
		return (
			<touchArea ref="area" className="inline" style={{display: this.props.visible ? null : 'none'}} data-caption={this.props.caption} data-direction={this.props.direction} data-mode="continuous"></touchArea>
		);
	}
    componentDidMount() {
        TouchFunctions.detectMovement(this.refs["area"] as HTMLElement, this.onMovement);
	}
	onMovement (dx, dy) {
        if (this.props.movementCallback != null)
			this.props.movementCallback(dx * this.props.scale, dy * this.props.scale);
	}
}

const CanvasComponentMixin = {
	getDefaultProps() {
		return {
			width: 300, height: 200, visible: true, minSwipeDist: undefined, maxTapDist: undefined, maxSwipeTime: undefined, maxTapTime: undefined
		};
	},
	componentDidMount () {
		var component = this;
		this.refs.canvas.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);
		
		if (this.onMouseDown !== undefined)		
			this.refs.canvas.addEventListener('mousedown', function(e) {
				var rect = component.refs.canvas.getBoundingClientRect();
				component.onMouseDown(e.which, e.clientX - rect.left, e.clientY - rect.top);
			});
		
		if (this.onMouseUp !== undefined)		
			this.refs.canvas.addEventListener('mouseup', function(e) {
				var rect = component.refs.canvas.getBoundingClientRect();
				component.onMouseUp(e.which, e.clientX - rect.left, e.clientY - rect.top);
			});
		
		if (this.onClick !== undefined)		
			this.refs.canvas.addEventListener('click', function(e) {
				var rect = component.refs.canvas.getBoundingClientRect();
				component.onClick(e.which, e.clientX - rect.left, e.clientY - rect.top);
			});
		
		if (this.onSwipe !== undefined)
			TouchFunctions.detectSwipe(this.refs.canvas, this.props.minSwipeDist, this.props.maxSwipeTime, function(dir,x,y) {
				var rect = component.refs.canvas.getBoundingClientRect();
				component.onSwipe(dir, x - rect.left, y - rect.top);
			});
		
		if (this.onTap !== undefined)
			TouchFunctions.detectTap(this.refs.canvas, this.props.maxTapDist, this.props.maxTapTime, function(x,y) {
				var rect = component.refs.canvas.getBoundingClientRect();
				component.onTap(x - rect.left, y - rect.top);
			});
		if (this.onTouchStart !== undefined)
			this.refs.canvas.addEventListener('touchstart', function(e) {
				var rect = component.refs.canvas.getBoundingClientRect();
				var touch = e.changedTouches[0];
				component.onTouchStart(touch.clientX - rect.left, touch.clientY - rect.top);
			});
		if (this.onTouchEnd !== undefined)
			this.refs.canvas.addEventListener('touchend', function(e) {
				var rect = component.refs.canvas.getBoundingClientRect();
				var touch = e.changedTouches[0];
				component.onTouchEnd(touch.clientX - rect.left, touch.clientY - rect.top);
			});
		
		this.redraw();
	},
	componentDidUpdate (prevProps, prevState) {
		this.redraw();
	},
	redraw() {
		if (this.props.visible)
			requestAnimationFrame(this.draw);
	},
	render() {
		return (
			<canvas ref="canvas" width={this.props.width} height={this.props.height} style={this.props.style} />
		);
	},
	getContext(type) {
		return this.refs.canvas.getContext(type);
	}
};