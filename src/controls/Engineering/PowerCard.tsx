import React, { CSSProperties } from 'react';
import { PowerCardInfo, CardRarity, getRarityName } from '../../data/PowerCard';
import { makeStyles, Card, CardContent, Typography, CardHeader, Avatar } from '@material-ui/core';
import { blue, purple, grey } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';
import UnknownIcon from '@material-ui/icons/HelpOutline';

interface Props extends Omit<PowerCardInfo, 'id'> {
    className?: string;
    style?: CSSProperties;
}

export const cardWidth = 224;
export const cardHeight = 160;

const useStyles = makeStyles(theme => ({
    root: {
        width: cardWidth,
        height: cardHeight,
        transition: 'border-color 0.2s linear',
        backgroundColor: theme.palette.background.paper,
        borderWidth: 2,
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

function getIcon(name: string) {
    switch (name) {
        default:
            return UnknownIcon;
    }
}

export const PowerCard: React.FC<Props> = props => {
    const classes = useStyles();

    const CardIcon = getIcon(props.name);

    let iconClass;
    let rootClass;
    switch (props.rarity) {
        case CardRarity.Common:
            iconClass = classes.commonIcon;
            rootClass = `${classes.root} ${classes.commonRoot}`;
            break;
        case CardRarity.Uncommon:
            iconClass = classes.uncommonIcon;
            rootClass = `${classes.root} ${classes.uncommonRoot}`;
            break;
        case CardRarity.Rare:
            iconClass = classes.rareIcon;
            rootClass = `${classes.root} ${classes.rareRoot}`;
            break;
        case CardRarity.Epic:
            iconClass = classes.epicIcon;
            rootClass = `${classes.root} ${classes.epicRoot}`;
            break;
    }

    if (props.className) {
        rootClass = `${rootClass} ${props.className}`;
    }

    return (
        <Card className={rootClass} style={props.style} variant="outlined">
            <CardHeader
                avatar={
                <Avatar
                    aria-label={getRarityName(props.rarity)}
                    className={iconClass}
                >
                    <CardIcon color="action" />
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
