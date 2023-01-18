import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Switch, Typography, styled } from 'src/lib/mui';
import { AppBarHeight, Page } from 'src/features/layout';
import { allSystems, ShipDestroyingSystem, ShipSystem } from 'src/types/ShipSystem';
import { TimeSpan } from 'src/types/TimeSpan';
import { CardHand, stubHeight, EngineeringCardInfo, CardChoice } from '../features/Cards';
import { CardDisplay } from '../features/Cards';
import { SystemTiles, ClientSystemInfo } from '../features/SystemTiles';
import { EngineeringAppBar } from './EngineeringAppBar';
import { maxSystemHealth } from 'src/types/SystemState';

interface Props {
    systems: ClientSystemInfo[];
    handCards: EngineeringCardInfo[];
    maxHandSize: number;
    choiceCards: EngineeringCardInfo[];
    numChoices: number;
    choiceProgress?: TimeSpan;
    shipDestroyed?: ShipDestroyingSystem;
    chooseCard: (id: number) => void;
    playCard: (card: EngineeringCardInfo, system: ShipSystem, repair: boolean) => void;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr ${stubHeight}`,
});

const SystemsAndCardMode = styled(Box)({
    display: 'grid',
    gridTemplateRows: `1fr 2em`,
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
    const { t } = useTranslation('engineering');
    const [focusedCard, setFocusedCard] = useState<EngineeringCardInfo | null>(null);
    const [cardSelected, setCardSelected] = useState(false);
    const [repairMode, setRepairMode] = useState(false);
    
    const [currentTab, setCurrentTab] = useState<'systems' | 'draw'>('systems');

    const validTargetSystems = !cardSelected || focusedCard === null
        ? null
        : determineValidTargets(focusedCard, repairMode, props.systems);

    const tryPlayCard = (system: ShipSystem) => {
        if (focusedCard === null) {
            return;
        }

        props.playCard(focusedCard, system, repairMode);
        setFocusedCard(null);
    };
    
    const systemsOrChoice = currentTab === 'draw'
        ? (
            <CardChoice
                cards={props.choiceCards}
                numChoices={props.numChoices}
                handFull={props.handCards.length >= props.maxHandSize}
                focus={setFocusedCard}
                choose={props.chooseCard}
                progress={props.choiceProgress}
            />
        )
        : (
            <SystemsAndCardMode>
                <SystemTiles
                    systems={props.systems}
                    allowedTargets={validTargetSystems}
                    possibleRepair={cardSelected && focusedCard && repairMode ? focusedCard.rarity : null}
                    tileSelected={tryPlayCard}
                />
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifySelf="center"
                    component="label"
                >
                    <Typography
                        variant="button"
                        color={repairMode ? 'grey' : undefined}
                        role="none"
                    >
                        {t('effect mode')}
                    </Typography>
                    <Switch
                        color="error"
                        checked={repairMode}
                        onChange={e => setRepairMode(e.target.checked)}
                    />
                    <Typography
                        variant="button"
                        color={repairMode ? undefined : 'grey'}
                    >
                        {t('repair mode')}
                    </Typography>
                </Stack>
            </SystemsAndCardMode>
        );

    const focusedCardDisplay = focusedCard === null || cardSelected
        ? null
        : (
            <FocusedCardDisplay
                {...focusedCard}
                repairMode={repairMode && currentTab === 'systems'}
                role="presentation"
            />
        );

    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <EngineeringAppBar
                currentTab={currentTab}
                setCurrentTab={tab => { setCurrentTab(tab); setFocusedCard(null); }}
                numChoices={props.numChoices}
                anyOffline={props.systems.some(system => system.health === 0)}
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

function determineValidTargets(card: EngineeringCardInfo, repairMode: boolean, systems: ClientSystemInfo[]): ShipSystem {
    if (repairMode) {
        // In repair mode, any card can target any system with less than full health.
        return systems.reduce(
            (prev, system) => system.health < maxSystemHealth
                ? prev | system.system
                : prev
            , 0 as ShipSystem
        );
    }
    
    return card.allowedSystems === undefined
        ? allSystems
        : card.allowedSystems;
}
