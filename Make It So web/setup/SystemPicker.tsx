interface ISystemPickerProps {
    system?: ISystemInfo;
    selectionChanged?: (systemIndex: number, nowSelected: boolean) => void;
}

class SystemPicker extends React.Component<ISystemPickerProps, {}> {
	render() {
		var classes = "option";
		if (this.props.system.selected)
			classes += " selected";
		if (this.props.system.usedByOther)
			classes += " taken";
		
		return (
            <li className={classes} onClick={this.clicked.bind(this)}>{this.props.system.name}</li>
		);
	}
	clicked() {
		var nowSelected = !this.props.system.selected;
		gameClient.socket.send((nowSelected ? '+sys ' : '-sys ') + this.props.system.index);
		this.props.selectionChanged(this.props.system.index, nowSelected);
	}
}