import * as React from 'react';
import { Button, IBaseButtonProps } from './Button';
import { connection } from '~/Client';

interface IPushButtonProps extends IBaseButtonProps {
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
        
        return <Button {...this.props} className={classList} mouseClick={e => this.clicked(e)}
                mouseDown={() => this.mouseDown()} mouseUp={() => this.mouseUp()} />;
    }
    private clicked(e: React.MouseEvent<HTMLButtonElement>) {
        if (this.props.clicked !== undefined)
            this.props.clicked();
        
        if (this.props.command !== undefined)
            connection.send(this.props.command);
    }
    private mouseDown() {
        this.setState({held: true});
    }
    private mouseUp() {
        this.setState({held: false});
    }
}