import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { TextLocalisation } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { CardHand } from './CardHand';
import { CardSelection } from './CardSelection';
import { SystemList } from './SystemList';
import './PowerManagement.scss';

interface PowerManagementProps {
    text: TextLocalisation;
}

class PowerManagement extends ShipSystemComponent<PowerManagementProps, {}> {
    constructor(props: PowerManagementProps) {
        super(props);
        
        this.state = {
        }
    }

    name() { return 'power'; }

    protected getHelpText() {
        return this.props.text.systemHelp.power;
    }

    public render() {
        return <div className="system">
            <SystemList text={this.props.text} />
            <CardSelection text={this.props.text} />
            <CardHand text={this.props.text} />
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => PowerManagementProps = (state) => {
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
)(PowerManagement);