import { Box, styled, SxProps, Theme } from 'src/lib/mui';
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

export type DisplayMode = 'normal' | 'success' | 'error' | 'warn';

interface BarProps {
    active: boolean;
    level: PowerLevel;
    mode: DisplayMode;
}

function pickColor(theme: Theme, mode: DisplayMode) {
    switch (mode) {
        case 'success':
            return theme.palette.success.light;
        case 'error':
            return theme.palette.error.main;
        case 'warn':
            return theme.palette.warning.main;
        default:
            return theme.palette.text.primary;
    }
}

const Bar = styled(Box,
    { shouldForwardProp: (prop) => prop !== 'active' && prop !== 'level' }
)<BarProps>((({ active, level, mode, theme }) => {
    let backgroundColor;
    let opacity;

    if (active) {
        backgroundColor = pickColor(theme, mode);
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
    ['aria-label']?: string;
    className?: string;
    sx?: SxProps;
}

export const PowerDisplay: React.FC<Props> = (props) => {
    const { powerLevel, mode, ...otherProps } = props;

    return (
        <Root
            role="figure"
            {...otherProps}
        >
            <Bar active={powerLevel >= 1} mode={mode} level={powerLevel} />
            <Bar active={powerLevel >= 2} mode={mode} level={powerLevel} />
            <Bar active={powerLevel >= 3} mode={mode} level={powerLevel} />
            <Bar active={powerLevel >= 4} mode={mode} level={powerLevel} />
        </Root>
    );
};
