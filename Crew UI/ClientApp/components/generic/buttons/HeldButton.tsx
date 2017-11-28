import * as React from 'react';
import { Button, IButtonProps } from './Button';

interface IHeldButtonProps extends IButtonProps {
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
        let classList = this.state.held ? 'button--held button--primed' : 'button--held';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        
        return <Button className={classList} hotkey={this.props.hotkey} text={this.props.text} subtext={this.props.subtext} fullBorder={this.props.fullBorder}
                mouseDown={this.mouseDown.bind(this)} mouseUp={this.mouseUp.bind(this)} color={this.props.color} disabled={this.props.disabled} title={this.props.title} />;
    }
    private mouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({held: true});

        if (this.props.pressed != undefined)
            this.props.pressed();

        /*
        if (this.props.pressCommand !== undefined)
            gameClient.server.send(this.props.pressCommand);
        */
    }
    private mouseUp(e: React.MouseEvent<HTMLButtonElement>) {
        if (!this.state.held)
            return;

        this.setState({held: false});

        if (this.props.released != undefined)
            this.props.released();
        
        /*
        if (this.props.releaseCommand !== undefined)
            gameClient.server.send(this.props.releaseCommand);
        */
    }
}