import React, { useContext, useState } from 'react';
import { ShipSystem } from '../common/ShipSystem';
import { GameContext } from '../GameProvider';
import { SystemList } from './SystemList';
import { CardHand } from './CardHand';
import { Tabs, Tab, Box, makeStyles, Badge } from '@material-ui/core';
import { CardChoice } from './CardChoice';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
    },
    tabContent: {
        flexGrow: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
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

export const Engineering: React.FC = props => {
    const gameState = useContext(GameContext);

    const classes = useStyles();
    
    const [showingDraft, showDraft] = useState(0);

    const tabs = (
        <Tabs
            value={showingDraft}
            onChange={(e, newVal) => showDraft(newVal)}
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
            <div
                role="tabpanel"
                hidden={!showingDraft}
                style={!!showingDraft ? undefined : { display: 'none' }}
                id="engineering-draft"
                aria-labelledby="engineering-tab-draft"
                className={classes.tabContent}
            >
                {!!showingDraft && (
                    <CardChoice
                        cards={gameState.power.draftChoices[0] ?? []}
                        choose={card => gameState.update({
                            type: 'power draft',
                            card: card.id,
                        })}
                    />
                )}
            </div>

            <div
                role="tabpanel"
                hidden={!!showingDraft}
                style={!showingDraft ? undefined : { display: 'none' }}
                id="engineering-systems"
                aria-labelledby="engineering-tab-systems"
                className={classes.tabContent}
            >
                {!showingDraft && (
                    <SystemList
                        powerLevels={gameState.powerLevels}
                        systemOrder={gameState.power.systemOrder}
                        positiveEffects={gameState.power.positiveEffects}
                        negativeEffects={gameState.power.negativeEffects}
                    />
                )}
            </div>
            
            <CardHand
                cards={gameState.power.hand}
            />
        </ShipSystem>
    )
}