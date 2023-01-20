import { Box, styled, SxProps, Tooltip } from 'src/lib/mui';
import { useTranslation } from 'react-i18next';
import { PowerLevel } from 'src/types/ShipSystem';

const Root = styled(Box)({
    display: 'flex',
    width: '1.65em',
    height: '1.75em',
    gap: '0.15em',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: '1em',
});

const Bar = styled(Box,
    { shouldForwardProp: (prop) => prop !== 'active' && prop !== 'level' }
)<{ active: boolean, level: PowerLevel }>((({ active, level, theme }) => {
    let backgroundColor;
    let opacity;

    if (active) {
        backgroundColor = level >= 4
            ? theme.palette.success.light
            : theme.palette.text.primary;
    }
    else {
        backgroundColor = level === 0
            ? theme.palette.error.dark
            : theme.palette.text.disabled;

        opacity = level === 0
            ? 0.2
            : 0.5;
    }

    return {
        backgroundColor,
        opacity,
        borderRadius: '0.025em',
        width: '0.3em',
        transition: 'background-color 0.5s, opacity 0.5s',

        '&:nth-of-type(1)': {
            height: '0.25em',
            backgroundColor: level === 1 ? theme.palette.warning.main : undefined,
        },
        '&:nth-of-type(2)': {
            height: '0.75em'
        },
        '&:nth-of-type(3)': {
            height: '1.25em'
        },
        '&:nth-of-type(4)': {
            height: '1.75em',
        }
    }
}));

interface Props {
    powerLevel: PowerLevel;
    className?: string;
    sx?: SxProps;
}

export const PowerDisplay: React.FC<Props> = (props) => {
    const { t } = useTranslation('common');
    const description = t(`powerLevel${props.powerLevel}`);

    return (
        <Tooltip title={description}>
            <Root
                role="figure"
                aria-label={description}
                className={props.className}
                sx={props.sx}
            >
                <Bar active={props.powerLevel >= 1} level={props.powerLevel} />
                <Bar active={props.powerLevel >= 2} level={props.powerLevel} />
                <Bar active={props.powerLevel >= 3} level={props.powerLevel} />
                <Bar active={props.powerLevel >= 4} level={props.powerLevel} />
            </Root>
        </Tooltip>
    );
};