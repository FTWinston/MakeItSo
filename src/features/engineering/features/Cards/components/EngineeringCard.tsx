import type { AriaRole } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from 'src/components/Typography';
import { grey, blue, purple, deepOrange } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { EngineeringCardInfo, EngineeringCardRarity } from '../types/EngineeringCard';
import { CardIcon } from './CardIcon';
import { MuiColor } from 'src/types/Colors';
import { ScreenReaderOnly } from 'src/components/ScreenReaderOnly';

interface Props extends Omit<EngineeringCardInfo, 'id'> {
    className?: string;
    style?: React.CSSProperties;
    role?: AriaRole;
}

export const cardWidth = '11.2em';
export const cardHeight = '8em';

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
        fontSize: '0.75em',
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
    const { t } = useTranslation('engineering');
    
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

    return (
        <CardRoot
            palette={color}
            className={props.className}
            style={props.style}
            variant="outlined"
            role={props.role}
        >
            <Header
                avatar={(
                    <IconWrapper className="icon" role="presentation">
                        <Icon card={props.type} />
                    </IconWrapper>
                )}
                title={t(`card ${props.type} title`)}
            />
            <Content sx={{ paddingTop: 0 }}>
                <ScreenReaderOnly>{t(`rarity ${props.rarity}`)}.</ScreenReaderOnly>
                <Description>
                    {t(`card ${props.type} desc`)}
                </Description>
            </Content>
        </CardRoot>
    );
};
