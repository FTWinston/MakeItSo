import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from 'src/components';
import { styled, Tooltip } from 'src/lib/mui';
import { ManeuverInfo } from '../types/ManeuverType';
import { drawManeuver } from '../utils/drawManeuver';

interface Props extends Pick<ManeuverInfo, 'type' | 'motion' | 'minPower'> {
    enabled: boolean;
    onClick: () => void;
}

const SizedCanvas = styled(Canvas)({
    width: '3.5em',
    height: '3.5em',
});

export const ManeuverDisplay: React.FC<Props> = props => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const { t } = useTranslation('helm');
    
    return (
        <Tooltip title={t(`maneuver ${props.type}`)}>
            <SizedCanvas
                ref={canvas}
                draw={ctx => drawManeuver(ctx, props.motion, props.minPower, props.enabled)}
                onClick={props.enabled ? props.onClick : undefined}
            />
        </Tooltip>
    );
}