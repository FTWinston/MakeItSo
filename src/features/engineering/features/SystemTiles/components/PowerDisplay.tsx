import Box from '@mui/material/Box';
import { styled, SxProps } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { PowerLevel } from 'src/types/SystemState';

const Root = styled(Box)({
    display: 'flex',
    width: '1.65em',
    height: '2em',
    gap: '0.15em',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: '1em',
});

const Bar = styled(Box,
    { shouldForwardProp: (prop) => prop !== 'active' && prop !== 'level' }
)<{ active: boolean, level: PowerLevel }>((({ active, level, theme }) => ({
    backgroundColor: active
        ? level >= 4
            ? theme.palette.success.light
            : theme.palette.text.primary
        : theme.palette.text.disabled,
    opacity: active ? undefined : 0.5,
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
})));

interface Props {
    powerLevel: PowerLevel;
    className?: string;
    sx?: SxProps;
}

export const PowerDisplay: React.FC<Props> = (props) => {
    const { t } = useTranslation('common');
    const description = t(`powerLevel${props.powerLevel}`);

    return (
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
    );
};
