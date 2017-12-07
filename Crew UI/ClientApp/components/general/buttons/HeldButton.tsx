import * as React from 'react';
import { Button, ICommonButtonProps } from './Button';
import { connection } from '../../../Client';

interface IHeldButtonProps extends ICommonButtonProps {
    pressed?: () => void;
    released?: () => void;

    pressCommand?: string;
    releaseCommand?: string;
}

interface IHeldButtonState {
    held: boolean;
}

export class HeldButton extends React.Component<IHeldButtonProps, IHeldButtonState> {
    constructor(props: IHeldButtonProps) {
        super(props);
        this.state = { held: false };
    }
    render() {
        let classList = this.state.held ? 'button--held state--active' : 'button--held';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        
        return <Button className={classList} hotkey={this.props.hotkey} subtext={this.props.subtext} fullBorder={this.props.fullBorder} mouseDown={e => this.mouseDown(e)}
                mouseUp={e => this.mouseUp(e)} color={this.props.color} disabled={this.props.disabled} title={this.props.title}>{this.props.text}</Button>;
    }
    private mouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({held: true});

        if (this.props.pressed != undefined)
            this.props.pressed();

        if (this.props.pressCommand !== undefined)
            connection.send(this.props.pressCommand);
    }
    private mouseUp(e: React.MouseEvent<HTMLButtonElement>) {
        if (!this.state.held)
            return;

        this.setState({held: false});

        if (this.props.released != undefined)
            this.props.released();
        
        if (this.props.releaseCommand !== undefined)
            connection.send(this.props.releaseCommand);
    }
}