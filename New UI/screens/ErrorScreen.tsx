interface IErrorScreenProps {
    message?: string;
}

class ErrorScreen extends React.Component<IErrorScreenProps, {}> {
    render() {
        return (
            <div className="screen" id="error">
                <p>{this.props.message}</p>
            </div>
        );
    }
}