interface IPowerCardGroupProps {
    cards?: number[];
    cardSelected?: (id: number, index: number) => void;
}

interface IPowerCardGroupState {
    selectedID?: number;
    selectedIndex?: number;
}

class PowerCardGroup extends React.Component<IPowerCardGroupProps, IPowerCardGroupState> {
    constructor(props) {
        super(props);
        this.state = { selectedID: null };
    }
    render() {
        let cards = this.props.cards.map(this.mapCard.bind(this));

        return (
            <div>
                {cards}
            </div>
        );
    }
    private mapCard(id, index) {
        let selectedID = this.state.selectedID;
        return <PowerCard cardID={id} index={index} key={index} fade={id != selectedID && selectedID != null} highlight={id == selectedID} onSelected={this.cardSelected.bind(this)} />;
    }
    cardSelected(card: PowerCard) {
        let alreadySelected = card.props.index == this.state.selectedIndex;
        let selectedID = alreadySelected ? null : card.props.cardID;
        let selectedIndex = alreadySelected ? null : card.props.index;

        if (this.props.cardSelected != null)
            this.props.cardSelected(selectedID, selectedIndex);
        this.setState({ selectedID: selectedID, selectedIndex: selectedIndex });
    }
    clearSelection() {
        this.setState({ selectedID: null, selectedIndex: null });
    }
}