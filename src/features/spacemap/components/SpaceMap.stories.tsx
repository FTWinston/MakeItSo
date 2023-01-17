import { useState } from 'react';
import { SpaceMap } from './SpaceMap';
import { styled } from '@mui/material/styles';
import { Vector2D } from 'src/types/Vector2D';

export default { title: 'Common/Space Map' };

const StyledMap = styled(SpaceMap)({
    width: '100vw',
    height: '100vh',
});
    
const Simple = () => {
    const [cellRadius, setCellRadius] = useState(32);

    const [center, setCenter] = useState<Vector2D>({ x: 0, y: 0 });

    return (
        <StyledMap
            gridColor="primary"
            vessels={[]}
            cellRadius={cellRadius}
            setCellRadius={setCellRadius}
            center={center}
            setCenter={setCenter}
            dragEnabled={false}
        />
    )
}

export const example = () => <Simple />
