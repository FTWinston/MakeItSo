import { styled } from '@mui/material/styles';
import { TileDisplayInfo } from '../types/TileInfo';
import { EffectIndicators } from './EffectIndicators';

const Root = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'stretch',
    flexGrow: 1,
    width: '10em',
    height: '6em',
    paddingTop: '3.65em',
}));

const SvgRoot = styled('svg')({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
});

const pathPerimeter = Math.PI * 2 * 10 + 200;

const HealthPath = styled('path')<{ health: number }>(props => {
    const healthScale = props.health / 100;
    const healthByte = Math.round(healthScale * 255);
    const color = `rgb(${255 - healthByte}, ${healthByte}, 0)`;
    const fillDistance = healthScale * pathPerimeter;

    return {
        stroke: color,
        fill: props.theme.palette.background.paper,
        strokeDasharray: `${fillDistance}, ${pathPerimeter - fillDistance}`,
        strokeDashoffset: pathPerimeter - 35,
        transition: 'stroke-dasharray 400ms ease-in-out',
    };
});

const NameText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    alignmentBaseline: 'middle',
    fontSize: '14px',
    fontWeight: 'bold',
}));

const HealthText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    alignmentBaseline: 'middle',
    fontSize: '12px',
}));

export const SystemTile: React.FC<TileDisplayInfo> = (props) => {
    const constrainedHealth = Math.max(0, Math.min(100, props.health));

    return (
        <Root role="group">
            <SvgRoot viewBox="0 0 100 60">
                <HealthPath
                    d="M 15 5 L 85 5 A 10 10 0 0 1 95 15 L 95 45 A 10 10 0 0 1 85 55 L 15 55 A 10 10 0 0 1 5 45 L 5 15 A 10 10 0 0 1 15 5"
                    health={constrainedHealth}
                    strokeWidth={3.6}
                />
                <NameText x="50" y="30" role="heading">{props.name}</NameText>
                
                <HealthText x="50" y="17" aria-label="health">
                    {Math.round(constrainedHealth)}%
                </HealthText>
            </SvgRoot>

            <EffectIndicators effects={props.effects} />
        </Root>
    );
};