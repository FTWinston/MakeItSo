import { styled } from '@mui/material/styles';
import { TileDisplayInfo } from '../types/TileInfo';
import { EffectIndicators } from './EffectIndicators';

const Root = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    width: '10em',
    height: '6em',
}));

const SvgRoot = styled('svg')({
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
});

const ellipseRx = 45;
const ellipseRy = 25;
const ellipsePerimeter = 224.4229; // See https://www.mathsisfun.com/geometry/ellipse-perimeter.html

const HealthEllipse = styled('ellipse')<{ health: number }>(props => {
    const healthScale = props.health / 100;
    const healthByte = Math.round(healthScale * 255);
    const color = `rgb(${255 - healthByte}, ${healthByte}, 0)`;
    const fillDistance = healthScale * ellipsePerimeter;

    return {
        stroke: color,
        fill: 'none',
        strokeDasharray: `${fillDistance}, ${ellipsePerimeter - fillDistance}`,
        strokeDashoffset: ellipsePerimeter * 0.25,
        transition: 'stroke-dasharray 300ms ease-in-out',
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

const Effects = styled(EffectIndicators)({
    zIndex: 2,
});

export const SystemTile: React.FC<TileDisplayInfo> = (props) => {
    const constrainedHealth = Math.max(0, Math.min(100, props.health));

    return (
        <Root role="group">
            <SvgRoot viewBox="0 0 100 60">
                <HealthEllipse
                    cx="50" cy="30"
                    rx={ellipseRx} ry={ellipseRy}
                    health={constrainedHealth}
                    strokeWidth={3.6}
                />
                <NameText x="50" y="30" role="heading">{props.name}</NameText>
                
                <HealthText x="50" y="17" aria-label="health">
                    {Math.round(constrainedHealth)}%
                </HealthText>
            </SvgRoot>

            <Effects effects={props.effects} />
        </Root>
    );
};