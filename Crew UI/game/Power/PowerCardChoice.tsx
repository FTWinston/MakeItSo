interface IPowerCardChoiceProps {
    visible?: boolean;
    cards: number[];
}
    
class PowerCardChoice extends React.Component<IPowerCardChoiceProps, {}> {
    render() {
        var cards = this.props.cards.map(function(id, index) {
            return <PowerCard cardID={id} key={index} />;
        });

        return (
            <section className="cardSelect">
                {cards}
            </section>
        );
    }
}