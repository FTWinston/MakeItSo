import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { TextLocalisation } from '../../../functionality';
import './Warp.scss';

interface WarpProps {
    text: TextLocalisation;
}

class Warp extends React.Component<WarpProps, {}> {
    public render() {
        return <div className="system">
            This is the warp system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => WarpProps = (state) => {
    return {
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Warp);