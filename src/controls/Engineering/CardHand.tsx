import React from 'react';
import { PowerCardInfo } from '../../data/PowerCard';
import { makeStyles, Typography } from '@material-ui/core';
import { PowerCard } from './PowerCard';

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
        overflow: 'hidden',
    },
    handWrapper: {
        display: 'flex',
        flexGrow: 1,
        margin: '0 2em',
        overflow: 'visible',
        position: 'relative',
    },
    cardWrapper: {
        position: 'absolute',
        top: '1em',
        '&:hover': {
            zIndex: 1,
        }
    },
}));

export const CardHand: React.FC<Props> = props => {
    const classes = useStyles();

    const empty = props.cards.length === 0
        ? <Typography>You have no cards.</Typography>
        : undefined;

    const angleStep = 4;
    let currentAngle = props.cards.length < 2 ? 0 : -((props.cards.length - 1) / 2) * angleStep;
    let fractionStep = props.cards.length < 2 ? 0 : 1 / (props.cards.length - 1);
    let currentFraction = 0;

    // Hearthstone's approach is to keep the cards overlapping,
    // when a card is hovered, show a big, non-rotated copy of the card.

    return (
        <div className={classes.root}>
            <div className={classes.handWrapper}>
                {props.cards.map((card, index) => {
                    const angle = currentAngle;
                    currentAngle += angleStep;

                    const fraction = currentFraction;
                    currentFraction += fractionStep;
                    return (
                        <div
                            className={classes.cardWrapper}
                            style={{
                                left: `calc((100% - 14em) * ${fraction})`,
                                transform: `rotate(${angle}deg)`,
                            }}
                            key={index}
                        >
                            <PowerCard {...card} key={index} />
                        </div>
                    )
                })}
            </div>
            {empty}
        </div>
    )
}