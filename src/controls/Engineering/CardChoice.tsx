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
    cardWrapper: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zoom: 0.8,
    },
}));

export const CardChoice: React.FC<Props> = props => {
    const classes = useStyles();

    const prompt = props.cards.length === 0
        ? <Typography>No card choice available.<br/>Please wait...</Typography>
        : <Typography className={classes.prompt}>Choose one:</Typography>

    return (
        <div className={classes.root}>
            {prompt}
            {props.cards.map((card, index) => (
                <div
                    className={classes.cardWrapper}
                    key={index}
                >
                    <PowerCard {...card} key={index} />
                </div>
            ))}
        </div>
    )
}