import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation, InputMode } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './ViewScreen.scss';

interface ViewScreenProps {
    text: TextLocalisation;
    inputMode: InputMode;
}

class ViewScreen extends ShipSystemComponent<ViewScreenProps, {}> {
    constructor(props: ViewScreenProps) {
        super(props);
        
        this.state = {
        }
    }

    name() { return 'view'; }

    protected getHelpText() {
        return this.props.text.systemHelp.view;
    }

    protected getOptionLabels() {
        return this.props.text.systems.view;
    }

    public render() {
        switch (this.props.inputMode) {
            case InputMode.KeyboardAndMouse:
                return this.renderButtons();
            case InputMode.Touchscreen:
                return this.renderTouch();
            case InputMode.Gamepad:
                return this.renderGamepad();
        }
    }

    private renderButtons() {
        // let words = this.props.text.systems.view;

        return <div className="system system--buttonInput">
            This is the viewscreen system. TODO: implement this!
        </div>;
    }

    private renderTouch() {
        // let words = this.props.text.systems.view;
        
        return <div className="system system--touchInput">
            This is the viewscreen system. TODO: implement this!
        </div>;
    }

    private renderGamepad() {
        // let words = this.props.text.systems.view;
        
        return <div className="system system--gamepadInput">
            This is the viewscreen system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => ViewScreenProps = (state) => {
    return {
        text: state.user.text,
        inputMode: state.user.inputMode,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {},
    null,
    { withRef: true },
)(ViewScreen);