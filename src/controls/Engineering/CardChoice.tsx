import React, { useState, useEffect } from 'react';
import { PowerCardInfo } from '../../data/PowerCard';
import { makeStyles, Typography, Zoom, useTheme, Slide } from '@material-ui/core';
import { PowerCard } from './PowerCard';

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
    },
    prompt: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          transform: 'rotate(-90deg)',
          transformOrigin: 'left top 0',
          color: theme.palette.text.hint,
          fontSize: '2em',
    },
    emptyPrompt: {
        textAlign: 'center',
    },
    cardWrapper: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        transform: 'scale(0.8)',
    },
}));

export const CardChoice: React.FC<Props> = props => {
    const classes = useStyles();

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: 1000,
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
        : <Typography className={classes.prompt}>Choose one:</Typography>
    
    return (
        <div className={classes.root}>
            {prompt}
            {cards.map(card => (
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
                            className={classes.cardWrapper}
                            onClick={() => { if (selected === undefined) { setSelected(card); props.choose(card); } }}
                        >
                            <PowerCard
                                name={card.name}
                                description={card.description}
                                rarity={card.rarity}
                            />
                        </div>
                    </Slide>
                </Zoom>
            ))}
        </div>
    )
}