import { EffectIndicator, indicatorSize } from './EffectIndicator';
import { SystemStatusEffectInfo } from '../../../types/SystemStatusEffect';
import { styled, useTheme } from '@mui/material/styles';
import { TransitionGroup } from 'react-transition-group';
import Zoom from '@mui/material/Zoom';
import Collapse from '@mui/material/Collapse';
import { ComponentProps } from 'react';

interface Props {
    className?: string;
    effects: SystemStatusEffectInfo[];
}

const Root = styled('div')({
    display: 'flex',
    position: 'relative',
    width: '100%',
    flexGrow: 1,
    height: indicatorSize,
});

const Item = styled('div')({
    width: '1.9em',
    height: indicatorSize,
    padding: '0 0.3em',
});

const DelayCollapse = styled(Collapse)({
    transitionDelay: '5000ms', // TODO: THIS IS ALSO IGNORED
});

interface WrappedItemProps extends Omit<ComponentProps<typeof Zoom>, 'children'> {
    effect: SystemStatusEffectInfo;
}

const WrappedIndicatorItem: React.FC<WrappedItemProps> = props => {
    const theme = useTheme();
    
    const zoomDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <DelayCollapse
            {...props}
            orientation="horizontal"
            timeout={5000} /* TODO: WHY DOES THIS GET IGNORED? I WANT THIS TO BE SLOWER!!! */
            unmountOnExit
        >
            <Item>
                <Zoom {...props} timeout={zoomDuration}>
                    <div>
                        <EffectIndicator {...props.effect} />
                    </div>
                </Zoom>
            </Item>
        </DelayCollapse>
    )
}

export const EffectIndicators: React.FC<Props> = props => {
    return (
        <Root className={props.className}>
            <TransitionGroup component={null}>
                {props.effects.map(effect => (        
                    <WrappedIndicatorItem key={effect.id} effect={effect} />
                ))}
            </TransitionGroup>
        </Root>
    );
};