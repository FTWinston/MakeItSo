import * as React from 'react';
import { Button, IBaseButtonProps } from './Button';
import { connection } from '../../../Client';

let HelpIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/help-circle.svg');
let RefreshIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/refresh-cw.svg');

export enum Icon {
    Help,
    Refresh,
}

interface IIconButtonProps extends IBaseButtonProps {
    icon: Icon;
    clicked?: () => void;
    command?: string;
}

export class IconButton extends React.Component<IIconButtonProps, {}> {
    render() {
        let classList = 'button--icon';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        
        return <Button className={classList} hotkey={this.props.hotkey} mouseClick={e => this.clicked(e)} color={this.props.color}
                disabled={this.props.disabled} title={this.props.title} subtext={this.props.subtext}>{this.renderIcon()}</Button>;
    }

    private renderIcon() {
        switch (this.props.icon) {
            case Icon.Refresh:
                return <RefreshIcon />;
            case Icon.Help:
                return <HelpIcon />;
            default:
                const exhaustiveCheck: never = this.props.icon;
        }
    }

    private clicked(e: React.MouseEvent<HTMLButtonElement>) {
        if (this.props.clicked !== undefined)
            this.props.clicked();
        
        if (this.props.command !== undefined)
            connection.send(this.props.command);
    }
}