import { EffectIndicator, indicatorSize } from './EffectIndicator';
import { SystemStatusEffectInfo } from '../../../types/SystemStatusEffect';
import { styled } from '@mui/material/styles';
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
    flexGrow: 1,
    height: indicatorSize,
});

const IndicatorWrapper = styled('div'
    , { shouldForwardProp: (prop) => prop !== 'showing' }
)<{ showing: boolean } & Omit<ComponentProps<typeof Zoom>, 'ref'>>(({ showing }) => ({
    boxSizing: 'border-box',
    maxWidth: showing ? '1.9em' : 0,
    transitionProperty: 'max-width, padding',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: '500ms',
    height: indicatorSize,
    padding: showing ? '0 0.3em' : 0,
    position: 'absolute',
    width: '1.9em',
}));

const DelayedCollapse = styled(Collapse)({
    transitionDelay: '500ms',
    position: 'relative',
    flexGrow: 1,
    maxWidth: '1.9em',
});

interface WrappedItemProps extends Omit<ComponentProps<typeof Zoom>, 'children'> {
    effect: SystemStatusEffectInfo;
}

const WrappedIndicatorItem: React.FC<WrappedItemProps> = props => {
    const { effect, ...transitionProps } = props;
    
    return (
        <DelayedCollapse {...transitionProps} timeout={500} unmountOnExit>
            <IndicatorWrapper showing={transitionProps.in!}>
                <Zoom {...transitionProps} timeout={500}>
                    <div>
                        <EffectIndicator {...effect} />
                    </div>
                </Zoom>
            </IndicatorWrapper>
        </DelayedCollapse>
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