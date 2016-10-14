interface IListProps {
    options?: string[];
    onSelectionChanged?: (string) => void; // TODO: need to call this...
}

interface IListState {
    selected?: string;
}

class List extends React.Component<IListProps, IListState> {
    constructor(props) {
        super(props);
        this.state = { selected: props.options.length > 0 ? props.options[0] : null };
    }    
    static defaultProps = {
        options: [],
        onSelectionChanged: null
    }
    render() {
        let self = this;
        let children = this.props.options.map(function(option, index) {
            return <option key={index} value={option}>{option}</option>
        });
        
        return (
            <select className="list" size="6" value={this.state.selected} onChange={this.changed.bind(this)}>
                {children}
            </select>
        );
    }
    private changed(e) {
        if (this.props.onSelectionChanged != null)
            this.props.onSelectionChanged(e.target.value);
    }
}