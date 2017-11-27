interface IErrorDisplayProps {
    message?: string;
}

class ErrorDisplay extends React.Component<IErrorDisplayProps, {}> {
    render() {
        return (
            <screen id="error">
                {this.props.message}
            </screen>
        );
    }
}