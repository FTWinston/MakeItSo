import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { ShipSystem } from '../../../common/components/ShipSystem';
import { GameContext } from '../../../common/components/GameProvider';
import { SystemList } from './SystemList';
import { CardHand } from './CardHand';
import { CardChoice } from './CardChoice';
import { EngineeringTabs } from './EngineeringTabs';
import { EngineeringCardInfo } from '../data/EngineeringCard';
import { System } from '../../../common/data/System';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
    },
    tabsWrapper: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    tabWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    tabContent: {
        flexGrow: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
}));

export const Engineering: React.FC = () => {
    const [gameState, dispatch] = useContext(GameContext);

    const classes = useStyles();
    
    const [draggingCard, setDragging] = useState<EngineeringCardInfo>();
    
    const [tabIndex, setTabIndex] = useState(0);

    const tabs = (
        <EngineeringTabs
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            choices={gameState.localShip.engineering.draftChoices.length}
            progress={gameState.localShip.engineering.cardGeneration}
        />
    );

    const tryPlayCard = (card: EngineeringCardInfo, x: number, y: number) => {
        setDragging(undefined);
        
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
    }

    return (
        <ShipSystem className={classes.root} appBarContent={tabs}>
            <SwipeableViews
                axis="x"
                index={tabIndex}
                onChangeIndex={setTabIndex}
                className={classes.tabsWrapper}
                slideClassName={classes.tabWrapper}
            >
                <div
                    role="tabpanel"
                    hidden={tabIndex !== 0}
                    id="engineering-systems"
                    aria-labelledby="engineering-tab-systems"
                    className={classes.tabContent}
                >
                    <SystemList
                        systemInfo={gameState.localShip.systemInfo}
                        systemOrder={gameState.localShip.engineering.systemOrder}
                        draggingCard={draggingCard}
                    />
                </div>
                
                <div
                    role="tabpanel"
                    hidden={tabIndex !== 1}
                    id="engineering-draft"
                    aria-labelledby="engineering-tab-draft"
                    className={classes.tabContent}
                >
                    <CardChoice
                        cards={gameState.localShip.engineering.draftChoices[0] ?? []}
                        choose={card => dispatch({
                            type: 'eng draft',
                            card: card.id,
                        })}
                        progress={gameState.localShip.engineering.cardGeneration}
                    />
                </div>
            </SwipeableViews>
                
            <CardHand
                cards={gameState.localShip.engineering.hand}
                dragStart={tabIndex === 0 ? setDragging : undefined}
                dragEnd={tabIndex === 0 ? tryPlayCard : undefined}
            />
        </ShipSystem>
    )
}
