class WarpSystem extends React.Component<ISystemProps, {}> implements IShipSystem {
    render(): any {
        if (!this.props.visible)
            return null;
        return <div>Warp</div>;
    }
    receiveMessage(cmd: string, data: string) {
        return false;
    }
}