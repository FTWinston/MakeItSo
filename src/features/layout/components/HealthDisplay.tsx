import Box from '@mui/material/Box';
import { styled, SxProps } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'src/components';
import { maxSystemHealth } from 'src/types/SystemState';
import { getHealthColor } from 'src/utils/getHealthColor';

const Root = styled(Box)<{ health: number }>(({ health, theme }) => {
    const healthScale = health / maxSystemHealth;
    
    return {
        display: 'flex',
        width: '2.5em',
        height: '2.5em',
        margin: '0.1em 0.25em 0.1em 0.75em',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1em',
        borderRadius: '2em',
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
                role="figure"
                aria-label={description}
                className={props.className}
                sx={props.sx}
            >
                {props.health}
            </Root>
        </Tooltip>
    );
};
