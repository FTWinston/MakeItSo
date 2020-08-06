import React, { useState, useEffect } from 'react';
import { PowerCardInfo } from '../../data/PowerCard';
import { makeStyles, Typography, Zoom, useTheme, Slide } from '@material-ui/core';
import { cardHeight } from './PowerCard';
import { ZoomableCard, shrinkScale } from './ZoomableCard';

interface Props {
    cards: PowerCardInfo[];
    choose: (card: PowerCardInfo) => void;
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexGrow: 1,
        position: 'relative',
        marginTop: 2,
    },
    prompt: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        transform: 'rotate(-90deg)',
        transformOrigin: 'left top 0',
        color: theme.palette.text.hint,
        fontSize: '2em',
        transition: 'opacity 0.5s linear',
    },
    fadePrompt: {
        opacity: 0,
    },
    emptyPrompt: {
        textAlign: 'center',
    },
    cardWrapper: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        '& + $cardWrapper': {
            marginTop: -(1 - shrinkScale) * cardHeight * 0.75,
        },
    },
    selectedCardWrapper: {
        zIndex: 1,
    }
}));

export const exitDuration = 1000;

export const CardChoice: React.FC<Props> = props => {
    const classes = useStyles();

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: exitDuration,
    };

    const [cards, setCards] = useState(props.cards);

    const [selected, setSelected] = useState<PowerCardInfo>();

    useEffect(
        () => {
            const newCards = props.cards;
            const callback = () => {
                setSelected(undefined);
                setCards(newCards);
            }

            const id = setTimeout(callback, transitionDuration.exit);

            return () => {
                clearTimeout(id);
            }
        },
        [props.cards, transitionDuration.exit]
    );
    
    const [firstRender, setFirstRender] = useState(true);

    useEffect(
        () => {
            setFirstRender(false);
        },
        []
    );

    const prompt = cards.length === 0
        ? <Typography className={classes.emptyPrompt}>No card choice available.<br/>Please wait...</Typography>
        : (
            <Typography 
                className={props.cards.length === 0 ? `${classes.prompt} ${classes.fadePrompt}` : classes.prompt}
            >
                Choose one:
            </Typography>
        );
    
    return (
        <div className={classes.root}>
            {prompt}
            {cards.map(card => {
                const wrapperClasses = card === selected
                    ? `${classes.cardWrapper} ${classes.selectedCardWrapper}`
                    : classes.cardWrapper;

                return (
                    <Zoom
                        in={props.cards.indexOf(card) !== -1 || card === selected}
                        timeout={transitionDuration}
                        unmountOnExit
                        key={card.id}
                        appear={!firstRender}
                    >
                        <Slide
                            in={props.cards.indexOf(card) !== -1 || card !== selected}
                            timeout={transitionDuration}
                            appear={false}
                            direction="left"
                            unmountOnExit
                            key={card.id}
                        >
                            <div
                                className={wrapperClasses}
                                onClick={() => { if (selected === undefined) { setSelected(card); props.choose(card); } }}
                            >
                                <ZoomableCard
                                    type={card.type}
                                    name={card.name}
                                    description={card.description}
                                    rarity={card.rarity}
                                    forceZoom={selected ? card === selected : undefined}
                                />
                            </div>
                        </Slide>
                    </Zoom>
                );
            })}
        </div>
    )
}