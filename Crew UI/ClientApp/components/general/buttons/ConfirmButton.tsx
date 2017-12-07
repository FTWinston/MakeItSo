import * as React from 'react';
import { Button, ICommonButtonProps } from './Button';
import { connection } from '../../../Client';

interface IConfirmButtonProps extends ICommonButtonProps {
    clicked?: () => void;
    command?: string;
}

interface IConfirmButtonState {
    primed: boolean;
}

export class ConfirmButton extends React.Component<IConfirmButtonProps, IConfirmButtonState> {
    constructor(props: IConfirmButtonProps) {
        super(props);
        this.state = { primed: false };
    }
    render() {
        let classList = this.state.primed ? 'button--confirm state--active' : 'button--confirm';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        
        return <Button className={classList} hotkey={this.props.hotkey} mouseClick={e => this.clicked(e)} buttonType="submit" color={this.props.color} fullBorder={this.props.fullBorder}
                disabled={this.props.disabled} subtext={this.props.subtext} title={this.props.title}>{this.props.text}</Button>;
    }
    autoCancel?: number;
    private clicked(e: React.MouseEvent<HTMLButtonElement>) {
        if (this.state.primed) {
            this.clearAutoCancel();

            if (this.props.clicked != undefined)
                this.props.clicked();
            
            if (this.props.command !== undefined)
                connection.send(this.props.command);
        }
        else {
            this.autoCancel = setTimeout(() => this.cancelPrime(), 10000);
        }

        this.setState({primed: !this.state.primed});
        e.preventDefault();
    }
    private cancelPrime() {
        if (this.state.primed)
            this.setState({primed: false});
        this.autoCancel = undefined;
    }
    private clearAutoCancel() {
        if (this.autoCancel !== undefined) {
            clearTimeout(this.autoCancel);
            this.autoCancel = undefined;
        }
    }
    componentWillUnmount() {
        this.clearAutoCancel();
    }
}
