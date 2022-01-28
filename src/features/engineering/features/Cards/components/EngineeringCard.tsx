import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { blue, purple, grey } from '@mui/material/colors';
import { EngineeringCardInfo, EngineeringCardRarity } from '../types/EngineeringCard';
import { CardIcon } from './CardIcon';

interface Props extends Omit<EngineeringCardInfo, 'id'> {
    className?: string;
    style?: React.CSSProperties;
}

export const cardWidth = 224;
export const cardHeight = 160;
export const shrinkScale = 0.8;

const sharedStyle = {
    width: cardWidth,
    height: cardHeight,
    transition: 'border-color 0.2s linear',
    backgroundColor: 'background.paper',
};

const CommonCard = styled(Card)({
    ...sharedStyle,
    borderColor: alpha(grey[600], 0.5),
    '&:hover': {
        borderColor: grey[600],
    },
    ' .icon': {
        backgroundColor: grey[600],
    },
});

const UncommonCard = styled(Card)({
    ...sharedStyle,
    borderColor: alpha(grey[400], 0.5),
    '&:hover': {
        borderColor: grey[400],
    },
    ' .icon': {
        backgroundColor: grey[500],
    },
});

const RareCard = styled(Card)({
    ...sharedStyle,
    borderColor: alpha(blue[600], 0.5),
    '&:hover': {
        borderColor: blue[600],
    },
    ' .icon': {
        backgroundColor: blue[600],
    },
});

const EpicCard = styled(Card)({
    ...sharedStyle,
    borderColor: alpha(purple[300], 0.5),
    '&:hover': {
        borderColor: purple[300],
    },
    ' .icon': {
        backgroundColor: purple[300],
    },
});

function determineCardStyle(rarity: EngineeringCardRarity) {
    switch (rarity) {
    case EngineeringCardRarity.Common:
        return CommonCard;
    case EngineeringCardRarity.Uncommon:
        return UncommonCard;
    case EngineeringCardRarity.Rare:
        return RareCard;
    case EngineeringCardRarity.Epic:
        return EpicCard;
    }
}

export const EngineeringCard: React.FC<Props> = props => {
    const Root = determineCardStyle(props.rarity);

    // TODO: internationalise identifiers
    return (
        <Root className={props.className} style={props.style} variant="outlined">
            <CardHeader
                avatar={(
                    <Avatar
                        aria-label={`rarity_${props.rarity}`}
                        className="icon"
                    >
                        <CardIcon color="action" card={props.type} />
                    </Avatar>
                )}
                title={`card_${props.type}_title`}
            />
            <CardContent sx={{ paddingTop: 0 }}>
                <Typography>
                    {`card_${props.type}_desc`}
                </Typography>
            </CardContent>
        </Root>
    );
};
