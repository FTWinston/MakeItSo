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
import { SystemTiles, TileDisplayInfo } from '../features/SystemTiles';

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

export const Engineering: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');
    const theme = useTheme();
    
    const [draggingCard, setDragging] = useState<EngineeringCardInfo>();
    
    const [showChoice, setShowChoice] = useState(false);

    const systems = !showChoice
        ? (
            <SystemTiles
                systems={props.systems}
            />
        )
        : undefined;

    const choice = showChoice
        ? (
            <CardChoice
                cards={props.choiceCards ?? []}
                choose={props.chooseCard}
                progress={props.choiceProgress}
            />
        )
        : undefined;

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
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
                        >
                            {t('chooseCards')}
                        </AppBarButton>
                    </AppBarBadge>
                </Zoom>    
            </SystemAppBar>

            {systems}

            {choice}
        
            <CardHand
                cards={props.handCards}
                //dragStart={tabIndex === 0 ? setDragging : undefined}
                //dragEnd={tabIndex === 0 ? tryPlayCard : undefined}
            />
        </Root>
    );
};