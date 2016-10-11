interface ISystemListItemProps {
    system?: ISystemInfo;
    selectionChanged?: (systemIndex: number, nowSelected: boolean) => void;
}

class SystemListItem extends React.Component<ISystemListItemProps, {}> {
	render() {
		var classes = "";
		if (this.props.system.selected)
			classes = " selected";
		if (this.props.system.usedByOther)
			classes += " taken";
		
		return (
            <li className={classes} onClick={this.clicked.bind(this)}>{this.props.system.name}</li>
		);
	}
	clicked() {
		var nowSelected = !this.props.system.selected;
		gameClient.server.send((nowSelected ? '+sys ' : '-sys ') + this.props.system.index);
		this.props.selectionChanged(this.props.system.index, nowSelected);
	}
}