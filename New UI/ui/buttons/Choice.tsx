interface IChoiceProps extends IButtonSetBaseProps {
    prompt?: string;
}

interface IChoiceState {
    activeChild?: ToggleButton;
}

class Choice extends React.Component<IChoiceProps, IChoiceState> {
    static defaultProps = {
        vertical: false,
        allowUnselected: false,
    };
    constructor(props: IChoiceProps) {
        super(props);
        this.state = {
            activeChild: undefined
        }
    }
    render() {
        let classes = 'choice';
        if (this.props.className !== undefined)
            classes += ' ' + this.props.className;

        return (
            <div className={classes}>
                {this.props.prompt == null ? null : <div className="prompt">{this.props.prompt}</div>}
                <ButtonSet vertical={this.props.vertical} separate={this.props.separate}
                    disabled={this.props.disabled} color={this.props.color}
                    allowUnselected={this.props.allowUnselected} childActivated={this.childActivated.bind(this)}>
                        {this.props.children}
                </ButtonSet>
                {this.renderDescription()}
            </div>
        );
    }
    private renderDescription() {
        let anyDesc = false;
        React.Children.forEach(this.props.children as React.ReactNode, function (child: any) {
            if (child.props.description !== undefined)
                anyDesc = true;
        });

        if (!anyDesc)
            return undefined;

        let description: string, descClass: string;
        if (this.state.activeChild !== undefined && this.state.activeChild.props.description !== undefined) {
            description = this.state.activeChild.props.description;
            descClass = 'description';
        }
        else {
            description = '.';
            descClass = 'description hidden';
        }
        
        return <div className={descClass}>{description}</div>;
    }
    private childActivated(activated: ToggleButton) {
        if (this.state.activeChild !== undefined)
            this.state.activeChild.setState({active: false});

        this.setState({activeChild: activated});
    }
}