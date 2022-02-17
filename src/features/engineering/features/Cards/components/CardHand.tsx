import React, { useState, useEffect } from 'react';
import styled from '@mui/material/styles/styled';
import Slide from '@mui/material/Slide';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { EngineeringCardStub, stubHeight, stubWidth } from './CardStub';
import { EngineeringCard } from './EngineeringCard';
// import { exitDuration } from './CardChoice';

const exitDuration = 0.5;

interface Props {
    cards: EngineeringCardInfo[];
    dragStart?: (card: EngineeringCardInfo) => void;
    dragEnd?: (card: EngineeringCardInfo, x: number, y: number) => void;
}

const Root = styled('div')({
    display: 'flex',
    height: stubHeight,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative',
});

const stubPadding = '0.1em';

const StubsWrapper = styled('div',
    { shouldForwardProp: (prop) => prop !== 'numCards' }
)<{ numCards: number }>(({ numCards }) => ({
    position: 'relative',
    height: stubHeight,
    width: numCards > 0
        ? `min(100%, calc(${numCards - 1} * (${stubWidth} + ${stubPadding} + ${stubPadding})))`
        : undefined,
    marginRight: stubWidth,
    zIndex: 1,
    right: stubPadding,
}));

const IndividualStubWrapper = styled('div')({
    padding: `0 ${stubPadding}`,
    position: 'absolute',
    transition: 'left 0.5s ease-in-out',
    '&:hover > *': {
        color: 'transparent',
    },
});

const EmptyText = styled('div')({
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '1.2em',
});

const FocusedCardDisplay = styled(EngineeringCard)({
    pointerEvents: 'none',
    zIndex: 2,
    fontSize: '1.5em',
    position: 'absolute',
    bottom: `calc(${stubHeight} * 0.333)`,
});

export const CardHand: React.FC<Props> = props => {
    const transitionDuration = {
        enter: 500,
        exit: 0,
    };
    
    const [firstRender, setFirstRender] = useState(true);

    const [focusedCard, setFocusedCard] = useState<EngineeringCardInfo | null>(null);

    useEffect(
        () => {
            setFirstRender(false);
        },
        []
    );

    const [prevCards, setPrevCards] = useState(props.cards);
    const [addingCards, setAddingCards] = useState<EngineeringCardInfo[]>([]);

    useEffect(
        () => {
            setAddingCards(
                props.cards
                    .filter(card => !prevCards.find(c => c.id === card.id))
            );
            setPrevCards(props.cards);

            const id = setTimeout(() => setAddingCards([]), transitionDuration.enter + exitDuration);

            return () => clearTimeout(id);
        },
        [props.cards, transitionDuration.enter] // eslint-disable-line react-hooks/exhaustive-deps
    );

    if (props.cards.length === 0) {
        return (
            <Root>
                <EmptyText>You have no cards.</EmptyText>
            </Root>
        );
    }

    const { dragStart, dragEnd } = props;

    const screenFractionStep =  1 / (props.cards.length - 1);
    let screenFraction = 0;

    const focusedCardDisplay = focusedCard === null
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
            <StubsWrapper numCards={props.cards.length}>
                {props.cards.map((card, cardIndex) => {
                    const left = `calc(100% * ${screenFraction})`;
                    screenFraction += screenFractionStep;

                    const animateEntrance = !!addingCards.find(c => c.id === card.id);

                    const cardDisplay = (
                        <IndividualStubWrapper
                            key={card.id}
                            style={{ left, zIndex: props.cards.length - cardIndex }}
                            onMouseEnter={() => setFocusedCard(card)}
                            onMouseLeave={() => setFocusedCard(null)}
                            
                            /*dragStart={dragStart ? () => dragStart(card) : undefined}
                            dragEnd={dragEnd ? (x, y) => dragEnd(card, x, y) : undefined}*/
                        >
                            <EngineeringCardStub
                                type={card.type}
                                rarity={card.rarity}
                            />
                        </IndividualStubWrapper>
                    );

                    return animateEntrance
                        ? (
                            <Slide
                                in={true}
                                timeout={transitionDuration}
                                appear={!firstRender}
                                enter={true}
                                exit={false}
                                direction="left"
                                key={card.id}
                                style={{
                                    transitionDelay: `${exitDuration}ms`,
                                }}
                            >
                                {cardDisplay}
                            </Slide>
                        )
                        : cardDisplay;
                })}
            </StubsWrapper>
            
            {focusedCardDisplay}
        </Root>
    );
};