import { RefObject, useState } from 'react';
import { getWorldBounds } from '../../../features/spacemap';
import { useInterval } from 'src/hooks/useInterval';
import { Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { isInRectangle } from 'src/types/Rectangle';
import { Vector2D } from 'src/types/Vector2D';
import { interpolateVector } from 'src/utils/interpolate';

export function useShipVisibility(
    canvas: RefObject<HTMLCanvasElement>,
    motion: Keyframes<Position>,
    getViewCenter: () => Vector2D,
    getCellRadius: () => number,
) {
    const [shipVisible, setShipVisible] = useState(true);

    useInterval(() => {
        const bounds = getWorldBounds(canvas.current!, getCellRadius(), getViewCenter());
        const visible = isInRectangle(bounds, interpolateVector(motion));
        if (shipVisible !== visible) {
            setShipVisible(visible);   
        }
    }, 250, [motion, getViewCenter, getCellRadius], true, false);

    return shipVisible;
}