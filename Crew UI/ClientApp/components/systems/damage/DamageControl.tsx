import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { TextLocalisation } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { CardHand } from './CardHand';
import { CardSelection } from './CardSelection';
import { SystemList } from './SystemList';
import { DamageSystemType, DamageState } from "~/store/Damage";
import { connection } from "~/Client";
import './DamageControl.scss';

interface DamageControlProps extends DamageState {
    text: TextLocalisation;
}

class DamageControl extends ShipSystemComponent<DamageControlProps, {}> {
    constructor(props: DamageControlProps) {
        super(props);
        
        this.state = {
        }
    }

    name() { return 'power'; }

    protected getHelpText() {
        return this.props.text.systemHelp.power;
    }

    protected getOptionLabels() {
        return this.props.text.systems.power;
    }

    public render() {
        return <div className="system">
            <SystemList text={this.props.text} systems={this.props.systems} />
            <CardSelection text={this.props.text} cards={this.props.choice} queueSize={this.props.queueSize} />
            <CardHand text={this.props.text} cards={this.props.hand} />
        </div>;
    }

    private pickCard(cardNum: number) {
        connection.send(`dmg_pickCard ${cardNum}`);
    }

    private playCard(cardID: number, handPos: number, targetSystem: DamageSystemType) {
        connection.send(`dmg_useCard ${cardID} ${handPos} ${targetSystem}`);
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => DamageControlProps = (state) => {
    return {
        text: state.user.text,
        systems: state.damage.systems,
        choice: state.damage.choice,
        queueSize: state.damage.queueSize,
        hand: state.damage.hand,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {},
    null,
    { withRef: true },
)(DamageControl);