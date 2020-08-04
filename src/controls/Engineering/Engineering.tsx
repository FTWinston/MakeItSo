import React, { useContext, useState } from 'react';
import { Tabs, Tab, makeStyles, Badge } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { ShipSystem } from '../common/ShipSystem';
import { GameContext } from '../GameProvider';
import { SystemList } from './SystemList';
import { CardHand } from './CardHand';
import { CardChoice } from './CardChoice';

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
    const gameState = useContext(GameContext);

    const classes = useStyles();
    
    const [tabIndex, setTabIndex] = useState(0);

    const tabs = (
        <Tabs
            value={tabIndex}
            onChange={(e, newVal) => setTabIndex(newVal)}
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
                        badgeContent={gameState.power.draftChoices.length}
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
                        powerLevels={gameState.powerLevels}
                        systemOrder={gameState.power.systemOrder}
                        positiveEffects={gameState.power.positiveEffects}
                        negativeEffects={gameState.power.negativeEffects}
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
                        cards={gameState.power.draftChoices[0] ?? []}
                        choose={card => gameState.update({
                            type: 'power draft',
                            card: card.id,
                        })}
                    />
                </div>
            </SwipeableViews>
                
            <CardHand
                cards={gameState.power.hand}
            />
        </ShipSystem>
    )
}