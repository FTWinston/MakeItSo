interface IPowerCardGroupProps {
    cards?: number[];
    cardSelected?: (number) => void;
}

interface IPowerCardGroupState {
    selectedID?: number;
}

class PowerCardGroup extends React.Component<IPowerCardGroupProps, IPowerCardGroupState> {
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
        let selectedID = card.props.highlight ? null : card.props.cardID;
        if (this.props.cardSelected != null)
            this.props.cardSelected(selectedID);
        this.setState({ selectedID: selectedID });
    }
}