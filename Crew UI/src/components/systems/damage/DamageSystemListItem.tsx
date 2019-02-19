import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import './DamageSystemListItem.scss';

interface IProps {
    text: TextLocalisation;
    systemName: string;
    health: number;
    selected: boolean;
    powered: boolean;
    select: () => void;
}

export class DamageSystemListItem extends React.PureComponent<IProps> {
    public render() {
        const clicked = () => this.props.select();

        return <div className={this.determineClasses()} onClick={clicked}>
            <div className="damageSystem__name">{this.props.systemName}</div>
            <div className="damageSystem__health">{this.props.health}%</div>
        </div>
    }

    private determineClasses() {
        let classes = 'damageSystem';

        classes += this.props.powered
            ? 'damageSystem--online'
            : 'damageSystem--offline';
        
        if (this.props.health < 1) {
            classes += ' damageSystem--destroyed';
        }
        else if (this.props.health < 20) {
            classes += ' damageSystem--severelyDamaged';
        }
        else if (this.props.health < 40) {
            classes += ' damageSystem--badlyDamaged';
        }
        else if (this.props.health < 70) {
            classes += ' damageSystem--damaged';
        }
        else if (this.props.health >= 100) {
            classes += ' damageSystem--perfect';
        }

        return classes;
    }
}