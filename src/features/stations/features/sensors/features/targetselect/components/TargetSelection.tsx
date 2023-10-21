import { Divider, List, styled  } from 'src/lib/mui';
import { ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from '../../../types/SensorTarget'
import { TargetSelectionItem } from './TargetSelectionItem';
import { Fragment } from 'react';

interface Props {
    targets: SensorTarget[];
    viewTarget?: ObjectId;
    view: (targetId?: ObjectId) => void;
    select: (targetId: ObjectId) => void;
}

const Root = styled(List)({
    overflowY: 'scroll',
    flexGrow: 1,
})

export const TargetSelection: React.FC<Props> = (props) => {
    const listItems = props.targets
        .map((target, index) => (
            <Fragment key={index}>
                {index === 0 ? undefined : <Divider variant="middle" component="li" />}
                <TargetSelectionItem
                    {...target}
                    isCurrentViewTarget={target.id === props.viewTarget}
                    select={() => props.select(target.id)}
                    view={target.id === props.viewTarget ? () => props.view(undefined) : () => props.view(target.id)}
                />
            </Fragment>
        ));

    // TODO: "no targets" message when list items are empty.

    return (
        <Root>
            {listItems}
        </Root>
    )
}