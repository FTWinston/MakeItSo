class WeaponsSystem extends React.Component<ISystemProps, {}> implements IShipSystem {
    render() {
        if (!this.props.visible)
            return null;
        return <div>Weapons</div>;
    }
    receiveMessage(cmd: string, data: string) {
        if (cmd == 'dice')
            return true;
        
        return false;
    }
}