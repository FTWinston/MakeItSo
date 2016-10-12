interface IPowerCardProps {
    width: number;
    height: number;
}
    
class PowerCards extends React.Component<IPowerCardProps, {}> {
    render() {
        return (
            <div style={{position: 'absolute', right: '0', top: '0', bottom: '0', width: this.props.width}} />
        );
    }
}