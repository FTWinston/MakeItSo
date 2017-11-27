class CommunicationsSystem extends React.Component<ISystemProps, {}> implements IShipSystem {
    render() {
        if (!this.props.visible)
            return null;
        return <div>comms</div>;
    }
    receiveMessage(cmd: string, data: string) {
        return false;
    }
}