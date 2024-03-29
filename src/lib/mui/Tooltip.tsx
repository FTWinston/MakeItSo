import MuiTooltip from '@mui/material/Tooltip';
import { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof MuiTooltip>, 'arrow' | 'disableFocusListener' | 'enterTouchDelay'>;

export const Tooltip: React.FC<Props> = props => {
    return (
        <MuiTooltip disableFocusListener arrow enterTouchDelay={150} {...props}>
            {props.children}
        </MuiTooltip>
    );
}
