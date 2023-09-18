import { Divider, List } from 'src/lib/mui';
import { ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from '../../../types/SensorTarget'
import { TargetSelectionItem } from './TargetSelectionItem';

interface Props {
    targets: SensorTarget[];
    viewTarget?: ObjectId;
    view: (targetId?: ObjectId) => void;
    select: (targetId: ObjectId) => void;
}

export const TargetSelection: React.FC<Props> = (props) => {
    const listItems = props.targets
        .map((target, index) => (
            <>
                {index === 0 ? undefined : <Divider variant="middle" component="li" />}
                <TargetSelectionItem
                    {...target}
                    isCurrentViewTarget={target.id === props.viewTarget}
                    select={() => props.select(target.id)}
                    view={target.id === props.viewTarget ? () => props.view(undefined) : () => props.view(target.id)}
                />
            </>
        ));

    // TODO: "no targets" message when list items are empty.

    return (
        <List>
            {listItems}
        </List>
    )
}