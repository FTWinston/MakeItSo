import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { TextLocalisation } from '../../../functionality';
import './DamageControl.scss';

interface DamageControlProps {
    text: TextLocalisation;
}

class DamageControl extends React.Component<DamageControlProps, {}> {
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
    {}
)(DamageControl);