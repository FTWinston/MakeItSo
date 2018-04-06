import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { TextLocalisation } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './Communications.scss';

interface CommunicationsProps {
    text: TextLocalisation;
}

class Communications extends ShipSystemComponent<CommunicationsProps, {}> {
    constructor(props: CommunicationsProps) {
        super(props);
        
        this.state = {
        }
    }

    name() { return 'comms'; }

    protected getHelpText() {
        return this.props.text.systemHelp.comms;
    }

    public render() {
        return <div className="system">
            This is the communications system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => CommunicationsProps = (state) => {
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
)(Communications);