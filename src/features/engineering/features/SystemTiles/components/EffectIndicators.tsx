import Box from '@mui/material/Box';
import { EffectIndicator, indicatorSize } from './EffectIndicator';
import { ClientSystemStatusEffectInstance } from '../../../types/SystemStatusEffect';
import { styled } from '@mui/material/styles';

interface Props {
    className?: string;
    effects: ClientSystemStatusEffectInstance[];
}

const Root = styled(Box)({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 32,
    '& .item': {
        position: 'absolute',
        top: 0,
        transition: 'left 1s ease-in-out',
    },
});

export const EffectIndicators: React.FC<Props> = props => {
    return (
        <Root position="relative" display="flex" className={props.className}>
            {props.effects.map((effect, index) => (
                <div
                    className="item"
                    key={index}
                    style={{ left: `calc((100% - ${indicatorSize}px) * ${index} / ${props.effects.length})` }}
                >
                    <EffectIndicator {...effect} />
                </div>
            ))}
        </Root>
    );
};