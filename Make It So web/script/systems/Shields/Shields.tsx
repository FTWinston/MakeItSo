/// <reference path="../../Screens.tsx" />
class Shields extends React.Component<ISystemProps, {}> implements ISystem {
	componentDidMount() {
		if (this.props.registerCallback != null)
			this.props.registerCallback(this.props.index, this.receiveMessage);
	}
	componentWillUnmount() {
		if (this.props.registerCallback != null)
			this.props.registerCallback(this.props.index, undefined);
	}
	render() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<ShieldDisplay ref="shield" width={this.props.width*0.85} height={this.props.height} visible={this.props.visible} />
			</system>
		);
	}
	receiveMessage(msg, data) {
		switch(msg) {
			case 'set':
				var values = data.split(' ');
				if (values.length != 3) {
					console.error('Expected 3 data parameters');
					return false;
				}
				var index = parseInt(values[0]), type = parseInt(values[1]), color = parseInt(values[2]);
				if (isNaN(index) || isNaN(type) || isNaN(color)) {
					console.error('Parameter was not numeric');
					return false;
				}
				(this.refs['shield'] as ShieldDisplay).setBlock(index, type, color);
                return true;
			default:
				return false;
		}
	}
}