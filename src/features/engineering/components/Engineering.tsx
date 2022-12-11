import { styled } from '@mui/material/styles';
import { useLayoutEffect, useState } from 'react';
import { Page } from 'src/components/Page';
import { AppBarHeight } from 'src/components/SystemAppBar';
import { allSystems, ShipSystem } from 'src/types/ShipSystem';
import { TimeSpan } from 'src/types/TimeSpan';
import { CardHand, stubHeight, EngineeringCardInfo, CardChoice } from '../features/Cards';
import { CardDisplay } from '../features/Cards';
import { SystemTiles, ClientSystemInfo } from '../features/SystemTiles';
import { EngineeringAppBar } from './EngineeringAppBar';

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

const FocusedCardDisplay = styled(CardDisplay)({
    pointerEvents: 'none',
    zIndex: 2,
    fontSize: '1.5em',
    position: 'absolute',
    bottom: '10vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
});

export const Engineering: React.FC<Props> = (props) => {
    const [focusedCard, setFocusedCard] = useState<EngineeringCardInfo | null>(null);
    const [cardSelected, setCardSelected] = useState(false);
    
    const [currentTab, setCurrentTab] = useState<'systems' | 'draw'>('systems');

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

    useLayoutEffect(() => setFocusedCard(null), [currentTab]);
    
    const systemsOrChoice = currentTab === 'draw'
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
            <EngineeringAppBar
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                numChoices={props.numChoices}
            />

            {systemsOrChoice}
        
            <CardHand
                cards={props.handCards}
                setFocus={card => { setFocusedCard(card); setCardSelected(false); }}
                selectedCard={cardSelected ? focusedCard : null}
                selectFocusedCard={currentTab === 'draw' ? () => {} : () => setCardSelected(true)}
                clearSelection={() => setCardSelected(false)}
            />

            {focusedCardDisplay}
        </Root>
    );
};