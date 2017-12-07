import * as React from 'react';
import { Button, IBaseButtonProps } from './Button';
import { connection } from '../../../Client';

let HelpIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/help-circle.svg');
let PauseIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/pause.svg');
let RefreshIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/refresh-cw.svg');
let SkipBack: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/skip-back.svg');
let SkipForward: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/skip-forward.svg');

let HelmIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/navigation.svg');
let WarpIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/compass.svg');
let WeaponsIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/crosshair.svg');
let SensorsIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/activity.svg');
let PowerIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/power.svg');
let DamageIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/alert-triangle.svg');
let ViewScreenIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/video.svg');
let CommunicationsIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/phone-call.svg');

export enum Icon {
    Help,
    Pause,
    Refresh,
    SkipBack,
    SkipForward,

    Helm,
    Warp,
    Weapons,
    Sensors,
    PowerManagement,
    DamageControl,
    ViewScreen,
    Communications,
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
            case Icon.Help:
                return <HelpIcon />;
            case Icon.Pause:
                return <PauseIcon />;
            case Icon.Refresh:
                return <RefreshIcon />;
            case Icon.SkipBack:
                return <SkipBack />;
            case Icon.SkipForward:
                return <SkipForward />;
            case Icon.Helm:
                return <HelmIcon />;
            case Icon.Warp:
                return <WarpIcon />;
            case Icon.Weapons:
                return <WeaponsIcon />;
            case Icon.Sensors:
                return <SensorsIcon />;
            case Icon.PowerManagement:
                return <PowerIcon />;
            case Icon.DamageControl:
                return <DamageIcon />;
            case Icon.ViewScreen:
                return <ViewScreenIcon />;
            case Icon.Communications:
                return <CommunicationsIcon />;
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