import React from 'react';
import { makeStyles, Card, CardContent, Typography, CardHeader, Avatar } from '@material-ui/core';
import { blue, purple, grey } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { EngineeringCardInfo, EngineeringCardRarity, getRarityName } from '../data/EngineeringCard';
import { CardIcon } from './CardIcon';

interface Props extends Omit<EngineeringCardInfo, 'id'> {
    className?: string;
}

export const cardWidth = 224;
export const cardHeight = 160;

const useStyles = makeStyles(theme => ({
    root: {
        width: cardWidth,
        height: cardHeight,
        transition: 'border-color 0.2s linear',
        backgroundColor: theme.palette.background.paper,
    },
    content: {
        paddingTop: 0,
    },
    commonIcon: {
        backgroundColor: grey[600],
    },
    uncommonIcon: {
        backgroundColor: grey[500],
    },
    rareIcon: {
        backgroundColor: blue[600],
    },
    epicIcon: {
        backgroundColor: purple[300],
    },
    commonRoot: {
        borderColor: fade(grey[600], 0.5),
        '&:hover': {
            borderColor: grey[600],
        }
    },
    uncommonRoot: {
        borderColor: fade(grey[400], 0.5),
        '&:hover': {
            borderColor: grey[400],
        }
    },
    rareRoot: {
        borderColor: fade(blue[600], 0.5),
        '&:hover': {
            borderColor: blue[600],
        }
    },
    epicRoot: {
        borderColor: fade(purple[300], 0.5),
        '&:hover': {
            borderColor: purple[300],
        }
    }
}));

export const EngineeringCard: React.FC<Props> = props => {
    const classes = useStyles();

    let iconClass;
    let rootClass;
    switch (props.rarity) {
        case EngineeringCardRarity.Common:
            iconClass = classes.commonIcon;
            rootClass = `${classes.root} ${classes.commonRoot}`;
            break;
        case EngineeringCardRarity.Uncommon:
            iconClass = classes.uncommonIcon;
            rootClass = `${classes.root} ${classes.uncommonRoot}`;
            break;
        case EngineeringCardRarity.Rare:
            iconClass = classes.rareIcon;
            rootClass = `${classes.root} ${classes.rareRoot}`;
            break;
        case EngineeringCardRarity.Epic:
            iconClass = classes.epicIcon;
            rootClass = `${classes.root} ${classes.epicRoot}`;
            break;
    }

    if (props.className) {
        rootClass = `${rootClass} ${props.className}`;
    }

    return (
        <Card className={rootClass} variant="outlined">
            <CardHeader
                avatar={
                <Avatar
                    aria-label={getRarityName(props.rarity)}
                    className={iconClass}
                >
                    <CardIcon color="action" card={props.type} />
                </Avatar>
                }
                title={props.name}
            />
            <CardContent className={classes.content}>
                <Typography>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    )
}
