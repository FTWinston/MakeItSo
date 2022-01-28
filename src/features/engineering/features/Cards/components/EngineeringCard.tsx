import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { grey, blue, purple, deepOrange } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import { EngineeringCardInfo, EngineeringCardRarity } from '../types/EngineeringCard';
import { CardIcon } from './CardIcon';
import { MuiColor } from 'src/types/Colors';

interface Props extends Omit<EngineeringCardInfo, 'id'> {
    className?: string;
    style?: React.CSSProperties;
}

export const cardWidth = 224;
export const cardHeight = 160;
export const shrinkScale = 0.8;

interface RootProps {
    palette: MuiColor;
}

const CardRoot = styled(Card)<RootProps>(({ palette }) => ({
    width: cardWidth,
    height: cardHeight,
    transition: 'border-color 0.2s linear',
    backgroundColor: 'background.paper',
    borderColor: alpha(palette[600], 0.5),
    '&:hover': {
        borderColor: palette[700],
    },
    ' .icon': {
        backgroundColor: palette[600],
    },
}));

export const EngineeringCard: React.FC<Props> = props => {
    let color: MuiColor;
    switch (props.rarity) {
    case EngineeringCardRarity.Common:
        color = grey; break;
    case EngineeringCardRarity.Uncommon:
        color = blue; break;
    case EngineeringCardRarity.Rare:
        color = purple; break;
    case EngineeringCardRarity.Epic:
        color = deepOrange; break;
    }

    // TODO: internationalise identifiers
    return (
        <CardRoot
            palette={color}
            className={props.className}
            style={props.style}
            variant="outlined"
        >
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
        </CardRoot>
    );
};
