import * as React from 'react';
import { ButtonColor, Choice, ToggleButton } from '~/components/general';
import { TextLocalisation } from '~/functionality';

export interface BooleanOptionProps {
    text: TextLocalisation;
    name: string;
    value: boolean;
    changeValue: (value: boolean) => void;
}

export class BooleanOption extends React.PureComponent<BooleanOptionProps, {}> { 
    render() {
        return (
            <div className="option">
                <div className="option__name">{this.props.name}</div>
                <Choice color={ButtonColor.Primary}>
                    <ToggleButton activated={() => this.props.changeValue(false)} text={this.props.text.common.optionDisable} />
                    <ToggleButton activated={() => this.props.changeValue(true)} text={this.props.text.common.optionEnable} />
                </Choice>
            </div>
        );
    }
}