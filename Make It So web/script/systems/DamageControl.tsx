/// <reference path="../Screens.tsx" />
class DamageControl extends React.Component<ISystemProps, {}> implements ISystem {
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
					
			</system>
		);
	}
	receiveMessage(msg, data) {
        return false;
    }
}