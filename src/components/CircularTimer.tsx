import React, { useState, useEffect, PropsWithChildren } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { TimeSpan } from 'src/types/TimeSpan';
import { getCompletedFraction } from 'src/utils/timeSpans';
import { ColorName } from 'src/types/Colors';
import { styled } from '@mui/material/styles';

interface Props extends TimeSpan {
    className?: string;
    color?: ColorName;
    size?: number;
}

const Root = styled('div')({
    position: 'relative',
    display: 'flex',
});

const ContentWrapper = styled('div')({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
});

export const CircularTimer = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>((props, ref) => {
    const { startTime, endTime } = props;
    const [value, setValue] = useState(() => 100 * getCompletedFraction(startTime, endTime));

    useEffect(
        () => {
            const interval = setInterval(
                () => setValue(100 * getCompletedFraction(startTime, endTime)),
                200
            );

            return () => clearInterval(interval);
        },
        [startTime, endTime]
    );

    return (
        <Root
            className={props.className}
            ref={ref}
        >
            <CircularProgress
                variant="determinate"
                className={props.className}
                color={props.color}
                value={value}
                size={props.size}
            />
            <ContentWrapper>
                {props.children}
            </ContentWrapper>
        </Root>
    );
});