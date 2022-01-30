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
    height: 32,
});

const Item = styled('div')({
    position: 'absolute',
    top: 0,
    transition: 'left 1s ease-in-out',
});

export const EffectIndicators: React.FC<Props> = props => {
    return (
        <Root className={props.className}>
            {props.effects.map((effect, index) => (
                <Item
                    key={index}
                    style={{ left: `calc((100% - ${indicatorSize}px) * ${index} / ${props.effects.length})` }}
                >
                    <EffectIndicator {...effect} />
                </Item>
            ))}
        </Root>
    );
};