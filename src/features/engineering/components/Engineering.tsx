import EngineeringIcon from '@mui/icons-material/Engineering';
import { styled } from '@mui/material/styles';
import { Tab } from 'src/components/Tab';
import { Tabs } from 'src/components/Tabs';
import { ComponentProps, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from 'src/components/Badge';
import { Page } from 'src/components/Page';
import { AppBarHeight, SystemAppBar } from 'src/components/SystemAppBar';
import { allSystems, ShipSystem } from 'src/types/ShipSystem';
import { TimeSpan } from 'src/types/TimeSpan';
import { CardHand, stubHeight, EngineeringCardInfo, CardChoice } from '../features/Cards';
import { CardDisplay } from '../features/Cards';
import { SystemTiles, ClientSystemInfo } from '../features/SystemTiles';
import Box from '@mui/material/Box';

interface Props {
    systems: ClientSystemInfo[];
    handCards: EngineeringCardInfo[];
    choiceCards: EngineeringCardInfo[];
    numChoices: number;
    choiceProgress?: TimeSpan;
    chooseCard: (id: number) => void;
    playCard: (card: EngineeringCardInfo, system: ShipSystem) => void;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr ${stubHeight}`,
});

const AppBarTab = styled(Tab)<ComponentProps<typeof Tab>>({
    marginTop: '4px',
});

const AppBarBadge = styled(Badge)<ComponentProps<typeof Badge>>({
    '& .MuiBadge-badge': {
        right: '-0.55em',
    },
});

const FocusedCardDisplay = styled(CardDisplay)({
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
    
    const [focusedCard, setFocusedCard] = useState<EngineeringCardInfo | null>(null);
    const [cardSelected, setCardSelected] = useState(false);
    
    const [contentTab, setContentTab] = useState<'systems' | 'draw'>('systems');

    const validTargetSystems = !cardSelected || focusedCard === null
        ? null
        : focusedCard.allowedSystems === undefined
            ? allSystems
            : focusedCard.allowedSystems;

    const tryPlayCard = (system: ShipSystem) => {
        if (focusedCard === null) {
            return;
        }

        console.log(`trying to play card ${(focusedCard?.id ?? '<not found>')} on system ${system}`);
        
        props.playCard(focusedCard, system);
        setFocusedCard(null);
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

    const expandSystem = (system: ShipSystem) => {
        console.log(`ok, trying to expand system ${system}`);
    };

    useLayoutEffect(() => setFocusedCard(null), [contentTab]);
    
    const systemsOrChoice = contentTab === 'draw'
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
                allowedTargets={validTargetSystems}
                tileSelected={focusedCard ? tryPlayCard : expandSystem}
            />
        );

    const focusedCardDisplay = focusedCard === null || cardSelected
        ? null
        : (
            <FocusedCardDisplay
                type={focusedCard.type}
                rarity={focusedCard.rarity}
                role="presentation"
            />
        );

    return (
        <Root>
            <SystemAppBar>
                <EngineeringIcon
                    fontSize="large"
                    titleAccess={t('title')}
                    role="img"
                    color="disabled"
                />
                <Box sx={{flexGrow: 1}} />

                <Tabs
                    value={contentTab}
                    onChange={(_e, newTab) => setContentTab(newTab)}
                >
                    <AppBarTab label={t('ship systems')} value="systems" />
                    <AppBarTab
                        label={<AppBarBadge badgeContent={props.numChoices} invisible={contentTab === 'draw'} color="secondary">{t('choose cards')}</AppBarBadge>}
                        color="secondary"
                        value="draw"
                        disabled={props.numChoices === 0}
                    />
                </Tabs>
            </SystemAppBar>

            {systemsOrChoice}
        
            <CardHand
                cards={props.handCards}
                setFocus={card => { setFocusedCard(card); setCardSelected(false); }}
                selectedCard={cardSelected ? focusedCard : null}
                selectFocusedCard={contentTab === 'draw' ? () => {} : () => setCardSelected(true)}
                clearSelection={() => setCardSelected(false)}
            />

            {focusedCardDisplay}
        </Root>
    );
};