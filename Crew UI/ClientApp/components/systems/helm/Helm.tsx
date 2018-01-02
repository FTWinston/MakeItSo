import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { TextLocalisation, InputMode, OrientationCube } from '../../../functionality';
import { HelmState as HelmBaseProps } from '../../../store/Helm';
import { ButtonHelm } from './Buttons/ButtonHelm';
import { TouchHelm } from './TouchHelm';
import './Helm.scss';

interface HelmProps extends HelmBaseProps {
    text: TextLocalisation;
    inputMode: InputMode;
}

export interface TypedHelmProps extends HelmBaseProps {
    text: TextLocalisation;
    drawOrientation: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
}

const orientation = new OrientationCube();

export class Helm extends React.PureComponent<HelmProps, {}> {
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

    private renderTouch() {
        let words = this.props.text.systems.helm;
        
        return <div className="system helm helm--touchInput">
            This is the helm system. TODO: implement this!
        </div>;
    }

    private renderGamepad() {
        let words = this.props.text.systems.helm;
        
        return <div className="system helm helm--gamepadInput">
            This is the helm system. TODO: implement this!
        </div>;
    }

    private drawOrientation(ctx: CanvasRenderingContext2D, width: number, height: number) {
        let halfWidth = width / 2, halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.translate(halfWidth, halfHeight);
        ctx.fillStyle = '#0c0';
        orientation.draw(ctx, Math.min(halfWidth, halfHeight) * 0.65, this.props.pitch, this.props.yaw, this.props.roll);
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
        inputMode: state.user.inputMode,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Helm);