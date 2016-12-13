interface IPowerCardProps {
    cardID?: number;
}

class PowerCard extends React.Component<IPowerCardProps, {}> {
    render() {
        let data;
        if (this.props.cardID < 0 || this.props.cardID >= language.powerCards.length)
            data = { name: 'Error', desc: 'Invalid card ID: ' + this.props.cardID, rarity: 1 };
        else
            data = language.powerCards[this.props.cardID];

        return (
            <card data-id={this.props.cardID} data-rarity={data.rarity}>
                <title>{data.name}</title>
                <description>{data.desc}</description>
            </card>
        );
    }
}