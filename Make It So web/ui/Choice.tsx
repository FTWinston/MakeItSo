﻿interface IChoiceProps {
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
		var props:IButtonProps = { inChoice: true, onActivatedChoice: this.childSelected.bind(this), onMounted: this.childMounted.bind(this), first: false, last: false };
        var gcProps:IButtonProps = { inChoice: true, onActivatedChoice: this.childSelected.bind(this), onMounted: this.childMounted.bind(this), first: false, last: false };
		
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
		var children = React.Children.map(this.props.children, function (c, index:number) {
			if (index == firstIndex)
				props.first = true;
			if (index == lastIndex)
				props.last = true;
			
			if (c.type == "row") {
				isTable = true;
				
				props.children = React.Children.map(c.props.children, function (gc: React.ReactElement<any>, i) {
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
                this.state.mountedChildren[i].setActive(this.state.mountedChildren[i] == child);
		}
		this.setState({description: child.props.description});
	}
}