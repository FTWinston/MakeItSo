import { makeStyles, Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';

interface Props {
    activeStep: number;
    changeStep: (step: number) => void;
}

const useStyles = makeStyles(theme => ({
    stepper: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(1),
        backgroundColor: 'unset',
        textTransform: 'uppercase',
        '& .MuiStepIcon-root': {
            fontWeight: 'bold',
        },
        '& .MuiStepIcon-active': {
            color: theme.palette.secondary.main,
        },
        '& .MuiStepIcon-completed': {
            color: theme.palette.common.white,
        },
        '& .MuiStepLabel-root:not(.Mui-disabled)': {
            cursor: 'pointer',
        }
    }
}));

export const WeaponStepper: React.FC<Props> = props => {
    const classes = useStyles();
    
    return (
        <Stepper activeStep={props.activeStep} className={classes.stepper}>
            <Step>
                <StepLabel onClick={props.activeStep > 0 ? () => props.changeStep(0) : undefined}>
                    Target
                </StepLabel>
            </Step>
            <Step>
                <StepLabel onClick={props.activeStep > 1 ? () => props.changeStep(1) : undefined}>
                    Solution
                </StepLabel>
            </Step>
            <Step>
                <StepLabel>Fire</StepLabel>
            </Step>
        </Stepper>
    );
}
