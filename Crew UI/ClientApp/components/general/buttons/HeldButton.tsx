import * as React from 'react';
import { Button, IBaseButtonProps } from './Button';
import { connection } from '../../../Client';

interface IHeldButtonProps extends IBaseButtonProps {
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
        
        return <Button {...this.props} className={classList} mouseDown={() => this.mouseDown()} mouseUp={() => this.mouseUp()} />;
    }
    private mouseDown() {
        this.setState({held: true});

        if (this.props.pressed != undefined)
            this.props.pressed();

        if (this.props.pressCommand !== undefined)
            connection.send(this.props.pressCommand);
    }
    private mouseUp() {
        if (!this.state.held)
            return;

        this.setState({held: false});

        if (this.props.released != undefined)
            this.props.released();
        
        if (this.props.releaseCommand !== undefined)
            connection.send(this.props.releaseCommand);
    }
}