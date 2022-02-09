import React, { useState, useEffect } from 'react';
import styled from '@mui/material/styles/styled';
import Slide from '@mui/material/Slide';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { ZoomableCard, zoomScale } from './ZoomableCard';
import { cardHeight, cardWidth } from './EngineeringCard';
// import { exitDuration } from './CardChoice';

const exitDuration = 0.5;

interface Props {
    cards: EngineeringCardInfo[];
    dragStart?: (card: EngineeringCardInfo) => void;
    dragEnd?: (card: EngineeringCardInfo, x: number, y: number) => void;
}

const Root = styled('div')({
    display: 'flex',
    height: cardHeight,
    alignItems: 'stretch',
    justifyContent: 'stretch',
    position: 'relative',
    marginLeft: `calc(${cardWidth} * ${(zoomScale - 1) * 0.5})`,
    marginRight: `calc(${cardWidth} * ${(zoomScale - 1) * 0.5})`,
});

const EmptyText = styled('div')({
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '1.2em',
});

const Card = styled(ZoomableCard)({
    position: 'absolute',
    transition: 'left 0.5s ease-in-out',
    alignItems: 'flex-end',
});

export const CardHand: React.FC<Props> = props => {
    const fractionStep = props.cards.length < 2 ? 0 : 1 / (props.cards.length - 1);
    let currentFraction = 0;

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

    return (
        <Root>
            {props.cards.map(card => {
                const fraction = currentFraction;
                currentFraction += fractionStep;

                const animateEntrance = !!addingCards.find(c => c.id === card.id);

                const cardDisplay = (
                    <Card
                        style={{ left: `calc((100% - ${cardWidth}) * ${fraction})` }}
                        key={card.id}
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
        </Root>
    );
};