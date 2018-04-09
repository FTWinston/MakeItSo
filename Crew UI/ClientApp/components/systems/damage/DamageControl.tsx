import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { TextLocalisation } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './DamageControl.scss';

interface DamageControlProps {
    text: TextLocalisation;
}

class DamageControl extends ShipSystemComponent<DamageControlProps, {}> {
    constructor(props: DamageControlProps) {
        super(props);
        
        this.state = {
        }
    }

    name() { return 'damage'; }

    protected getHelpText() {
        return this.props.text.systemHelp.damage;
    }

    protected getOptionLabels() {
        return this.props.text.systems.damage;
    }

    public render() {
        return <div className="system">
            This is the damage control system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => DamageControlProps = (state) => {
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
)(DamageControl);