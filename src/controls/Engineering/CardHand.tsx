import React, { useState, useEffect } from 'react';
import { PowerCardInfo } from '../../data/PowerCard';
import { makeStyles, Typography, Slide } from '@material-ui/core';
import { ZoomableCard, shrinkScale } from './ZoomableCard';
import { cardWidth, cardHeight } from './PowerCard';
import { exitDuration } from './CardChoice';

interface Props {
    cards: PowerCardInfo[];
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '11em',
        marginTop: '1em',
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
        bottom: cardHeight * shrinkScale * 0.92,
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
    const [addingCards, setAddingCards] = useState<PowerCardInfo[]>([]);
    
    useEffect(
        () => {
            setAddingCards(
                props.cards
                    .filter(card => prevCards.indexOf(card) === -1)
            );
            setPrevCards(props.cards);

            const id = setTimeout(() => setAddingCards([]), transitionDuration.enter + exitDuration);

            return () => clearTimeout(id);
        },
        [props.cards, transitionDuration.enter]
    );

    const content = props.cards.length === 0
        ? <Typography className={classes.empty}>You have no cards.</Typography>
        : (
            <div className={classes.handWrapper}>
                {props.cards.map((card, index) => {
                    const fraction = currentFraction;
                    currentFraction += fractionStep;

                    const animateEntrance = addingCards.indexOf(card) !== -1;

                    const cardDisplay = (
                        <div
                            className={classes.cardWrapper}
                            style={{ left: `calc((100% - ${cardWidth}px) * ${fraction})` }}
                            key={card.id}
                        >
                            <ZoomableCard
                                name={card.name}
                                description={card.description}
                                rarity={card.rarity}
                                mainClassName={classes.card}
                                zoomClassName={classes.zoomCard}
                            />
                        </div>
                    )

                    return animateEntrance ? (
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