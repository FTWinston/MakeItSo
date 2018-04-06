import * as React from 'react';

const Help: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/help-circle.svg');
const Pause: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/pause.svg');
const Refresh: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/refresh-cw.svg');
const SkipBack: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/skip-back.svg');
const SkipForward: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/skip-forward.svg');
const X: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/x.svg');
const ArrowUp: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/arrow-up.svg');
const ArrowDown: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/arrow-down.svg');
const ArrowLeft: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/arrow-left.svg');
const ArrowRight: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/arrow-right.svg');
const RotateCCW: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/rotate-ccw.svg');
const RotateCW: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/rotate-cw.svg');
const Settings: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/settings.svg');

const HelmIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/navigation.svg');
const WarpIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/compass.svg');
const WeaponsIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/crosshair.svg');
const SensorsIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/activity.svg');
const PowerIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/power.svg');
const DamageIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/alert-triangle.svg');
const ViewScreenIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/video.svg');
const CommunicationsIcon: any = require('-!svg-react-loader?name=Icon!feather-icons/dist/icons/phone-call.svg');

export enum Icon {
    Help,
    Pause,
    Refresh,
    SkipBack,
    SkipForward,
    X,
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    RotateCCW,
    RotateCW,
    Settings,

    Helm,
    Warp,
    Weapons,
    Sensors,
    PowerManagement,
    DamageControl,
    ViewScreen,
    Communications,
}

export function renderIcon(icon: Icon, size: number | string = 24) {
    let props = {
        width: size,
        height: size,
    };

    switch (icon) {
        case Icon.Help:
            return <Help {...props} />;
        case Icon.Pause:
            return <Pause {...props} />;
        case Icon.Refresh:
            return <Refresh {...props} />;
        case Icon.SkipBack:
            return <SkipBack {...props} />;
        case Icon.SkipForward:
            return <SkipForward {...props} />;
        case Icon.X:
            return <X {...props} />;
        case Icon.ArrowUp:
            return <ArrowUp {...props} />;
        case Icon.ArrowDown:
            return <ArrowDown {...props} />;
        case Icon.ArrowLeft:
            return <ArrowLeft {...props} />;
        case Icon.ArrowRight:
            return <ArrowRight {...props} />;
        case Icon.RotateCCW:
            return <RotateCCW {...props} />;
        case Icon.RotateCW:
            return <RotateCW {...props} />;
        case Icon.Settings:
            return <Settings {...props} />;

        case Icon.Helm:
            return <HelmIcon {...props} />;
        case Icon.Warp:
            return <WarpIcon {...props} />;
        case Icon.Weapons:
            return <WeaponsIcon {...props} />;
        case Icon.Sensors:
            return <SensorsIcon {...props} />;
        case Icon.PowerManagement:
            return <PowerIcon {...props} />;
        case Icon.DamageControl:
            return <DamageIcon {...props} />;
        case Icon.ViewScreen:
            return <ViewScreenIcon {...props} />;
        case Icon.Communications:
            return <CommunicationsIcon {...props} />;
        default:
            const exhaustiveCheck: never = icon;
    }
}