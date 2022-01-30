import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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

const HealthSvg = styled('svg')({
    zIndex: 1,
    position: 'absolute',
    top: '0.1em; right: 0.1em',
    bottom: '0.1em; left: 0.1em',
});

const ellipseRx = 38;
const ellipseRy = 28;
const ellipsePerimeter = 208.5638; // See https://www.mathsisfun.com/geometry/ellipse-perimeter.html

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

const Name = styled(Typography)({
    zIndex: 2,
    fontSize: '1.2em',
});

const Health = styled('div')({
    order: -1,
    zIndex: 2,
    height: '1.2em',
});

const Effects = styled(EffectIndicators)({
    zIndex: 2,
});

export const SystemTile: React.FC<TileDisplayInfo> = (props) => {
    const constrainedHealth = Math.max(0, Math.min(100, props.health));

    return (
        <Root role="group">
            <HealthSvg
                role="presentation"
                viewBox="0 0 80 60"
            >
                <HealthEllipse
                    cx="40" cy="30"
                    rx={ellipseRx} ry={ellipseRy}
                    health={constrainedHealth}
                    strokeWidth={3.6}
                />
            </HealthSvg>

            <Name variant="h3">
                {props.name}
            </Name>

            <Health aria-label="health">
                <span role="presentation">H</span> {Math.round(constrainedHealth)}%
            </Health>

            <Effects effects={props.effects} />
        </Root>
    );
};