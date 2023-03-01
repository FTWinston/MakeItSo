import { RefObject, useEffect, useState } from 'react';
import { getWorldBounds } from 'src/features/spacemap';
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

    useEffect(() => {
        const updateVisibility = () => {
            const bounds = getWorldBounds(canvas.current!, getCellRadius(), getViewCenter());
            const visible = isInRectangle(bounds, interpolateVector(motion));
            if (shipVisible !== visible) {
                setShipVisible(visible);   
            }
        }

        updateVisibility();
        const interval = setInterval(updateVisibility, 250);
        return () => clearInterval(interval);
    }, [motion]);

    return shipVisible;
}