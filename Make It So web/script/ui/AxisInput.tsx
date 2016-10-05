interface IAxisInputProps {
    visible?: boolean;
    direction?: string;
    caption?: string;
    color?: string;
    movementCallback?: (dx: number, dy: number) => void;
    scale?: number;
}

class AxisInput extends React.Component<IAxisInputProps, {}> {
	static defaultProps = {
		visible: true, direction: 'both', caption: null, color: null, movementCallback: null, scale: 1
	}
	render() {
		return (
			<touchArea ref="area" className="inline" style={{display: this.props.visible ? null : 'none'}} data-caption={this.props.caption} data-direction={this.props.direction} data-mode="continuous"></touchArea>
		);
	}
    componentDidMount() {
        TouchFunctions.detectMovement(this.refs['area'] as HTMLElement, this.onMovement);
	}
	onMovement (dx, dy) {
        if (this.props.movementCallback != null)
			this.props.movementCallback(dx * this.props.scale, dy * this.props.scale);
	}
}