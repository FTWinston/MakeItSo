class SensorsSystem extends React.Component<ISystemProps, {}> implements IShipSystem {
    render() {
        if (!this.props.visible)
            return null;
        return <div>Sensors</div>;
    }
    receiveMessage(cmd: string, data: string) {
        return false;
    }
}