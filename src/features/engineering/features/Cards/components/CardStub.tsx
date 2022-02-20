import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { grey, blue, purple, deepOrange } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { EngineeringCardInfo, EngineeringCardRarity } from '../types/EngineeringCard';
import { CardIcon } from './CardIcon';
import { MuiColor } from 'src/types/Colors';
import { cardWidth } from './EngineeringCard';
import CardContent from '@mui/material/CardContent';
import { Typography } from 'src/components/Typography';
import { ScreenReaderOnly } from 'src/components/ScreenReaderOnly';

interface Props extends Omit<EngineeringCardInfo, 'id' | 'description'> {
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const stubWidth = '3.8em';
export const stubHeight = cardWidth;

interface RootProps {
    palette: MuiColor;
}

const StubRoot = styled(Card
    , { shouldForwardProp: (prop) => prop !== 'palette' }
)<RootProps>(({ palette }) => ({
    width: stubWidth,
    height: stubHeight,
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

const Content = styled(CardContent)({
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const Title = styled(Typography)({
    writingMode: 'vertical-rl',
    fontSize: '0.75em',
});

const IconWrapper = styled(Avatar)({
    fontSize: '1em',
    width: '1.925em',
    height: '1.925em',
    marginBottom: '0.925em',
});

const Icon = styled(CardIcon)({
    fontSize: '1em',
    width: '1.125em',
    height: '1.125em',
    color: 'white',
});

export const EngineeringCardStub: React.FC<Props> = props => {
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
        <StubRoot
            className={props.className}
            palette={color}
            variant="outlined"
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            <Content>
                <IconWrapper
                    aria-label={t(`rarity_${props.rarity}`)}
                    className="icon"
                >
                    <Icon card={props.type} />
                </IconWrapper>

                <Title>{t(`card_${props.type}_title`)}</Title>

                <ScreenReaderOnly>{t(`card_${props.type}_desc`)}</ScreenReaderOnly>
            </Content>
        </StubRoot>
    );
};
