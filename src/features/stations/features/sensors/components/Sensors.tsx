import { styled } from 'src/lib/mui';
import { AppBarHeight } from '../../appbar';
import { Page } from '../../../components/Page';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { SensorsAppBar } from './SensorsAppBar';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SensorBreadcrumbs } from './SensorBreadcrumbs';
import { ScanSelection } from '../features/scanselect';
import { TargetSelection } from '../features/targetselect';
import { ObjectId } from 'src/types/GameObjectInfo';
import { RelationshipType } from 'src/types/RelationshipType';
import { SensorTarget } from '../types/SensorTarget';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    power: PowerLevel;
    health: number;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr`,
});

export const Sensors: React.FC<Props> = (props) => {
    const { t } = useTranslation('sensors');

    const [stage, setStage] = useState(0);

    // TODO: put these server side
    const [viewTarget, setViewTarget] = useState<ObjectId | undefined>();
    const [targets] = useState<SensorTarget[]>([
        {
            id: 1,
            draw: 'chevron',
            rel: RelationshipType.Neutral,
            description: 'klingon cruiser',
        },
        {
            id: 2,
            draw: 'chevron',
            rel: RelationshipType.Hostile,
            description: 'romulan warbird',
        },
        {
            id: 3,
            draw: 'chevron',
            rel: RelationshipType.Friendly,
            description: 'federation scout',
        },
        {
            id: 4,
            draw: 'chevron',
            rel: RelationshipType.Unknown,
            description: 'ferengi maurauder',
        },
        {
            id: 5,
            draw: 'circle',
            rel: RelationshipType.None,
            description: 'Class M planet',
        }
    ])

    const contentComponent = stage === 0
        ? (
            <TargetSelection
                targets={targets}
                select={() => setStage(1) /* TODO: save target somewhere */}
                view={setViewTarget}
                viewTarget={viewTarget}
            />
        )
        : stage === 1
            ? (
                <ScanSelection />
            )
            : stage === 2
                ? (
                    <div>scanning...</div>
                )
                : <div>scan result</div>;
    
    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <SensorsAppBar power={props.power} health={props.health} />
            <div>
                <SensorBreadcrumbs depth={stage} setDepth={setStage} />
                {contentComponent}
            </div>
        </Root>
    );
};
