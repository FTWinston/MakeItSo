import React, { useState, useEffect } from 'react';
import styled from '@mui/material/styles/styled';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { ZoomableCard } from './ZoomableCard';
import { cardHeight, cardWidth, shrinkScale } from './EngineeringCard';
// import { exitDuration } from './CardChoice';

const exitDuration = 0.5;

interface Props {
    cards: EngineeringCardInfo[];
    dragStart?: (card: EngineeringCardInfo) => void;
    dragEnd?: (card: EngineeringCardInfo, x: number, y: number) => void;
}

const Root = styled('div')({
    display: 'flex',
    height: '11em',
    alignItems: 'stretch',
    justifyContent: 'stretch',
});

const HandWrapper = styled('div')({
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
});

const CardWrapper = styled('div')({
    position: 'absolute',
    top: '1em',
    pointerEvents: 'none',
    transition: 'left 0.5s ease-in-out',
});

const EmptyText = styled(Typography)({
    flexGrow: 1,
    textAlign: 'center',
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
            <HandWrapper>
                {props.cards.map((card, index) => {
                    const fraction = currentFraction;
                    currentFraction += fractionStep;

                    const animateEntrance = !!addingCards.find(c => c.id === card.id);

                    const cardDisplay = (
                        <CardWrapper
                            style={{ left: `calc((100% - ${cardWidth}px) * ${fraction})` }}
                            key={card.id}
                        >
                            <ZoomableCard
                                type={card.type}
                                rarity={card.rarity}
                                dragStart={dragStart ? () => dragStart(card) : undefined}
                                dragEnd={dragEnd ? (x, y) => dragEnd(card, x, y) : undefined}
                                style={{ transformOrigin: 'bottom' }}
                                zoomStyle={{bottom: cardHeight * shrinkScale * 0.6}}
                            />
                        </CardWrapper>
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
            </HandWrapper>
        </Root>
    );
};