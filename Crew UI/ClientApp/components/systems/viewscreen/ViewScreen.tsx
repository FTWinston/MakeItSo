import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { TextLocalisation } from '../../../functionality';
import './ViewScreen.scss';

interface ViewScreenProps {
    text: TextLocalisation;
}

class ViewScreen extends React.Component<ViewScreenProps, {}> {
    public render() {
        return <div className="system">
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
    {}
)(ViewScreen);