import React, { useContext, useState } from 'react';
import { Tabs, Tab, makeStyles, Badge } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { ShipSystem } from '../common/ShipSystem';
import { GameContext } from '../GameProvider';
import { SystemList } from './SystemList';
import { CardHand } from './CardHand';
import { CardChoice } from './CardChoice';
import { EngineeringCardInfo } from '../../data/EngineeringCard';
import { System } from '../../data/System';

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
    draftTab: {
        postion: 'relative',
    },
    draftBadgeRoot: {
        position: 'static',
    },
    draftBadge: {
        right: theme.spacing(2),
        top: theme.spacing(2),
    }
}));

export const Engineering: React.FC = () => {
    const [gameState, dispatch] = useContext(GameContext);

    const classes = useStyles();
    
    const [draggingCard, setDragging] = useState<EngineeringCardInfo>();
    
    const [tabIndex, setTabIndex] = useState(0);

    const tabs = (
        <Tabs
            value={tabIndex}
            onChange={(_e, newVal) => setTabIndex(newVal)}
            variant="fullWidth"
        >
            <Tab
                label="Ship Systems"
                id="engineering-tab-systems"
                aria-controls="engineering-systems"
                value={0}
            />
            <Tab
                className={classes.draftTab}
                label={
                    <Badge
                        badgeContent={gameState.localShip.power.draftChoices.length}
                        color="secondary"
                        classes={{
                            root: classes.draftBadgeRoot,
                            badge: classes.draftBadge,
                        }}
                    >
                        Draft Cards
                    </Badge>
                }   
                id="engineering-tab-draft"
                aria-controls="engineering-draft"
                value={1}
            />
        </Tabs>
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
                    type: 'power play',
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
                        systemOrder={gameState.localShip.power.systemOrder}
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
                        cards={gameState.localShip.power.draftChoices[0] ?? []}
                        choose={card => dispatch({
                            type: 'power draft',
                            card: card.id,
                        })}
                        progress={gameState.localShip.power.cardGeneration}
                    />
                </div>
            </SwipeableViews>
                
            <CardHand
                cards={gameState.localShip.power.hand}
                dragStart={tabIndex === 0 ? setDragging : undefined}
                dragEnd={tabIndex === 0 ? tryPlayCard : undefined}
            />
        </ShipSystem>
    )
}
