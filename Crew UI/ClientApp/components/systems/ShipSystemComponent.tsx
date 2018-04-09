import * as React from 'react';
import { BooleanOption } from '~/components/systems/Options';
import { TextLocalisation } from '~/functionality';

export interface SystemComponentProps {
    text: TextLocalisation;
}

export interface BaseSystemComponent {
    name(): string;
    renderOptions(): JSX.Element;
    renderHelp(): JSX.Element;
}

export abstract class ShipSystemComponent<TProps extends SystemComponentProps, TOptions> extends React.PureComponent<TProps, TOptions> implements BaseSystemComponent { 
    abstract name(): string;
    protected abstract getHelpText(): string;
    protected abstract getOptionLabels(): {[key: string]: string};

    componentWillMount() {
        this.loadOptions();
    }

    renderOptions() {
        let options = [];
        let labels = this.getOptionLabels();

        for (const opt in this.state) {
            let label = labels[opt];
            let val = this.state[opt];

            if (typeof val === 'boolean') {
                options.push(<BooleanOption key={opt} label={label} value={val as boolean} changeValue={v => this.changeBooleanOption(opt, v)} text={this.props.text} />)
            }
            else {
                throw 'Unable to handle non-boolean options in system state';
            }
        }
        if (options.length === 0) {
            return <div className="systemOptions systemOptions--empty">{this.props.text.common.noOptions}</div>;
        }

        return <div className="systemOptions">{options}</div>;
    }
    
    renderHelp() {
        return <div className="systemHelp">{this.getHelpText()}</div>;
    }

    private loadOptions() {
        let state: {[key: string]: string|boolean} = {};

        for (let opt in this.state) {
            let strVal = localStorage.getItem(`${this.name()} ${opt}`);
            if (strVal === null) {
                continue;
            }

            let prevVal = this.state[opt];
            if (typeof prevVal === 'boolean') {
                state[opt] = strVal === 'true' ? true : false;
            }
            else {
                state[opt] = strVal;
            }
        }

        this.setState(state as Pick<TOptions, never>);
    }

    private saveOption(opt: string, val: any) {
        localStorage.setItem(`${this.name()} ${opt}`, val.toString());
    }

    private changeBooleanOption(opt: string, val: boolean) {
        this.saveOption(opt, val);

        let newState: {[key: string]: boolean} = {};
        newState[opt] = val;
        this.setState(newState as Pick<TOptions, never>);
    }
}