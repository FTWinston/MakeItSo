import type { AriaRole } from 'react';
import { Avatar, Card, CardContent, CardHeader, ScreenReaderOnly, Typography } from 'src/components';
import { grey, blue, purple, deepOrange } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { EngineeringCardInfo, EngineeringCardRarity } from '../types/EngineeringCard';
import { CardIcon } from './CardIcon';
import { MuiColor } from 'src/types/Colors';

interface Props extends Omit<EngineeringCardInfo, 'id'> {
    className?: string;
    repairMode?: boolean;
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
    backgroundColor: 'background.paper',
    borderColor: alpha(palette[600], 0.5),
    '&:hover': {
        borderColor: palette[700],
    },
    ' .icon': {
        backgroundColor: palette[600],
    },
}));

const Icon = styled(CardIcon)({
    fontSize: '1em',
    width: '1.125em',
    height: '1.125em',
    color: 'white',
});

const Content = styled(CardContent)({
    paddingTop: 0,
});

const Description = styled(Typography, { shouldForwardProp: (prop) => prop !== 'disableEffect' })<{ disableEffect?: boolean }>(({ disableEffect, theme }) => ({
    fontSize: '0.65em',
    textDecoration: disableEffect ? 'line-through' : undefined,
    textDecorationColor: disableEffect ? theme.palette.error.main : undefined,
    color: disableEffect ? theme.palette.grey[500] : undefined,
}));

export const CardDisplay: React.FC<Props> = props => {
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
            <CardHeader
                avatar={(
                    <Avatar className="icon" role="presentation">
                        <Icon card={props.type} />
                    </Avatar>
                )}
                title={t(`card ${props.type} title`)}
            />
            <Content>
                <ScreenReaderOnly>{t(`rarity ${props.rarity}`)}.</ScreenReaderOnly>
                <Description disableEffect={props.repairMode}>
                    {t(`card ${props.type} desc`, props.descParams)}
                </Description>
            </Content>
        </CardRoot>
    );
};
