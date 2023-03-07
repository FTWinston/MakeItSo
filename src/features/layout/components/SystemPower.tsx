import { SxProps, Tooltip } from 'src/lib/mui';
import { useTranslation } from 'react-i18next';
import { PowerLevel } from 'src/types/ShipSystem';
import { PowerDisplay } from './PowerDisplay';

interface Props {
    powerLevel: PowerLevel;
    className?: string;
    sx?: SxProps;
}

export const SystemPower: React.FC<Props> = (props) => {
    const { t } = useTranslation('common');
    const description = t(`powerLevel${props.powerLevel}`);

    const mode = props.powerLevel >= 4
        ? 'success'
        : props.powerLevel === 1
            ? 'fail'
            : 'normal';

    return (
        <Tooltip title={description}>
            <PowerDisplay
                powerLevel={props.powerLevel}
                mode={mode}
                label={description}
                className={props.className}
                sx={props.sx}
            />
        </Tooltip>
    );
};
