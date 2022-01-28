import Box from '@mui/material/Box';
import { CircularProgression } from 'src/components/CircularProgression';
import { TimeSpan } from 'src/types/TimeSpan';
import { ColorName } from 'src/types/Colors';

interface Props extends TimeSpan {
    className?: string;
    progressClassName?: string;
    color?: ColorName;
    size: number;
}

export const CircularProgressionWrapper: React.FC<Props> = props => {
    return (
        <Box position="relative" display="inline-flex" className={props.className}>
            <CircularProgression
                startTime={props.startTime}
                endTime={props.endTime}
                color={props.color}
                size={props.size}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {props.children}
            </Box>
        </Box>
    );
};