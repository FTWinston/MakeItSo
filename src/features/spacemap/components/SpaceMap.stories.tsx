import { useRef, useState } from 'react';
import { SpaceMap } from './SpaceMap';
import { styled } from 'src/lib/mui';
import { Vector2D } from 'src/types/Vector2D';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { durationToTicks, getTime } from 'src/utils/timeSpans';

export default { title: 'Common/Space Map' };

const StyledMap = styled(SpaceMap)({
    width: '100vw',
    height: '100vh',
});
    
const Simple = () => {
    const [cellRadius, setCellRadius] = useState(32);

    const canvas = useRef<HTMLCanvasElement>(null);

    const objects = [
        {
            id: 1,
            motion: [{
                time: getTime(),
                val: {
                    x: 0,
                    y: 0,
                    angle: 0,
                    evade: 0,
                }
            }, {
                time: getTime() + durationToTicks(3),
                val: {
                    x: 50,
                    y: 0,
                    angle: Math.PI,
                    evade: 0,
                }
            }]
        }
    ];
    
    const [center, setCenter] = useState<Vector2D>({ x: 0, y: 0 });

    return (
        <StyledMap
            gridColor="primary"
            ref={canvas}
            objects={objects}
            getCellRadius={() => cellRadius}
            getCenter={() => center}
        />
    )
}

export const example = () => <Simple />
