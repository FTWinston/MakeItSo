import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './ViewScreen.scss';

interface ViewScreenProps {
    text: TextLocalisation;
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
/*
will send the following commands based on buttons etc
view_dir f/b/k/r/u/d
view_target targetID
view_cleartarget
view_rot u/d/l/r
view_zoom 1/0
view_chase 1/0
view_reset
*/

        // let words = this.props.text.systems.view;

        return <div className="system system--buttonInput">
            This is the viewscreen system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => ViewScreenProps = (state) => {
    return {
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {},
    null,
    { withRef: true },
)(ViewScreen);