enum FeatureState {
	Unavailable = 0,
	Disabled,
	Enabled
};

interface IButtonProps {
    visible?: boolean;
    disabled?: boolean;
    color?: any;
    hotkey?: any;
    first?: boolean;
    last?: boolean;
};

const ButtonMixin = {
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

const PushButton = React.createClass<IPushButtonProps, IPushButtonState> ({
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

const ConfirmButton = React.createClass<IConfirmButtonProps, IConfirmButtonState>({
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

const ToggleButton = React.createClass<IToggleButtonProps, IToggleButtonState>({
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

const HeldButton = React.createClass<IHeldButtonProps, IHeldButtonState>({
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
    children?: React.ReactElement<any>[];
}

class ButtonGroup extends React.Component<IButtonGroupProps, {}> {
    static defaultProps = {
		color: null, disabled: false, inline: false, visible: true, caption: null
	};
	render() {
		let props:IButtonGroupProps = {}, gcProps:IButtonGroupProps = {};
		if (this.props.color != null)
			gcProps.color = props.color = this.props.color;
		if (this.props.disabled)
			gcProps.disabled = props.disabled = true;
		
		var isTable = false;
		var children = React.Children.map(this.props.children, function (c, index:number) {
			if (c.type == "row") {
				isTable = true;
				
				props.children = React.Children.map(c.props.children, function (gc: React.ReactElement<any>, i) {
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