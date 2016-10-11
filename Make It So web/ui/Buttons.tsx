enum ButtonType {
    Push,
    Confirm,
    Toggle,
    Held,
}

interface IButtonProps {
    type?: ButtonType;
    visible?: boolean;
    disabled?: boolean;
    color?: any;
    hotkey?: any;
    first?: boolean;
    last?: boolean;
    forceActive?: boolean;
    inChoice?: boolean;
    description?: string;
    class?: string;

    action?: string; // DO AWAY WITH THESE
    startAction?: string;
    stopAction?: string;

    onClicked?: () => void;
    onActivated?: () => void;
    onDeactivated?: () => void;
    onPressed?: () => void;
    onReleased?: () => void;

    onMounted?: (Button) => void;
    onActivatedChoice?: (Button) => void;
    children?: React.ReactElement<any>[];
};

interface IButtonState {
    pressed?: boolean;
    active?: boolean;
}

class Button extends React.Component<IButtonProps, IButtonState> {
    static defaultProps = {
        type: ButtonType.Push, visible: true, disabled: false, first: false, last: false, color: null, hotkey: null, class: '',
        action: null, startAction: null, stopAction: null,
        onClicked: null, onActivated: null, onDeactivated: null, onPressed: null, onReleased: null,
        forceActive: false, inChoice: false, onMounted: null, onActivatedChoice: null
    }
    constructor(props) {
        super(props);
        this.state = { pressed: false, active: props.forceActive };
    }
	componentDidMount() {
		if (this.props.hotkey != null)
			Hotkeys.register(this.props.hotkey, this);

		if (this.props.onMounted != null)
			this.props.onMounted(this);
	}
	componentWillUnmount() {
		if (this.props.hotkey != null)
			Hotkeys.unregister(this.props.hotkey, this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.forceActive && !this.state.active)
			this.setActive(true);
	}
    render():JSX.Element {
		return (
            <clicker ref="btn" type={this.getTypeAttribute()} style={{display: this.props.visible ? null : 'none'}} onMouseDown={this.mouseDown.bind(this)} onMouseUp={this.mouseUp.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick={this.click.bind(this)} onTouchStart={this.touchStart.bind(this)} onTouchEnd={this.touchEnd.bind(this)} className={this.prepClasses()} data-hotkey={this.props.hotkey}>
				{this.props.children}
			</clicker>
		);
	}
	isVisible() {
		return this.props.visible && (this.refs['btn'] as HTMLElement).offsetParent !== null;
	}
    prepClasses() {
        var classes = this.props.class;
		if (this.props.color != null)
			classes += ' color' + this.props.color;
		if (this.props.disabled)
			classes += ' disabled';
		if (this.props.first)
			classes += ' first';
		if (this.props.last)
			classes += ' last';
        
        // these 3 classes look ripe for combining into one
        if (this.props.type == ButtonType.Push && this.state.pressed)
			classes += ' enabled';

        if (this.props.type == ButtonType.Confirm && this.state.active)
			classes += ' primed';

		if (this.props.type == ButtonType.Held && this.state.active)
			classes += ' held';

        if (this.props.type == ButtonType.Toggle && this.state.active)
			classes += ' enabled';

		return classes;
	}
    getTypeAttribute() {
        switch (this.props.type) {
            case ButtonType.Push:
                return 'push';
            case ButtonType.Confirm:
                return 'confirm';
            case ButtonType.Toggle:
                return 'toggle';
            case ButtonType.Held:
                return 'held';
            default:
                return 'unknown';
        }
    }
	keyDown(e) { this.mouseDown(e); }
	keyUp(e) { this.mouseUp(e); }
	keyPress(e) { this.click(e); }
    mouseDown(e) {
        if (this.state.pressed || this.props.disabled)
            return;

        if (this.props.type == ButtonType.Toggle && this.state.active && this.props.inChoice)
			return;

        if (this.props.type == ButtonType.Held) {
            if (this.state.active)
                return;
            this.setState({ active: true });
        }

        if (this.props.type == ButtonType.Toggle) {
            var nowActive = !this.state.active;
		
		    var action = nowActive ? this.props.startAction : this.props.stopAction;
		    if (action != null)
			    gameClient.server.send(action);
		
		    if (nowActive) {
			    if (this.props.onActivated != null)
				    this.props.onActivated();
			    if (this.props.onActivatedChoice != null)
				    this.props.onActivatedChoice(this);
		    }
		    else if (this.props.onDeactivated != null)
			    this.props.onDeactivated();
		    this.setState({ active: nowActive, pressed: true });
        }
        else {
		    if (this.props.startAction != null)
			    gameClient.server.send(this.props.startAction);
		    this.setState({ pressed: true });
        }

        if (this.props.onPressed != null)
            this.props.onPressed();
	}
    mouseUp(e) {
        if (!this.state.pressed || this.props.disabled)
            return;

        if (this.props.type == ButtonType.Held) {
            if (!this.state.active)
                return;
            this.setState({ active: false });
        }

		if (this.props.stopAction != null)
            gameClient.server.send(this.props.stopAction);

		this.setState({ pressed: false });
        if (this.props.onReleased != null)
            this.props.onReleased();
	}
    mouseLeave(e) {
        if (this.props.type == ButtonType.Confirm && this.state.active)
	        this.setState({ active: false });

        this.mouseUp(e);
    }
	touchStart(e) {
        if (this.props.type == ButtonType.Held || this.props.type == ButtonType.Toggle) {
		    this.mouseDown(e);
		    e.preventDefault();
        }
	}
	touchEnd(e) {
		if (this.props.disabled)
			return;
		
        if (this.props.type == ButtonType.Held || this.props.type == ButtonType.Toggle) {
    		this.mouseUp(e);
		    e.preventDefault();
        }
	}
	click(e) {
		if (this.props.disabled)
			return;
		
		if (this.props.type == ButtonType.Confirm) {
            if (!this.state.active) {
			    this.setState({ active: true });
			    return;
            }
            else
                this.setState({ active: false });
		}
		
		if (this.props.action != null)
			gameClient.server.send(this.props.action);

		if (this.props.onClicked != null)
			this.props.onClicked();
	}
	setActive(val) {
		this.setState({ active: val });
		
		if (val && this.props.onActivated != null)
			this.props.onActivated();
		
		if (val && this.props.onActivatedChoice != null)
			this.props.onActivatedChoice(this);
	}
}

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