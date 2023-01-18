import { useTranslation } from 'react-i18next';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { CardIcon } from './CardIcon';
import { cardWidth } from './CardDisplay';
import { ScreenReaderOnly } from 'src/components';
import { Avatar, Card, CardContent, MuiColor, Typography, alpha, styled } from 'src/lib/mui';
import { getRarityColor } from '../utils/getRarityColor';

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
    marginBottom: '0.7em',
});

const Icon = styled(CardIcon)({
    fontSize: '1em',
    width: '1.125em',
    height: '1.125em',
    color: 'white',
});

export const EngineeringCardStub: React.FC<Props> = props => {
    const { t } = useTranslation('engineering');

    const color = getRarityColor(props.rarity);

    return (
        <StubRoot
            className={props.className}
            palette={color}
            variant="outlined"
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            <Content>
                <IconWrapper className="icon" role="presentation">
                    <Icon card={props.type} />
                </IconWrapper>

                <Title>{t(`card ${props.type} title`)}</Title>

                <ScreenReaderOnly>{t(`rarity ${props.rarity}`)}. {t(`card ${props.type} desc`)}</ScreenReaderOnly>
            </Content>
        </StubRoot>
    );
};
