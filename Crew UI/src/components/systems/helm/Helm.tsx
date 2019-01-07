import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation, InputMode, OrientationCube, Rotator, Vector3 } from '~/functionality';
import { HelmState as HelmBaseProps } from './store';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { ButtonHelm } from './ButtonHelm';
import { TouchHelm } from './TouchHelm';
import './Helm.scss';

interface HelmProps extends HelmBaseProps {
    text: TextLocalisation;
    inputMode: InputMode;
    shipPos: Vector3;
    shipVel: Vector3;
    shipRot: Rotator;
    shipRotRate: Rotator;
}

export interface TypedHelmProps extends HelmBaseProps {
    text: TextLocalisation;
    shipPos: Vector3;
    shipVel: Vector3;
    shipRot: Rotator;
    shipRotRate: Rotator;
    drawOrientation: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
}

export class Helm extends ShipSystemComponent<HelmProps, {}> {
    private orientation = new OrientationCube();

    constructor(props: HelmProps) {
        super(props);
        
        this.state = {
        }
    }

    name() { return 'helm'; }

    protected getHelpText() {
        return this.props.text.systemHelp.helm;
    }

    protected getOptionLabels() {
        return this.props.text.systems.helm;
    }

    public render() {
        switch (this.props.inputMode) {
            case InputMode.KeyboardAndMouse:
                return <ButtonHelm {...this.props} drawOrientation={(ctx, w, h) => this.drawOrientation(ctx, w, h)} />;
            case InputMode.Touchscreen:
                return <TouchHelm {...this.props} drawOrientation={(ctx, w, h) => this.drawOrientation(ctx, w, h)} />;
            case InputMode.Gamepad:
                return this.renderGamepad();
        }
    }

    private renderGamepad() {
        // let words = this.props.text.systems.helm;
        
        return <div className="system helm helm--gamepadInput">
            This is the helm system. TODO: implement this!
        </div>;
    }

    private drawOrientation(ctx: CanvasRenderingContext2D, width: number, height: number) {
        let halfWidth = width / 2, halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.translate(halfWidth, halfHeight);
        ctx.fillStyle = '#0c0';
        this.orientation.draw(ctx, Math.min(halfWidth, halfHeight) * 0.65, this.props.shipRot.pitch, this.props.shipRot.yaw, this.props.shipRot.roll);
        ctx.translate(-halfWidth, -halfHeight);
    }

    static clamp(val: number) {
        val = Math.round(val);

        if (val < 0) {
            val += 360;
        } else if (val >= 360) {
            val -= 360;
        }
        
        return val;
    }

    static magnitude(x: number, y: number, z: number) {
        return Math.round(Math.sqrt(x * x + y * y + z * z));
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => HelmProps = (state) => {
    return {
        ...state.helm,
        text: state.user.text,
        shipPos: state.environment.shipPos,
        shipVel: state.environment.shipVel,
        shipRot: state.environment.shipRotation,
        shipRotRate: state.environment.shipRotationRate,
        inputMode: state.user.inputMode,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {},
    null,
    { withRef: true },
)(Helm);