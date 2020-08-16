import React from 'react';
import { Tabs, Tab, makeStyles, Badge } from '@material-ui/core';
import { Progression } from '../../data/Progression';
import { CircularProgressionWrapper } from './CircularProgressionWrapper';

const useStyles = makeStyles(theme => ({
    draftTab: {
        postion: 'relative',
    },
    draftBadge: {
        color: theme.palette.secondary.contrastText,
    },
    draftProgressWrapper: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(1),
        zIndex: 1,
    },
    draftProgress: {
        color: theme.palette.secondary.contrastText,
    }
}));

interface Props {
    tabIndex: number;
    setTabIndex: (tab: number) => void;
    choices: number;
    progress?: Progression;
}

export const EngineeringTabs: React.FC<Props> = props => {
    const classes = useStyles();

    const countBadge = (
        <span className={`MuiBadge-badge ${classes.draftBadge} MuiBadge-colorSecondary`}>
            {props.choices}
        </span>
    );

    const cardCountProgress = props.progress
        ? (
            <CircularProgressionWrapper
                {...props.progress}
                size={24}
                className={classes.draftProgressWrapper}
                progressClassName={classes.draftProgress}
            >
                {countBadge}
            </CircularProgressionWrapper>
        )
        : countBadge;

    return (
        <Tabs
            value={props.tabIndex}
            onChange={(_e, newVal) => props.setTabIndex(newVal)}
            variant="fullWidth"
        >
            <Tab
                label="Ship Systems"
                id="engineering-tab-systems"
                aria-controls="engineering-systems"
                value={0}
            />
            <Tab
                className={classes.draftTab}
                label={
                    <React.Fragment>
                        Get Cards
                        {cardCountProgress}
                        <Badge />
                    </React.Fragment>}
                id="engineering-tab-draft"
                aria-controls="engineering-draft"
                value={1}
            />
        </Tabs>
    );
}
