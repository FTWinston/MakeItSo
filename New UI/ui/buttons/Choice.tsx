/*
class DropdownSettings {
    label: string;
    popUpwards: boolean = false;
}
*/
interface IChoiceProps extends IButtonSetBaseProps {
    //dropdown?: DropdownSettings;
}

interface IChoiceState {
    activeChild?: ToggleButton;
    //expanded?: boolean;
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

        let description: string, descStyle: React.CSSProperties | undefined;
        if (this.state.activeChild !== undefined && this.state.activeChild.props.description !== undefined) {
            description = this.state.activeChild.props.description;
            descStyle = undefined;
        }
        else {
            description = '.';
            descStyle = {'visibility': 'hidden'};
        }

        return (
            <ButtonSet className={classes} vertical={this.props.vertical}
                prompt={this.props.prompt} disabled={this.props.disabled} color={this.props.color}
                    allowUnselected={this.props.allowUnselected} childActivated={this.childActivated.bind(this)}>
                    {this.props.children}
                    <div className="description" style={descStyle}>{description}</div>
            </ButtonSet>
        );
    }
    private childActivated(activated: ToggleButton) {
        if (this.state.activeChild !== undefined)
            this.state.activeChild.setState({active: false});

        this.setState({activeChild: activated});
    }
}