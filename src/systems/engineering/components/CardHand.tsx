import React, { useState, useEffect } from 'react';
import { EngineeringCardInfo } from '../data/EngineeringCard';
import { makeStyles, Typography, Slide } from '@material-ui/core';
import { ZoomableCard, shrinkScale } from './ZoomableCard';
import { cardWidth, cardHeight } from './EngineeringCard';
import { exitDuration } from './CardChoice';

interface Props {
    cards: EngineeringCardInfo[];
    dragStart?: (card: EngineeringCardInfo) => void;
    dragEnd?: (card: EngineeringCardInfo, x: number, y: number) => void;
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '11em',
        alignItems: 'stretch',
        justifyContent: 'stretch',
    },
    handWrapper: {
        display: 'flex',
        flexGrow: 1,
        position: 'relative',
    },
    cardWrapper: {
        position: 'absolute',
        top: '1em',
        pointerEvents: 'none',
        transition: 'left 0.5s ease-in-out',
    },
    empty: {
        flexGrow: 1,
        textAlign: 'center',
    },
    card: {
        transformOrigin: 'bottom',
    },
    zoomCard: {
        bottom: cardHeight * shrinkScale * 0.6,
    }
}));

export const CardHand: React.FC<Props> = props => {
    const classes = useStyles();

    let fractionStep = props.cards.length < 2 ? 0 : 1 / (props.cards.length - 1);
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

    const { dragStart, dragEnd } = props;

    const content = props.cards.length === 0
        ? <Typography className={classes.empty}>You have no cards.</Typography>
        : (
            <div className={classes.handWrapper}>
                {props.cards.map((card, index) => {
                    const fraction = currentFraction;
                    currentFraction += fractionStep;

                    const animateEntrance = !!addingCards.find(c => c.id === card.id);

                    const cardDisplay = (
                        <div
                            className={classes.cardWrapper}
                            style={{ left: `calc((100% - ${cardWidth}px) * ${fraction})` }}
                            key={card.id}
                        >
                            <ZoomableCard
                                type={card.type}
                                name={card.name}
                                description={card.description}
                                rarity={card.rarity}
                                mainClassName={classes.card}
                                zoomClassName={classes.zoomCard}
                                dragStart={dragStart ? () => dragStart(card) : undefined}
                                dragEnd={dragEnd ? (x, y) => dragEnd(card, x, y) : undefined}
                            />
                        </div>
                    )

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
            </div>
        )

    return (
        <div className={classes.root}>
            {content}
        </div>
    )
}