import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from 'src/components';
import { styled, Typography } from 'src/lib/mui';
import { ManeuverInfo } from '../types/ManeuverType';
import { drawManeuver } from '../utils/drawManeuver';

interface Props extends Pick<ManeuverInfo, 'type' | 'motion' | 'minPower'> {
    enabled: boolean;
    onClick: () => void;
}

const SizedCanvas = styled(Canvas)<{ enabled: boolean }>(({ enabled }) => ({
    width: '3.5em',
    height: '3.5em',
    borderRadius: '0.15em',
    borderStyle: 'solid',
    borderWidth: '0.05em',
    backgroundColor: '#121212',
    borderColor: enabled ? '#ccc' : '#666',
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
    
    return (
        //<Tooltip title={t(`maneuver ${props.type}`)}>
            <SizedCanvas
                enabled={props.enabled}
                aria-label={t(`maneuver ${props.type}`)}
                ref={canvas}
                draw={(ctx, bounds) => drawManeuver(ctx, bounds, props.motion, props.minPower, props.enabled)}
                onClick={props.enabled ? props.onClick : undefined}
            >
                {message}
            </SizedCanvas>
        //</Tooltip>
    );
}