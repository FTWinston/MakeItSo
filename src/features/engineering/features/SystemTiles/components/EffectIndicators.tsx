import { EffectIndicator, indicatorSize } from './EffectIndicator';
import { ClientSystemStatusEffectInstance } from '../../../types/SystemStatusEffect';
import { styled } from '@mui/material/styles';

interface Props {
    className?: string;
    effects: ClientSystemStatusEffectInstance[];
}

const Root = styled('div')({
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: indicatorSize,
});

const Item = styled('div')({
    position: 'absolute',
    top: 0,
    transition: 'left 1s ease-in-out',
    width: indicatorSize,
    height: indicatorSize,
});

export const EffectIndicators: React.FC<Props> = props => {
    return (
        <Root className={props.className}>
            {props.effects.map((effect, index) => (
                <Item
                    key={index}
                    style={{ left: `calc((100% - ${indicatorSize}) * ${index + 0.5} / ${props.effects.length})` }}
                >
                    <EffectIndicator {...effect} />
                </Item>
            ))}
        </Root>
    );
};