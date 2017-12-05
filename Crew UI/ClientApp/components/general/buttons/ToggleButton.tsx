import * as React from 'react';
import { Button, IButtonProps } from './Button';
import { connection } from '../../../Client';

export interface IToggleButtonProps extends IButtonProps {
    startActive?: boolean;
    activated?: () => void;
    deactivated?: () => void;
    activateCommand?: string;
    deactivateCommand?: string;

    allowUserDeactivate?: boolean;
    choiceOptionActivated?: (activated: ToggleButton) => void;
    description?: string;
}

interface IToggleButtonState {
    active: boolean;
}

export class ToggleButton extends React.Component<IToggleButtonProps, IToggleButtonState> {
    static defaultProps = {
        inChoice: false,
        startActive: false,
        allowUserDeactivate: true,
    };
    constructor(props: IToggleButtonProps) {
        super(props);
        this.state = { active: props.startActive === true };
    }
    componentWillMount() {
        if (this.props.startActive === true && this.props.choiceOptionActivated !== undefined)
            this.props.choiceOptionActivated(this);
    }
    render() {
        let classList = this.state.active ? 'button--toggle state--active' : 'button--toggle';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        
        return <Button className={classList} hotkey={this.props.hotkey} mouseClick={e => this.clicked(e)} color={this.props.color} fullBorder={this.props.fullBorder}
                disabled={this.props.disabled} text={this.props.text} subtext={this.props.subtext} title={this.props.title} />;
    }
    private clicked(e: React.MouseEvent<HTMLButtonElement>) {
        if (this.state.active) {
            if (this.props.allowUserDeactivate === false)
                return; // in a choice, don't deactivate a button by clicking on it

            if (this.props.deactivated != undefined)
               this.props.deactivated();

            if (this.props.deactivateCommand !== undefined)
                connection.send(this.props.deactivateCommand);
        }
        else {
            if (this.props.choiceOptionActivated !== undefined)
                this.props.choiceOptionActivated(this);

            if (this.props.activated != undefined)
                this.props.activated();
            
            if (this.props.activateCommand !== undefined)
                connection.send(this.props.activateCommand);
        }
        
        this.setState({active: !this.state.active});
    }
    select(selected: boolean) {
        this.setState({active: selected});
    }
}