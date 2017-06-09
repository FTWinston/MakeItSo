class DamageControlSystem extends React.Component<ISystemProps, {}> implements IShipSystem {
    render(): any {
        if (!this.props.visible)
            return null;
        return <div>damage</div>;
    }
    receiveMessage(cmd: string, data: string) {
        if (cmd == 'dmgcell')
            return true;
        if (cmd == 'dmggrid')
            return true;

        return false;
    }
}