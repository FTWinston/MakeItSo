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

    Helm,
    Warp,
    Weapons,
    Sensors,
    PowerManagement,
    DamageControl,
    ViewScreen,
    Communications,
}

export function renderIcon(icon: Icon) {
    switch (icon) {
        case Icon.Help:
            return <Help />;
        case Icon.Pause:
            return <Pause />;
        case Icon.Refresh:
            return <Refresh />;
        case Icon.SkipBack:
            return <SkipBack />;
        case Icon.SkipForward:
            return <SkipForward />;
        case Icon.X:
            return <X />;
        case Icon.ArrowUp:
            return <ArrowUp />;
        case Icon.ArrowDown:
            return <ArrowDown />;
        case Icon.ArrowLeft:
            return <ArrowLeft />;
        case Icon.ArrowRight:
            return <ArrowRight />;
        case Icon.RotateCCW:
            return <RotateCCW />;
        case Icon.RotateCW:
            return <RotateCW />;

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
            const exhaustiveCheck: never = icon;
    }
}