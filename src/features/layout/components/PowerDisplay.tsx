import { Box, styled, SxProps } from 'src/lib/mui';
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

type DisplayMode = 'normal' | 'success' | 'fail';

interface BarProps {
    active: boolean;
    level: PowerLevel;
    mode: DisplayMode;
}

const Bar = styled(Box,
    { shouldForwardProp: (prop) => prop !== 'active' && prop !== 'level' }
)<BarProps>((({ active, level, mode, theme }) => {
    let backgroundColor;
    let opacity;

    if (active) {
        backgroundColor = mode === 'success'
            ? theme.palette.success.light
            : mode === 'fail'
                ? theme.palette.warning.main
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
    mode: DisplayMode;
    label?: string;
    className?: string;
    sx?: SxProps;
}

export const PowerDisplay: React.FC<Props> = (props) => {
    return (
        <Root
            role="figure"
            aria-label={props.label}
            className={props.className}
            sx={props.sx}
        >
            <Bar active={props.powerLevel >= 1} mode={props.mode} level={props.powerLevel} />
            <Bar active={props.powerLevel >= 2} mode={props.mode} level={props.powerLevel} />
            <Bar active={props.powerLevel >= 3} mode={props.mode} level={props.powerLevel} />
            <Bar active={props.powerLevel >= 4} mode={props.mode} level={props.powerLevel} />
        </Root>
    );
};
