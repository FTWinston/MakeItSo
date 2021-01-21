import { makeStyles, useTheme } from '@material-ui/core';
import React, { useContext } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { GameContext } from '../../../common/components/GameProvider';
import { ShipSystem } from '../../../common/components/ShipSystem';
import { Aim } from './Aim';
import { SolutionSelection } from './SolutionSelection';
import { TargetSelection } from './TargetSelection';
import { WeaponStepper } from './WeaponStepper';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
    },
    tabs: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    tabContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    chargeIndicator: {
        height: theme.spacing(4),
    }
}));

export const Weapons: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles();
    
    const [gameState, dispatch] = useContext(GameContext);

    const targetShipId = gameState.localShip.weapons.targetVesselId
    const targetShip = targetShipId === undefined
        ? undefined
        : gameState.ships[targetShipId];

    const solutionId = targetShip === undefined
        ? undefined
        : gameState.localShip.weapons.targetSolutionId;

    
    const setTarget = (target?: number) => dispatch({
        type: 'wpn target',
        ship: target,
    });
        
    const setSolution = (solution?: number) => dispatch({
        type: 'wpn solution',
        solution,
    });

    const activeStep = solutionId !== undefined
        ? 2
        : targetShipId !== undefined
            ? 1
            : 0;

    const changeStep = (step: number) => {
        if (step === 0) {
            setTarget();
        }
        else if (step === 1) {
            setSolution();
        }
    }

    /*

    // View as a FAB with a speed dial?
    //  Reset
    //  Magnify
    //  Zoom out
    //  internal / external

    */

    const stepper = (
        <WeaponStepper
            activeStep={activeStep}
            changeStep={changeStep}
        />
    );

    return (
        <ShipSystem className={classes.root} appBarContent={stepper}>
            <SwipeableViews
                className={classes.tabs + ' swipeableRoot'}
                axis="x"
                index={activeStep}
                containerStyle={{flexGrow: 1}}
                slideStyle={{display: 'flex', flexDirection: 'column'}}
                //onChangeIndex={changeStep}
            >
                
                <div
                    role="tabpanel"
                    hidden={activeStep !== 0}
                    id="weapon-target"
                    aria-labelledby="weapon-tab-target"
                    className={classes.tabContent}
                >
                    <TargetSelection
                        localShip={gameState.localShip}
                        ships={gameState.ships}
                        selected={setTarget}
                        currentTarget={targetShipId}
                    />
                </div>

                <div
                    role="tabpanel"
                    hidden={activeStep !== 1}
                    id="weapon-solution"
                    aria-labelledby="weapon-tab-solution"
                    className={classes.tabContent}
                >
                    <SolutionSelection
                        localShip={gameState.localShip}
                        targetShip={targetShip ?? gameState.localShip}
                        solutions={gameState.localShip.weapons.targetSolutions}
                        selected={setSolution}
                    />
                </div>

                <div
                    role="tabpanel"
                    hidden={activeStep !== 2}
                    id="weapon-fire"
                    aria-labelledby="weapon-tab-fire"
                    className={classes.tabContent}
                >
                    <Aim 
                        fire={() => {}}
                        polygon={[
                            { x: 1, y: 1 },
                            { x: 5, y: 1 },
                            { x: 5, y: 5 },
                            { x: 1, y: 5 }
                        ]}
                        requiredAccuracy={0.9}
                    />
                </div>
            </SwipeableViews>
            
            <div className={classes.chargeIndicator}>
                Charge indicator here?
            </div>
        </ShipSystem>
    );
}
