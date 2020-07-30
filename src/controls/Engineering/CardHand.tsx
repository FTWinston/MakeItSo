import React from 'react';
import { PowerCardInfo } from '../../data/PowerCard';
import { Paper, makeStyles } from '@material-ui/core';
import { PowerCard } from './PowerCard';

interface Props {
    cards: PowerCardInfo[];
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '10em',
    },
    cardWrapper: {
        overflow: 'hidden',
        '&:hover': {
            overflow: 'visible',
            zIndex: '3',
        }
    },
}));

export const CardHand: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            {props.cards.map((card, index) => (
                <div className={classes.cardWrapper}>
                    <PowerCard {...card} key={index} />
                </div>
            ))}
        </Paper>
    )
}