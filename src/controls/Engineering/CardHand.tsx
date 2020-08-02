import React from 'react';
import { PowerCardInfo } from '../../data/PowerCard';
import { makeStyles, Typography } from '@material-ui/core';
import { ZoomableCard } from './ZoomableCard';
import { cardWidth } from './PowerCard';

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
        overflow: 'visible',
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
    }
}));

export const CardHand: React.FC<Props> = props => {
    const classes = useStyles();

    const angleStep = 4;
    let currentAngle = props.cards.length < 2 ? 0 : -((props.cards.length - 1) / 2) * angleStep;
    let fractionStep = props.cards.length < 2 ? 0 : 1 / (props.cards.length - 1);
    let currentFraction = 0;

    const content = props.cards.length === 0
        ? <Typography className={classes.empty}>You have no cards.</Typography>
        : (
            <div className={classes.handWrapper}>
                {props.cards.map((card, index) => {
                    const angle = currentAngle;
                    currentAngle += angleStep;

                    const fraction = currentFraction;
                    currentFraction += fractionStep;
                    return (
                        <div
                            className={classes.cardWrapper}
                            key={card.id}
                            style={{
                                left: `calc((100% - ${cardWidth}px) * ${fraction})`,
                            }}
                        >
                            <ZoomableCard
                                key={card.id}
                                name={card.name}
                                description={card.description}
                                rarity={card.rarity}
                            />
                        </div>
                    )
                })}
            </div>
        )

    return (
        <div className={classes.root}>
            {content}
        </div>
    )
}