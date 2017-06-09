class WeaponsSystem extends React.Component<ISystemProps, {}> implements IShipSystem {
    render(): any {
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