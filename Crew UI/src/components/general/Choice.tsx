import * as React from 'react';
import { ButtonSet, IButtonSetBaseProps } from './ButtonSet';
import { ToggleButton } from './buttons';
import './Choice.scss';

interface IChoiceProps extends IButtonSetBaseProps {
    prompt?: string;
}

interface IChoiceState {
    activeChild?: ToggleButton;
}

export class Choice extends React.Component<IChoiceProps, IChoiceState> {
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

        let prompt = this.props.prompt == null ? null : <div className="choice__prompt">{this.props.prompt}</div>;

        return (
            <div className={classes}>
                {prompt}
                <ButtonSet vertical={this.props.vertical}
                    disabled={this.props.disabled} color={this.props.color}
                    allowUnselected={this.props.allowUnselected} childActivated={c => this.childActivated(c)}>
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
            descClass = 'choice__description';
        }
        else {
            description = '.';
            descClass = 'choice__description choice__description--hidden';
        }
        
        return <div className={descClass}>{description}</div>;
    }

    private childActivated(activated: ToggleButton) {
        if (this.state.activeChild !== undefined)
            this.state.activeChild.setState({active: false});

        this.setState({activeChild: activated});
    }
}