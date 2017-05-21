interface IWaitingScreenProps {
    
}

class WaitingScreen extends React.Component<IWaitingScreenProps, {}> {
    render() {
        return (
            <div className="screen" id="waiting">
                Waiting for other users...
            </div>
        );
    }
}