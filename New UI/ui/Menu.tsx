class Menu extends React.Component<{}, {}> {
    render() {
        return (
        <ButtonSet className="menu" color={ButtonColor.Quandry}>
            {this.props.children}
        </ButtonSet>
        );
    }
}