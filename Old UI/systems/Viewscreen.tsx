class ViewScreenSystem extends React.Component<ISystemProps, {}> implements IShipSystem {
    render() {
        if (!this.props.visible)
            return null;
        return <div>View</div>;
    }
    receiveMessage(cmd: string, data: string) {
        if (cmd == 'view')
            return true;
        if (cmd == 'zoom')
            return true;

        return false;
    }
}