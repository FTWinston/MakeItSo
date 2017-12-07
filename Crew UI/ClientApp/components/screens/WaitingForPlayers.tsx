import * as React from 'react';
import { connect } from 'react-redux';
import { store, connection }  from '../../Client';
import { ApplicationState }  from '../../store';
import * as CrewStore from '../../store/User';
import { TextLocalisation } from '../../functionality';
import { PushButton, ButtonColor, Field, Screen } from '../general';

interface WaitingProps {
    playerNames: string[];
    text: TextLocalisation;
}

class WaitingForPlayers extends React.Component<WaitingProps, {}> {
    public render() {
        let words = this.props.text.screens.waiting;

        return <Screen heading={words.intro} pageLayout={true}>
            <Field centered={true} labelText={words.players}>
                <ul>
                    {this.props.playerNames.map((n, id) => <li key={id}>{n}</li>)}
                </ul>
            </Field>
            
            <Field centered={true}>
                <PushButton color={ButtonColor.Tertiary} clicked={() => this.continue()} text={this.props.text.common.ready} />
            </Field>
        </Screen>;
    }

    private continue() {
        connection.send('all_present');
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => WaitingProps = (state) => {
    return {
        playerNames: state.crew.players.map(p => p.name),
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(WaitingForPlayers);