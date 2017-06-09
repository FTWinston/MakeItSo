class WarpSystem extends React.Component<ISystemProps, {}> implements IShipSystem {
    render() {
        if (!this.props.visible)
            return null;
        return <div>Warp</div>;
    }
    receiveMessage(cmd: string, data: string) {
        return false;
    }
}