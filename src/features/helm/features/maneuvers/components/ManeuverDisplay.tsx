import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from 'src/components';
import { Box, styled, Tooltip, Typography } from 'src/lib/mui';
import { ManeuverInfo } from '../types/ManeuverType';
import { applyOffset } from '../utils/applyOffset';
import { drawManeuverWithGrid } from '../utils/drawManeuver';

interface Props extends Pick<ManeuverInfo, 'type' | 'motion' | 'minPower'> {
    enabled: boolean;
    startAngle: number;
    onClick?: () => void;
    onFocusStart?: () => void;
    onFocusEnd?: () => void;
}

const Wrapper = styled(Box)({
    width: '3.5em',
    height: '3.5em',
    display: 'flex',
})

const SizedCanvas = styled(Canvas
    , { shouldForwardProp: (prop) => prop !== 'enabled' }
)<{ enabled: boolean }>(({ enabled }) => ({
    borderRadius: '0.15em',
    borderStyle: 'solid',
    borderWidth: '0.05em',
    backgroundColor: '#121212',
    borderColor: enabled ? '#ccc' : '#666',
    flexGrow: 1,
}));

const Message = styled(Typography)({
    fontSize: '0.9em',
    lineHeight: 1.05,
    textShadow: '0 0 0.2em black, 0 0 0.2em black, 0 0 0.2em black',
})

export const ManeuverDisplay: React.FC<Props> = props => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const { t } = useTranslation('helm');

    const message = props.enabled
        ? undefined
        : <Message color="error" textTransform="uppercase">{t('power too low')}</Message>;
    
    const motion = applyOffset(props.motion, { x: 0, y: 0, angle: props.startAngle }, 0);

    return (
        <Tooltip title={t(`maneuver ${props.type}`)}>
            <Wrapper>
                <SizedCanvas
                    enabled={props.enabled}
                    aria-label={t(`maneuver ${props.type}`)}
                    ref={canvas}
                    draw={(ctx, bounds) => drawManeuverWithGrid(ctx, bounds, motion, props.minPower, props.enabled)}                    
                    onClick={props.onClick}
                    onMouseEnter={props.onFocusStart}
                    onMouseLeave={props.onFocusEnd}
                    onTouchStart={props.onFocusStart}
                    onTouchEnd={props.onFocusEnd}
                >
                    {message}
                </SizedCanvas>
            </Wrapper>
        </Tooltip>
    );
}