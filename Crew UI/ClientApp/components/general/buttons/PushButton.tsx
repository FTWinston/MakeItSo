import * as React from 'react';
import { Button, IButtonProps } from './Button';

interface IPushButtonProps extends IButtonProps {
    clicked?: () => void;
    command?: string;
}

interface IPushButtonState {
    held: boolean;
}

export class PushButton extends React.Component<IPushButtonProps, IPushButtonState> {
    constructor(props: IPushButtonProps) {
        super(props);
        this.state = { held: false };
    }
    render() {
        let classList = this.state.held ? 'button--push state--active' : 'button--push';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        
        return <Button className={classList} hotkey={this.props.hotkey} mouseClick={e => this.clicked(e)} color={this.props.color} disabled={this.props.disabled} fullBorder={this.props.fullBorder}
                mouseDown={e => this.mouseDown(e)} mouseUp={e => this.mouseUp(e)} title={this.props.title} text={this.props.text} subtext={this.props.subtext} />;
    }
    private clicked(e: React.MouseEvent<HTMLButtonElement>) {
        if (this.props.clicked !== undefined)
            this.props.clicked();
        
        /*
        if (this.props.command !== undefined)
            gameClient.server.send(this.props.command);
        */
    }
    private mouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({held: true});
    }
    private mouseUp(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({held: false});
    }
}