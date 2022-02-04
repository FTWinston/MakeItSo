import { styled, Theme } from '@mui/material/styles';
import { normal } from 'color-blend';
import { RGBA } from 'color-blend/dist/types';
import { TileDisplayInfo } from '../types/TileInfo';
import { EffectIndicators } from './EffectIndicators';

const Root = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'stretch',
    flexGrow: 1,
    width: '10em',
    height: '6em',
    paddingTop: '3.575em',
}));

const SvgRoot = styled('svg')({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
});

const pathPerimeter = Math.PI * 2 * 10 + 200;

const hex2rgba = (hex: string, a: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b, a };
};

function getHealthColor(healthScale: number, theme: Theme) {
    let fromColor: string;
    let toColor: string;
    let blendAmount: number;

    if (healthScale < 0.5) {
        fromColor = theme.palette.error.dark;
        toColor = theme.palette.warning.dark;
        blendAmount = healthScale * 2;
    }
    else {
        fromColor = theme.palette.warning.dark;
        toColor = theme.palette.success.dark;
        blendAmount = (healthScale - 0.5) * 2;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const color: RGBA = normal(
        hex2rgba(fromColor, 1),
        hex2rgba(toColor, blendAmount)
    );

    return `rgb(${color.r},${color.g},${color.b})`;
}

const HealthPath = styled('path')<{ health: number }>(props => {
    const healthScale = props.health / 100;
    const fillDistance = healthScale * pathPerimeter;

    return {
        stroke: getHealthColor(healthScale, props.theme),
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
    fill: theme.palette.text.secondary,
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
