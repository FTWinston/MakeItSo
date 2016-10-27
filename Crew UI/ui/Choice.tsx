class DropdownSettings {
    label: string;
    popUpwards: boolean = false;
}

interface IChoiceProps {
    prompt?: string;
    color?: string;
    disabled?: boolean;
    inline?: boolean;
    visible?: boolean;
    children?: any;
    class?: string;
    dropdown?: DropdownSettings;
}

interface IChoiceState {
    description?: string;
    mountedChildren?: Button[];
    expanded?: boolean;
}

class Choice extends React.Component<IChoiceProps, IChoiceState> {
    constructor(props) {
        super(props);
        this.state = { description: null, mountedChildren: [], expanded: false };
    }
    static defaultProps = {
        prompt: null, color: null, disabled: false, inline: false, visible: true, class: '', dropdown: null
    };
    render() {
        var self = this;
        var props:IButtonProps = { inChoice: true, onActivatedChoice: this.childSelected.bind(this), onMounted: this.childMounted.bind(this), first: false, last: false };
        
        if (this.props.color != null)
            props.color = this.props.color;
        
        if (this.props.disabled)
            props.disabled = true;
        
        // find the first and last visible children, to mark them as such
        var firstIndex = 0, lastIndex = this.props.children.length - 1;
        while (firstIndex < this.props.children.length && (!this.props.children[firstIndex].props.visible || this.props.children[firstIndex].props.type != ButtonType.Toggle)) {
            firstIndex++;
        }
        while (lastIndex >= firstIndex && !this.props.children[lastIndex].props.visible) {
            lastIndex--;
        }
        var isTable = false;
        var children = React.Children.map(this.props.children, function (c, index:number) {
            if (index == firstIndex)
                props.first = true;
            if (index == lastIndex)
                props.last = true;

            if (c.type == 'row') {
                isTable = true;
                
                var lastSubChild = c.props.children.length - 1;
                props.children = React.Children.map(c.props.children, function (sc: React.ReactElement<any>, childIndex) {
                    let cacheFirst = props.first;
                    props.first = index == childIndex && index == 0;

                    let cacheLast = props.last;
                    if (childIndex != lastSubChild)
                        props.last = false;

                    var subChild = React.cloneElement(sc, props);

                    props.first = cacheFirst;
                    props.last = cacheLast;
                    return subChild;
                });
            }
            
            var child = React.cloneElement(c, props);
            
            props.first = false;
            props.last = false;
            delete props.children;
            
            return child;
        });

        var classes = this.props.class;
        if (this.state.expanded)
            classes += ' forceVertical';
        if (this.props.inline)
            classes += ' inline';
        else if (isTable && !this.state.expanded)
            classes += ' table';
        
        var expander = this.props.dropdown == null ? null : (
            <Button type={ButtonType.Push} color={this.props.color} disabled={this.props.disabled} class="expand" onPressed={function () {self.setState({expanded: !self.state.expanded})}}>{this.props.dropdown.label}</Button>
        );

        return (
            <choice className={classes} style={{display: this.props.visible ? null : 'none'}}>
                { this.props.prompt == null ? '' : <prompt className={this.props.disabled ? 'disabled' : null}>{this.props.prompt}</prompt> }
                { expander }
                <options className={expander == null ? null : (this.props.dropdown.popUpwards ? 'popUpward' : 'popDownward')}>
                    {children}
                </options>
                { this.state.description == null ? '' : <description style={{visibility: this.props.disabled ? 'hidden' : null}}>{this.state.description}</description> }
            </choice>
        );
    }
    componentDidMount() {
        let children = this.state.mountedChildren;
        if (children.length == 0)
            return;

        // if no mounted children are active, make the first one active
        for (let i=0; i<children.length; i++)
            if (children[i].state.active)
                return;

        children[0].setActive(true);
    }
    childMounted(child) {
        if (child.props.type != ButtonType.Toggle)
            return;

        this.state.mountedChildren.push(child);
    }
    childSelected(child) {
        for (var i = 0; i < this.state.mountedChildren.length; i++) {
            var checkChild = this.state.mountedChildren[i];
            if (checkChild != child && checkChild.state.active)
                checkChild.setActive(false);
        }
        
        this.setState({expanded: false, description: child.props.description});
    }
}