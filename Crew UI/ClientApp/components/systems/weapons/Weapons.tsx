import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { SensorView } from '~/components/general/SensorView';
import { TargetSelection } from './TargetSelection';
import { TargetSelected } from './TargetSelected';
import './Weapons.scss';

interface WeaponsProps {
    text: TextLocalisation;
    allTargets: SensorTarget[];
    selectedTarget?: SensorTarget;
}

class Weapons extends React.PureComponent<WeaponsProps, {}> {
    public render() {
        if (this.props.selectedTarget === undefined) {
            return <TargetSelection text={this.props.text} allTargets={this.props.allTargets} />
        }
        
        return <TargetSelected text={this.props.text} target={this.props.selectedTarget} />;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => WeaponsProps = (state) => {
    return {
        text: state.user.text,
        allTargets: state.sensors.targets,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Weapons);