import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { durationToTicks } from 'src/utils/timeSpans';
import { useIsFirstRender } from 'src/hooks/useIsFirstRender';
import { LinearTimer, Typography, styled, useTheme, SlideTransition, ZoomTransition } from 'src/lib/mui';
import { TimeSpan } from 'src/types/TimeSpan';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { EngineeringCardStub } from './CardStub';

interface Props {
    cards: EngineeringCardInfo[];
    numChoices: number;
    handFull: boolean;
    focus: (card: EngineeringCardInfo | null) => void;
    progress?: TimeSpan;
    choose: (id: number) => void;
}

const Root = styled('div')({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

const Prompt = styled(
    Typography
    , { shouldForwardProp: (prop) => prop !== 'hide' }
)<{ hide: boolean }>(({ theme, hide }) => ({
    color: theme.palette.text.secondary,
    margin: '0 0.25em',
    fontSize: '1.5em',
    transition: 'opacity 0.5s linear',
    opacity: hide ? 0 : undefined,
}));

const Cards = styled('div')({    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
});

const EmptyPrompt = styled('div')({
    textAlign: 'center',
    flexGrow: 1,
});

const CardWrapper = styled('div')<{ selected: boolean }>(({ selected }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 1em',
    cursor: 'pointer',
    zIndex: selected ? 1 : undefined,
    '&:focus > *': {
        borderColor: 'white',
    },
}));

const CardGeneration = styled(LinearTimer)(({ theme }) => ({
    marginTop: '0.5em',
    marginBottom: '0.5em',
}));

const ChoiceMessage = styled(Typography)({
    textAlign: 'center',
});

export const exitDuration = 1000;

export const CardChoice: React.FC<Props> = props => {
    const { t } = useTranslation('engineering');
    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: exitDuration,
    };

    const [cards, setCards] = useState(props.cards);

    const [selected, setSelected] = useState<EngineeringCardInfo>();

    useEffect(
        () => {
            const newCards = props.cards;
            const callback = () => {
                setSelected(undefined);
                setCards(newCards);
            };

            const id = setTimeout(callback, transitionDuration.exit);

            return () => {
                clearTimeout(id);
            };
        },
        [props.cards, transitionDuration.exit]
    );

    const firstRender = useIsFirstRender();
    
    const alertMessage = cards.length === 0 || props.numChoices <= 0
        ? t('no choice cards')
        : t('available choices', { count: props.numChoices - 1 });

    const prompt = cards.length === 0
        ? (
            <EmptyPrompt />
        )
        : (
            <Prompt hide={props.cards.length === 0}>
                {t(props.handFull ? 'hand full' : 'choose prompt')}
            </Prompt>
        );
        
    const cardDisplay = cards.length === 0
        ? undefined
        : (
            <Cards>
                {cards.map(card => {
                    return (
                        <ZoomTransition
                            in={props.cards.indexOf(card) !== -1 || card === selected}
                            timeout={transitionDuration}
                            unmountOnExit
                            key={card.id}
                            appear={!firstRender}
                        >
                            <SlideTransition
                                in={props.cards.indexOf(card) !== -1 || card !== selected}
                                timeout={transitionDuration}
                                appear={false}
                                direction="left"
                                unmountOnExit
                            >
                                <CardWrapper
                                    selected={card === selected}
                                    onClick={() => { if (selected === undefined && !props.handFull) { setSelected(card); props.choose(card.id); } }}
                                    onMouseEnter={() => props.focus(card)}
                                    onMouseLeave={() => props.focus(null)}
                                    tabIndex={0}
                                >
                                    <EngineeringCardStub
                                        type={card.type}
                                        rarity={card.rarity}
                                    />
                                </CardWrapper>
                            </SlideTransition>
                        </ZoomTransition>
                    );
                })}
            </Cards>
        );

    const progress = props.progress ?? {
        startTime: Date.now() + durationToTicks(100),
        endTime: Date.now() + durationToTicks(110),
    }

    return (
        <Root>
            {prompt}
            {cardDisplay}
            <ChoiceMessage>{alertMessage}</ChoiceMessage>
            <CardGeneration {...progress} aria-label={t('generation progress')} color="secondary" />
        </Root>
    );
};