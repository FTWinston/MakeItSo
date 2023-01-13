import { styled, SxProps } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Avatar, Tooltip } from 'src/components';
import { maxSystemHealth } from 'src/types/SystemState';
import { getHealthColor } from 'src/utils/getHealthColor';

const Root = styled(Avatar)<{ health: number }>(({ health, theme }) => {
    const healthScale = health / maxSystemHealth;
    
    return {
        width: '2.25em',
        height: '2.25em',
        margin: '0.1em 0.25em 0.1em 0.75em',
        backgroundColor: getHealthColor(healthScale, theme),
        color: health === 0 ? 'black' : 'white',
        fontWeight: 'bold',
        transition: 'background-color 0.5s, color 0.5s',
    }
});

interface Props {
    health: number;
    className?: string;
    sx?: SxProps;
}

export const HealthDisplay: React.FC<Props> = (props) => {
    const { t } = useTranslation('common');
    const description = t('system health');

    return (
        <Tooltip title={description}>
            <Root
                health={props.health}
                aria-label={description}
                className={props.className}
                sx={props.sx}
            >
                {props.health}
            </Root>
        </Tooltip>
    );
};
