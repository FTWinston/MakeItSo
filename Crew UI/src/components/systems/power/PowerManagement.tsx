import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { actionCreators, maxHandSize, getPowerCardInfo, PowerState, PowerSystemType } from './store';
import { TextLocalisation } from '~/functionality';
import { connection } from '~/index';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { SystemList } from './SystemList';
import './PowerManagement.scss';
import { CardSet } from './CardSet';
import { SelectionIndicator } from './SelectionIndicator';
import { ConfirmButton, ButtonColor, PushButton } from '~/components/general';

interface IProps extends PowerState {
    text: TextLocalisation;
    selectCard: (handPos?: number) => void;
}

const enum ExpandSection {
    None = 0,
    Selection,
    SpecificCard,
}

interface IState {
    expand: ExpandSection;
}

class PowerManagement extends ShipSystemComponent<IProps, IState> {
    constructor(props: IProps) { 
        super(props);
        this.state = {
            expand: ExpandSection.None,
        };
    }

    name() { return 'power'; }

    protected getHelpText() {
        return this.props.text.systemHelp.power;
    }

    protected getOptionLabels() {
        return this.props.text.systems.power;
    }

    public render() {
        const systemText = this.props.text.systems.power;

        const selectedCard = this.props.selectedHandPos === undefined
            ? null
            : getPowerCardInfo(this.props.handCards[this.props.selectedHandPos], this.props.text);

        const selectSystem = selectedCard === null || !selectedCard.selectTarget
            ? undefined
            : (system: PowerSystemType) => this.selectSystem(system);

        const handNotFull = this.props.handCards.length < maxHandSize;

        const queueSize = this.props.queueSize <= 0
            ? undefined
            : <SelectionIndicator
                className="power__selectionIndicator"
                text={this.props.text}
                queueSize={this.props.queueSize}
                selected={() => this.setState({ expand: ExpandSection.Selection })}
            />

        const selectionActions = this.props.choiceCards.length === 0
            ? undefined
            : <div className="power_selectionActions">
                <ConfirmButton
                    className="power__discardChoice"
                    color={ButtonColor.Secondary}
                    text={systemText.discardChoice}
                    clicked={() => this.pickCard(-1)}
                />
                <PushButton
                    className="power__selectionBack"
                    color={ButtonColor.Secondary}
                    text={this.props.text.common.cancel}
                    clicked={() => this.setState({ expand: ExpandSection.None })}
                />
            </div>

        const cardSelected = handNotFull
            ? (num: number) => this.pickCard(num)
            : undefined;

        let classes = 'system power';
        if (this.state.expand === ExpandSection.Selection) {
            classes += ' power--selection';
        }

        return <div className={classes}>
            <SystemList
                text={this.props.text}
                systems={this.props.systems}
                systemSelected={selectSystem}
            />
            <div className="power__handLabel">{systemText.handLabel}</div>
            <div className="power__selectionLabel">{systemText.choiceLabel}</div>
            {queueSize}
            {selectionActions}
            <CardSet
                className="power__cardSelection"
                text={this.props.text}
                cards={this.props.choiceCards}
                cardSelected={cardSelected}
            />
            <CardSet
                className="power__cardHand"
                text={this.props.text}
                cards={this.props.handCards}
                cardSelected={num => this.selectCard(num)}
                selectedCardPos={this.props.selectedHandPos}
            />
        </div>;
    }

    private selectCard(handPos: number) {
        this.props.selectCard(handPos === this.props.selectedHandPos ? undefined : handPos);
    }

    private selectSystem(system: PowerSystemType) {
        if (this.props.selectedHandPos === undefined) {
            return; // do nothing if no card selected
        }

        this.playCard(this.props.handCards[this.props.selectedHandPos], this.props.selectedHandPos, system);
    }

    private pickCard(cardNum: number) {
        connection.send(`power_pickCard ${cardNum}`);

        if (this.props.queueSize < 1) {
            this.setState({ expand: ExpandSection.None });
        }
    }

    private playCard(cardID: number, handPos: number, targetSystem: PowerSystemType) {
        connection.send(`power_useCard ${cardID} ${handPos} ${targetSystem}`);
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IProps = (state) => {
    return {
        text: state.user.text,
        ...state.power,
        selectCard: actionCreators.selectCard,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {},
    null,
    { withRef: true },
)(PowerManagement);