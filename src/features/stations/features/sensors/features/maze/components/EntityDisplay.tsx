import { Typography } from '@mui/material';
import { useRef, useEffect } from 'react';
import { Box } from 'src/lib/mui';

type Props = {
    x: number;
    y: number;
    type: 'player';
}

export const EntityDisplay: React.FC<Props> = props => {
    const entityRef = useRef<HTMLDivElement>(null);
    const prevX = useRef(props.x);
    const prevY = useRef(props.y);
  
    useEffect(() => {
      if (entityRef.current) {
        const deltaX = props.x - prevX.current;
        const deltaY = props.y - prevY.current;
  
        if (deltaX !== 0) {
          entityRef.current.style.transition = 'none';
          entityRef.current.style.left = `${-deltaX * 1}em`;
          requestAnimationFrame(() => {
            entityRef.current!.style.transition = 'left 0.33s ease';
            entityRef.current!.style.left = '0';
          });
        }
  
        if (deltaY !== 0) {
          entityRef.current.style.transition = 'none';
          entityRef.current.style.top = `${-deltaY * 1}em`;
          requestAnimationFrame(() => {
            entityRef.current!.style.transition = 'top 0.33s ease';
            entityRef.current!.style.top = '0';
          });
        }
  
        prevX.current = props.x;
        prevY.current = props.y;
      }
    }, [props.x, props.y]);
    
    return (
        <Box
            ref={entityRef}
            display="flex"
            alignSelf="center"
            justifySelf="center"
            alignItems="center"
            justifyContent="center"
            position="relative"
            sx={{
                gridColumn: `${props.x + 1}`,
                gridRow: `${props.y + 1}`,
                backgroundColor: 'transparent',
                left: 0,
                top: 0,
            }}
        >
            <Typography 
                color="primary.light"
                fontSize="0.75em"
                lineHeight="1em"
            >
                P
            </Typography>
        </Box>
    );
}