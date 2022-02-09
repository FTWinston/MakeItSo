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

export const cardWidth = '11.2em';
export const cardHeight = '8em';
export const shrinkScale = 0.8;

interface RootProps {
    palette: MuiColor;
}

const CardRoot = styled(Card    
    , { shouldForwardProp: (prop) => prop !== 'palette' }
)<RootProps>(({ palette }) => ({
    width: cardWidth,
    height: cardHeight,
    borderWidth: '0.1em',
    transition: 'border-color 0.2s linear',
    borderRadius: '0.225em',
    backgroundColor: 'background.paper',
    borderColor: alpha(palette[600], 0.5),
    '&:hover': {
        borderColor: palette[700],
    },
    ' .icon': {
        backgroundColor: palette[600],
    },
}));

const Header = styled(CardHeader)({
    padding: '0.8em',
    '& .MuiCardHeader-title': {
        fontSize: '0.575em',
    },
    '& .MuiCardHeader-avatar': {
        marginRight: '0.7em',
    },
});

const IconWrapper = styled(Avatar)({
    fontSize: '1em',
    width: '1.925em',
    height: '1.925em',
});

const Icon = styled(CardIcon)({
    fontSize: '1em',
    width: '1.125em',
    height: '1.125em',
    color: 'white',
});

const Content = styled(CardContent)({
    padding: '0.8em',
});

const Description = styled(Typography)({
    fontSize: '0.65em',
});

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
            <Header
                avatar={(
                    <IconWrapper
                        aria-label={`rarity_${props.rarity}`}
                        className="icon"
                    >
                        <Icon card={props.type} />
                    </IconWrapper>
                )}
                title={`card_${props.type}_title`}
            />
            <Content sx={{ paddingTop: 0 }}>
                <Description>
                    {`card_${props.type}_desc`}
                </Description>
            </Content>
        </CardRoot>
    );
};
