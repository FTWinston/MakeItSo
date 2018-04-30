import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DamageSystem } from "~/store/Damage";

interface SystemListProps {
    text: TextLocalisation;
    systems: DamageSystem[];
    systemSelected: (systemNum: number) => void;
}

export class SystemList extends React.Component<SystemListProps, {}> {
    public render() {
        return <div className="damageSystemList">
            {this.props.systems.map((system, index) => this.renderSystem(system, index))}
        </div>
    }

    private renderSystem(system: DamageSystem, index: number) {
        return <div
            className="damageSystemList__system"
            key={index}
            onClick={() => this.props.systemSelected(index)}
        />;
    }
}