interface IPowerCardChoiceProps {
    cards?: number[];
}

interface IPowerCardChoiceState {
    selectedID?: number;
}

class PowerCardChoice extends React.Component<IPowerCardChoiceProps, IPowerCardChoiceState> {
    constructor(props) {
        super(props);
        this.state = { selectedID: null };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.selectedID != null)
            this.setState({ selectedID: null });
    }
    render() {
        let choice = this;
        let selectedID = this.state.selectedID;
        let anySelected = selectedID != null;
        
        let cards = this.props.cards.map(function (id, index) {
            return <PowerCard cardID={id} key={index} fade={anySelected && id != selectedID} highlight={id == selectedID} onSelected={choice.cardSelected.bind(choice) }/>;
        });

        return (
            <div>
                {cards}
            </div>
        );
    }
    cardSelected(card: PowerCard) {
        this.setState({ selectedID: card.props.highlight ? null : card.props.cardID });
    }
}