import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from 'src/components';
import { PowerDisplay } from 'src/features/layout';
import { Box, styled, Tooltip, Typography, useTheme } from 'src/lib/mui';
import { PowerLevel } from 'src/types/ShipSystem';
import { ManeuverInfo } from '../types/ManeuverType';
import { drawManeuverWithGrid } from '../utils/drawManeuver';

interface Props extends Pick<ManeuverInfo, 'type' | 'motion' | 'minPower' | 'ghostFrames'> {
    currentPower: PowerLevel;
    onClick?: () => void;
    onFocusStart?: () => void;
    onFocusEnd?: () => void;
}

const Wrapper = styled(Box)({
    width: '4.75em',
    height: '4.75em',
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
    opacity: 0.9,
    lineHeight: 1.05,
    textShadow: '0 0 0.2em black, 0 0 0.2em black, 0 0 0.2em black',
    pointerEvents: 'none',
});

const ManeuverPower = styled(PowerDisplay)({
    fontSize: '0.667em',
    position: 'absolute',
    right: '0.2em',
    bottom: '0.2em',
    opacity: 0.75,
    pointerEvents: 'none',
});

export const ManeuverDisplay: React.FC<Props> = props => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const { t } = useTranslation('helm');
    const theme = useTheme();

    const enabled = props.currentPower >= props.minPower;

    const message = enabled
        ? undefined
        : <Message color="error" textTransform="uppercase">{t('power too low')}</Message>;
    
    return (
        <Tooltip title={t(`maneuver ${props.type}`)}>
            <Wrapper>
                <SizedCanvas
                    enabled={enabled}
                    ref={canvas}
                    draw={(ctx, bounds) => drawManeuverWithGrid(ctx, bounds, theme, props.motion, props.minPower, enabled, props.ghostFrames)}                    
                    onClick={props.onClick}
                    onMouseEnter={props.onFocusStart}
                    onMouseLeave={props.onFocusEnd}
                    onTouchStart={props.onFocusStart}
                    onTouchEnd={props.onFocusEnd}
                >
                    {message}

                    <ManeuverPower powerLevel={props.minPower} mode={enabled ? 'success' : 'error'} />
                </SizedCanvas>
            </Wrapper>
        </Tooltip>
    );
}