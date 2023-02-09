import { RefObject, useEffect, useState } from 'react';
import { getWorldBounds } from 'src/features/spacemap';
import { getVectorValue, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { isInRectangle } from 'src/types/Rectangle';
import { Vector2D } from 'src/types/Vector2D';

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
            const visible = isInRectangle(bounds, getVectorValue(motion));
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