import { useRef } from 'react';
import { SpaceMap } from './SpaceMap';
import { Box, styled, useTheme } from 'src/lib/mui';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { Vector2D } from 'src/types/Vector2D';
import { Canvas } from 'src/components';
import { drawFunctions } from '../utils/drawObject';

export default { title: 'Common/Space Map' };

const StyledMap = styled(SpaceMap)({
    width: '100vw',
    height: '100vh',
});

const CanvasContainer = styled(Box)({
    display: 'flex',
    gap: '0.25em',
    flexWrap: 'wrap',
});

const IndividualCanvas = styled(Canvas)({
    width: '3em',
    height: '3em',
});

export const example = () => {
    const canvas = useRef<HTMLCanvasElement>(null);
    const center = useRef<Vector2D>({ x: 0, y: 0 });

    const objects: GameObjectInfo[] = [
        {
            id: 1,
            draw: 'ship',
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
                    x: 5,
                    y: 0,
                    angle: Math.PI,
                    evade: 0,
                }
            }]
        }
    ];
    
    return (
        <StyledMap
            gridColor="primary"
            ref={canvas}
            objects={objects}
            getCellRadius={() => 32}
            getCenter={() => center.current}
        />
    )
}

type FakeRef<T> = { current: null | T };

export const appearances = () => {
    const theme = useTheme();
    const canvasRefs = useRef<FakeRef<HTMLCanvasElement>[]>(new Array(Object.keys(drawFunctions).length).fill(0).map(() => ({ current: null })));

    const canvases = Object.entries(drawFunctions).map((entry, index) => (
        <IndividualCanvas
            draw={(ctx, bounds) => {
                ctx.scale(bounds.width / 2, bounds.height / 2);
                ctx.translate(1, 1);
                entry[1](ctx, theme);
            }}
            ref={canvasRefs.current[index]}
            key={entry[0]}
            title={entry[0]}
        />
    ));

    return (
        <CanvasContainer>
            {canvases}
        </CanvasContainer>
    )
}