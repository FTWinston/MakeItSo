interface IPowerCardProps {
    rarity?: number;
    name?: string;
    description?: string;
}
    
class PowerCard extends React.Component<IPowerCardProps, {}> {
    render() {
        return (
            <card data-rarity={this.props.rarity}>
                <title>{this.props.name}</title>
                <description>{this.props.description}</description>
            </card>
        );
    }
}