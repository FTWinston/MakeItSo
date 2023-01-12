import Button from '@mui/material/Button';
import { styled, Theme } from '@mui/material/styles';
import { normal } from 'color-blend';
import { RGBA } from 'color-blend/dist/types';
import { useTranslation } from 'react-i18next';
import { LinearProgress } from 'src/components';
import { maxSystemHealth } from 'src/features/engineering/utils/systemActions';
import { PowerLevel } from 'src/types/ShipSystem';
import { TileDisplayInfo } from '../types/TileInfo';
import { EffectIndicators } from './EffectIndicators';
import { PowerDisplay } from './PowerDisplay';

const Root = styled(Button,
    { shouldForwardProp: (prop) => prop !== 'validTarget' && prop !== 'health' && prop !== 'power' }
)<{ validTarget: boolean | undefined, health: number, power: PowerLevel }>(({ theme, health, power, validTarget }) => {
    let color: string;
    let backgroundColor = theme.palette.background.paper;
    let hover: object | undefined;
    if (validTarget === true) {
        color = theme.palette.success.light;
        backgroundColor = '#242';
        hover = {
            color: theme.palette.text.primary,
            backgroundColor: '#474',
        };
    }
    else if (validTarget === false) {
        color = theme.palette.error.light;
    }
    else if (health === 0 || power === 0) {
        color = theme.palette.error.light;
        backgroundColor = '#200';
    }
    else {
        color = theme.palette.text.primary;
    }

    return {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
        fontSize: '1em',
        width: '9em',
        height: '5.05em',
        paddingTop: '2.95em',
        margin: 0,
        borderRadius: '0.75em',
        color,
        backgroundColor,
        transition: 'color 200ms ease-in-out, background-color 200ms ease-in-out',
        '&:hover': hover,
    };
});

const SvgRoot = styled('svg')({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
});

const pathPerimeter = Math.PI * 2 * 10 + 224;

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
    const healthScale = props.health / maxSystemHealth;
    const fillDistance = healthScale * pathPerimeter;

    return {
        fill: 'none',
        stroke: getHealthColor(healthScale, props.theme),
        strokeDasharray: `${fillDistance}, ${pathPerimeter - fillDistance}`,
        strokeDashoffset: pathPerimeter - 39,
        transition: 'stroke-dasharray 400ms ease-in-out',
    };
});

const NameText = styled('text')(({ theme }) => ({
    fill: 'currentColor',
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

const HealText = styled('text')(({ theme }) => ({
    fill: theme.palette.success.main,
    textAnchor: 'end',
    alignmentBaseline: 'middle',
    fontSize: '12px',
}));

const RestoreProgress = styled(LinearProgress)({
    width: '5em',
});

const SystemPower = styled(PowerDisplay,
    { shouldForwardProp: (prop) => prop !== 'faint' }
)<{ faint: boolean }>((({ faint }) => ({
    margin: '0 0.2em 0.6em 0',
    opacity: faint ? 0.3 : undefined
})));

const Effects = styled(EffectIndicators)({
    paddingRight: '0.5em',
})

interface Props extends TileDisplayInfo {
    onClick?: () => void;
    onMouseUp?: () => void;
    onDragEnd?: () => void;
    healAmount: number;
    validTarget?: boolean;
}

export const SystemTile: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');
    const constrainedHealth = Math.max(0, Math.min(100, props.health));
    const name = t(`system ${props.system}`);

    const healthText = constrainedHealth === 0
        ? t('noHealth')
        : `${Math.round(constrainedHealth)}%`;

    const healAmountElement = props.health && props.healAmount
        ? (
            <HealText x="96" y="14" aria-label={t('heal amount')}>
                +{props.healAmount}
            </HealText>
        )
        : undefined;

    const restoration = props.health === 0
        ? (
            <RestoreProgress
                variant="buffer"
                color="warning"
                value={props.restoration ?? 0}
                valueBuffer={(props.restoration ?? 0) + (props.healAmount ?? 0)}
            />
        )
        : undefined;

    const effectIndicators = props.health === 0
        ? undefined
        : <Effects effects={props.effects} />

    const powerDisplay = props.health === 0
        ? undefined
        : <SystemPower powerLevel={props.power} faint={props.healAmount > 0} />
    
    return (
        <Root
            variant="text"
            onClick={props.onClick}
            onMouseUp={props.onMouseUp}
            onDragEnd={props.onDragEnd}
            health={constrainedHealth}
            power={props.power}
            validTarget={props.validTarget}
            disabled={props.validTarget === false}
            aria-label={name}
        >
            <SvgRoot viewBox="0 0 100 56">
                <HealthPath
                    d="M 11 1 L 89 1 A 10 10 0 0 1 99 11 L 99 45 A 10 10 0 0 1 89 55 L 11 55 A 10 10 0 0 1 1 45 L 1 11 A 10 10 0 0 1 11 1"
                    health={constrainedHealth}
                    strokeWidth={4}
                />
                <NameText x="50" y="28" role="presentation">{name}</NameText>
                
                <HealthText x="50" y="14" aria-label={t('health')}>
                    {healthText}
                </HealthText>
                
                {healAmountElement}
            </SvgRoot>

            {restoration}
            {effectIndicators}
            {powerDisplay}
        </Root>
    );
};
