import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { PowerCell, PowerState } from '~/store/Power';
import { TextLocalisation } from '~/functionality';
import { connection } from '~/Client';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { PowerGrid } from './PowerGrid';
import { CellList } from './CellList';
import './PowerManagement.scss';

interface PowerManagementProps extends PowerState {
    text: TextLocalisation;
}

interface PowerManagementState {
    selectedQueueCell?: number;
}

class PowerManagement extends ShipSystemComponent<PowerManagementProps, PowerManagementState> {
    constructor(props: PowerManagementProps) {
        super(props);
        
        this.state = {
        }
    }

    name() { return 'power'; }

    protected getHelpText() {
        return this.props.text.systemHelp.power;
    }

    protected getOptionLabels() {
        return this.props.text.systems.power;
    }

    public render() {
        return <div className="system power">
            <PowerGrid
                cells={this.props.cells}
                cellClicked={cellIndex => this.gridCellClicked(cellIndex)}
                reactorClicked={() => this.reactorClicked()}
                heatLevel={this.props.heatLevel}
                heatRate={this.props.heatRate}
                text={this.props.text}
            />
            <CellList
                text={this.props.text}
                cells={this.props.spareCells}
                selectedIndex={this.state.selectedQueueCell}
                cellClicked={cellIndex => this.spareCellClicked(cellIndex)}
            />
        </div>; // currently storing spare "types" only, not full cell objects. Which to go with? Converting during render is ungainly.
    }

    private gridCellClicked(cellIndex: number) {
        // If a spare cell is selected, send place command. Otherwise, send rotate command.
        if (this.state.selectedQueueCell === undefined) {
            connection.send(`power_rotCell ${cellIndex}`);
        }
        else {
            connection.send(`power_placeCell ${cellIndex} ${this.state.selectedQueueCell}`);
            this.setState({
                selectedQueueCell: undefined,
            });
        }
    }

    private spareCellClicked(spareCellNum: number) {
        let selection = this.state.selectedQueueCell === spareCellNum ? undefined : spareCellNum;

        this.setState({
            selectedQueueCell: selection,
        });
    }

    private reactorClicked() {
        connection.send('power_jog');
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => PowerManagementProps = (state) => {
    return {
        text: state.user.text,
        cells: state.power.cells,
        reactorPower: state.power.reactorPower,
        heatLevel: state.power.heatLevel,
        heatRate: state.power.heatRate,
        spareCells: state.power.spareCells,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {},
    null,
    { withRef: true },
)(PowerManagement);