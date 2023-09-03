import { useRef, useCallback } from 'react';
import { styled, Theme, useTheme } from 'src/lib/mui';
import { Canvas } from './Canvas';

export default { title: 'Common/Canvas' };

const StyledCanvas = styled(Canvas)({
  width: 'calc(100vw - 2rem)',
  height: 'calc(100vh - 2rem)',
});

const Simple = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  const drawThemed = useCallback(
    (ctx: CanvasRenderingContext2D, bounds: DOMRect) => draw(ctx, bounds, theme),
    [theme]
  );

  return <StyledCanvas ref={canvas} draw={drawThemed} />;
};

export const example = () => <Simple />;

function draw(ctx: CanvasRenderingContext2D, viewBounds: DOMRect, theme: Theme) {
  ctx.fillStyle = theme.palette.primary.main;
  ctx.fillRect(viewBounds.x, viewBounds.y, viewBounds.width * 0.5, viewBounds.height * 0.5);
  ctx.fillRect(
    viewBounds.x + viewBounds.width * 0.5,
    viewBounds.y + viewBounds.height * 0.5,
    viewBounds.width * 0.5,
    viewBounds.height * 0.5
  );
}
