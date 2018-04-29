import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DamageSystem } from "~/store/Damage";

interface SystemListProps {
    text: TextLocalisation;
    systems: DamageSystem[];
}

export class SystemList extends React.Component<SystemListProps, {}> {
    public render() {
        return <div>
        </div>;
        // TODO: implement
    }
}