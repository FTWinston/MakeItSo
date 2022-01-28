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

const OuterCircle = styled('div')({
    zIndex: 1,
    position: 'absolute',
    borderRadius: '50%',
    top: '0.1em; right: 0.1em',
    bottom: '0.1em; left: 0.1em',
    overflow: 'hidden',
});

const InnerCircle = styled('div')(({ theme }) => ({
    position: 'absolute',
    borderRadius: '50%',
    top: '0.4em; right: 0.4em',
    bottom: '0.4em; left: 0.4em',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'inset rgba(34, 36, 38, 0.15) 0px 0px 3px 2px',
}));

const Segment = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    transformOrigin: '0 0',
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
    const constrainHealth = Math.max(0, Math.min(100, props.health));
    const healthInt = Math.round(constrainHealth);
    const healthByte = props.health * 2.55;
    const healthAngle = props.health * 3.6;
    const healthColor = `rgb(${255 - healthByte}, ${healthByte}, 0)`;

    const skew1 = healthAngle <= 90
        ? 90 - healthAngle
        : 0;

    const skew2 = healthAngle > 90 && healthAngle <= 180
        ? 180 - healthAngle
        : healthAngle > 180
            ? 0
            : 90;

    const skew3 = healthAngle > 180 && healthAngle <= 270
        ? 270 - healthAngle
        : healthAngle > 270
            ? 0
            : 90;
        
    const skew4 = healthAngle > 270
        ? 360 - healthAngle
        : 90;

    const segment1: React.CSSProperties = {
        transform: `rotate(0deg) skew(${skew1}deg)`,
        backgroundColor: healthColor,
    };
    const segment2: React.CSSProperties = {
        transform: `rotate(90deg) skew(${skew2}deg)`,
        backgroundColor: healthColor,
    };
    const segment3: React.CSSProperties = {
        transform: `rotate(180deg) skew(${skew3}deg)`,
        backgroundColor: healthColor,
    };
    const segment4: React.CSSProperties = {
        transform: `rotate(270deg) skew(${skew4}deg)`,
        backgroundColor: healthColor,
    };

    return (
        <Root role="group">
            <OuterCircle role="presentation">
                <Segment style={segment1} />
                <Segment style={segment2} />
                <Segment style={segment3} />
                <Segment style={segment4} />
                <InnerCircle />
            </OuterCircle>

            <Name variant="h3">
                {props.name}
            </Name>

            <Health aria-label="health">
                <span role="presentation">H</span> {healthInt}%
            </Health>

            <Effects effects={props.effects} />
        </Root>
    );
};