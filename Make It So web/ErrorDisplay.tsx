interface IErrorDisplayProps {
    show?: boolean;
    message?: string;
}

class ErrorDisplay extends React.Component<IErrorDisplayProps, {}> {
	render() {
		return (
			<screen id="error" style={{display: this.props.show ? null : 'none'}}>
				{this.props.message}
			</screen>
		);
	}
}