interface IPowerCardChoiceProps {
    visible?: boolean;
}
    
class PowerCardChoice extends React.Component<IPowerCardChoiceProps, {}> {
    render() {
        return (
            <div style="width: 100%; height: 100%; background-color: red;">
                Card Select
            </div>
        );
    }
}