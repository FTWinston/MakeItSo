interface IPowerCardProps {
    cardID?: number;
    fade?: boolean;
    highlight?: boolean;
    index?: number;
    onSelected?: (card: PowerCard) => void;
}

class PowerCard extends React.Component<IPowerCardProps, {}> {
    static defaultProps = {
        fade: false, highlight: false
    };
    render() {
        let data;
        if (this.props.cardID < 0 || this.props.cardID >= language.powerCards.length)
            data = { name: 'Error', desc: 'Invalid card ID: ' + this.props.cardID, rarity: 1, cost: 1 };
        else
            data = language.powerCards[this.props.cardID];

        let classes = this.props.fade ? 'fade' : this.props.highlight ? 'highlight' : null;
        return (
            <card data-id={this.props.cardID} data-rarity={data.rarity} className={classes} onClick={this.clicked.bind(this) }>
                <name>{data.name}</name>
                <cost>{data.cost}</cost>
                <description>{data.desc}</description>
            </card>
        );
    }
    clicked() {
        if (this.props.onSelected == null)
            return;
        this.props.onSelected(this);
    }
}