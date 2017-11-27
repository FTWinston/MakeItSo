class Menu extends React.Component<{}, {}> {
    render() {
        return (
        <ButtonSet className="menu separate" color={ButtonColor.Quandry}>
            {this.props.children}
        </ButtonSet>
        );
    }
}