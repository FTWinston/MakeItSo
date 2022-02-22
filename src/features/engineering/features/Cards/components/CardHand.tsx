import React, { useState, useEffect, useRef } from 'react';
import styled from '@mui/material/styles/styled';
import Slide from '@mui/material/Slide';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { stubHeight, stubWidth } from './CardStub';
import { exitDuration } from './CardChoice';
import { DraggableCardStub, stubPadding } from './DraggableCardStub';

interface Props {
    cards: EngineeringCardInfo[];
    selectedCard: EngineeringCardInfo | null;
    setFocus: (card: EngineeringCardInfo | null) => void;
    selectFocusedCard: () => void;
    clearSelection: () => void;
    dragStart?: (card: EngineeringCardInfo) => void;
    dragEnd?: (card: EngineeringCardInfo, x: number, y: number) => void;
}

const Root = styled('div')({
    display: 'flex',
    height: stubHeight,
    justifyContent: 'center',
    alignItems: 'flex-end',
});

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
    transition: `width ${exitDuration}ms linear`,
}));

const EmptyText = styled('div')({
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '1.2em',
});

export const CardHand: React.FC<Props> = props => {
    const transitionDuration = {
        enter: 500,
        exit: 0,
    };
    
    const [firstRender, setFirstRender] = useState(true);

    useEffect(
        () => {
            setFirstRender(false);
        },
        []
    );

    const [prevCards, setPrevCards] = useState(props.cards);
    const [addingCards, setAddingCards] = useState<EngineeringCardInfo[]>([]);
    
    const isMouseDown = useRef(false);

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

    return (
        <Root
            onMouseOut={() => { if (isMouseDown.current && !props.selectedCard) { props.selectFocusedCard(); }}}
            //onMouseEnter={props.clearSelection}
            onMouseDown={() => isMouseDown.current = true}
            onMouseUp={() => isMouseDown.current = false}
        >
            <StubsWrapper numCards={props.cards.length}>
                {props.cards.map((card, cardIndex) => {
                    const left = `calc(100% * ${screenFraction})`;
                    screenFraction += screenFractionStep;

                    const animateEntrance = !!addingCards.find(c => c.id === card.id);

                    const onClick = () => {
                        if (props.selectedCard) {
                            props.clearSelection();
                        }
                        else {
                            props.setFocus(card); props.selectFocusedCard();
                        }
                    };

                    const cardDisplay = (
                        <DraggableCardStub
                            key={card.id}
                            style={{
                                left,
                                zIndex: props.selectedCard === card ? 999 : props.cards.length - cardIndex,
                                opacity: props.selectedCard === null || props.selectedCard === card ? undefined : 0.33,
                            }}
                            onMouseEnter={() => { if (!isMouseDown.current && !props.selectedCard) { props.setFocus(card); }}}
                            onMouseLeave={() => { if (!isMouseDown.current && !props.selectedCard) { props.setFocus(null); }}}
                            onClick={onClick}
                            type={card.type}
                            rarity={card.rarity}
                            dragStart={dragStart ? () => dragStart(card) : undefined}
                            dragEnd={dragEnd ? (x, y) => dragEnd(card, x, y) : undefined}
                        />
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
        </Root>
    );
};