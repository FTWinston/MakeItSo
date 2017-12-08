import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { TextLocalisation } from '../../../functionality';
import './Weapons.scss';

interface WeaponsProps {
    text: TextLocalisation;
}

class Weapons extends React.Component<WeaponsProps, {}> {
    public render() {
        return <div className="system">
            This is the weapons system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => WeaponsProps = (state) => {
    return {
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Weapons);