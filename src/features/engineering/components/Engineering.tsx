import type { BadgeProps } from '@mui/material/Badge/Badge';
import { styled, useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from 'src/components/Badge';
import { Button } from 'src/components/Button';
import { Page } from 'src/components/Page';
import { AppBarHeight, SystemAppBar } from 'src/components/SystemAppBar';
import { TimeSpan } from 'src/types/TimeSpan';
import { CardHand, stubHeight, EngineeringCardInfo, CardChoice } from '../features/Cards';
import { EngineeringCard } from '../features/Cards';
import { SystemTiles, TileDisplayInfo } from '../features/SystemTiles';
import DraftIcon from '@mui/icons-material/FilterNone';
import SystemsIcon from '@mui/icons-material/GridView';

interface Props {
    systems: TileDisplayInfo[];
    handCards: EngineeringCardInfo[];
    choiceCards: EngineeringCardInfo[];
    numChoices: number;
    choiceProgress?: TimeSpan;
    log: string[];
    chooseCard: (id: number) => void;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr ${stubHeight}`,
});

const AppBarButton = styled(Button)({
    padding: '0.15em 0.65em',
});

const AppBarBadge = styled(Badge)<BadgeProps>({
    position: 'absolute',
    right: '0.75em',
    '& .MuiBadge-badge': {
        top: '1.95em',
    },
});

const FocusedCardDisplay = styled(EngineeringCard)({
    pointerEvents: 'none',
    zIndex: 2,
    fontSize: '1.5em',
    position: 'absolute',
    top: `45vh`,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
});

export const Engineering: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');
    const theme = useTheme();
    
    const [focusedCard, setFocusedCard] = useState<EngineeringCardInfo | null>(null);

    const [draggingCard, setDragging] = useState<EngineeringCardInfo | null>(null);
    
    const [showChoice, setShowChoice] = useState(false);

    const allowedSystems = draggingCard === null || draggingCard.allowedSystems === undefined
        ? null
        : draggingCard.allowedSystems;

    const systemsOrChoice = showChoice
        ? (
            <CardChoice
                cards={props.choiceCards ?? []}
                numChoices={props.numChoices}
                focus={setFocusedCard}
                choose={props.chooseCard}
                progress={props.choiceProgress}
            />
        )
        : (
            <SystemTiles
                systems={props.systems}
                allowedTargets={allowedSystems}
            />
        );

    const focusedCardDisplay = focusedCard === null
        ? null
        : (
            <FocusedCardDisplay
                type={focusedCard.type}
                rarity={focusedCard.rarity}
                role="presentation"
            />
        );

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };


    const tryPlayCard = (card: EngineeringCardInfo, x: number, y: number) => {
        setDragging(null);
        
        /*
        const elements: Element[] = document.elementsFromPoint
            ? document.elementsFromPoint(x, y)
            : (document as any).msElementsFromPoint(x, y);

        for (let i=0; i<elements.length; i++) {
            const element = elements[i];
            const attrVal = element.getAttribute('data-system');
            if (attrVal === null) {
                continue;
            }

            const system = parseInt(attrVal) as System;

            if (card.allowedSystems === undefined || (card.allowedSystems & system) !== 0) {
                dispatch({
                    type: 'eng play',
                    card: card.id,
                    system,
                });
            }
            
            break;
        }
        */
    };

    return (
        <Root>
            <SystemAppBar title={t('title')}>
                <Zoom
                    in={showChoice}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${showChoice ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <AppBarButton
                        color="primary"
                        variant="outlined"
                        onClick={() => setShowChoice(false)}
                        startIcon={<SystemsIcon />}
                    >
                        {t('shipSystems')}
                    </AppBarButton>
                </Zoom>
                <Zoom
                    in={!showChoice}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${!showChoice ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <AppBarBadge badgeContent={props.numChoices} color="secondary">
                        <AppBarButton
                            color="secondary"
                            variant="outlined"
                            onClick={() => setShowChoice(true)}
                            startIcon={<DraftIcon />}
                        >
                            {t('chooseCards')}
                        </AppBarButton>
                    </AppBarBadge>
                </Zoom>    
            </SystemAppBar>

            {systemsOrChoice}
        
            <CardHand
                cards={props.handCards}
                focus={setFocusedCard}
                dragStart={setDragging}
                dragEnd={tryPlayCard}
            />

            {focusedCardDisplay}
        </Root>
    );
};