import { produce } from 'immer';
import { useEffect, useReducer } from 'react';
import { useInterval } from 'src/hooks/useInterval';
import { Box, styled } from 'src/lib/mui';
import { CrewStation } from 'src/types/ShipSystem';
import { EngineeringAction } from '../features/engineering';
import { HelmAction } from '../features/helm';
import { SensorsAction } from '../features/sensors';
import { WeaponsAction } from '../features/weapons';
import { FakeShip } from 'src/classes/FakeShip';
import { Space } from 'src/classes/Space';
import { getStorySpaceReducer } from '../utils/getStorySpaceReducer';
import { storySystemReducer } from '../utils/storySystemReducer';
import { SystemStatusEffectType } from '../features/engineering/types/SystemStatusEffect';
import { EngineeringCardType } from '../features/engineering/features/Cards';
import { CoreEngineeringTraining } from '../features/engineering/components/EngineeringTraining';
import { CoreWeaponsTraining } from '../features/weapons/components/WeaponsTraining';
import { CoreSensorsTraining } from '../features/sensors/components/SensorsTraining';
import { CoreHelmTraining } from '../features/helm/components/HelmTraining';
import { ErrorBoundary } from 'src/components/ErrorBoundary';

interface Props {
    getInitialState: () => Space;
    otherShipState: 'idle' | 'mobile' | 'hostile';

    engineeringCardToAdd?: EngineeringCardType;
    engineeringSystemToAffect?: string;
    engineeringEffectToApply?: SystemStatusEffectType;
}

const Root = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2em',
    flexWrap: 'wrap',
    backgroundColor: '#333',
});

const shipId = 1;
const spaceReducer = getStorySpaceReducer(shipId, storySystemReducer);

export const CombinedTraining: React.FC<Props> = (props) => {
    const [space, dispatch] = useReducer(produce(spaceReducer), undefined, props.getInitialState);

    const engineeringDispatch = (action: EngineeringAction) => dispatch({ station: CrewStation.Engineering, action });
    const helmDispatch = (action: HelmAction) => dispatch({ station: CrewStation.Helm, action });
    const sensorsDispatch = (action: SensorsAction) => dispatch({ station: CrewStation.Sensors, action });
    const weaponsDispatch = (action: WeaponsAction) => dispatch({ station: CrewStation.Weapons, action });
    
    // Tick the everything in space, including the ship and all of its systems, at a regular interval.
    useInterval(() => dispatch({ type: 'tick' }), 200);

    useEffect(() => {
        const otherObj = space.objects.get(2);
        
        if (otherObj === undefined) {
            return;
        }
        
        const otherShip = otherObj as FakeShip;

        switch (props.otherShipState) {
            case 'idle':
                // TODO: make otherShip neutral, make it stop.
                break;
            case 'mobile':
                // TODO: make otherShip friendly, give it movement.
                break;
            case 'hostile':
                // TODO: make otherShip hostile, give it movement.
                break;
        }
    }, [props.otherShipState]);

    return (
        <Root>
            <ErrorBoundary>
                <CoreHelmTraining
                    dispatch={helmDispatch}
                    space={space}
                    shipId={shipId}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <CoreSensorsTraining
                    dispatch={sensorsDispatch}
                    space={space}
                    shipId={shipId}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <CoreEngineeringTraining
                    dispatch={engineeringDispatch}
                    space={space}
                    shipId={shipId}
                    cardToAdd={props.engineeringCardToAdd}
                    systemToAffect={props.engineeringSystemToAffect}
                    effectToApply={props.engineeringEffectToApply}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <CoreWeaponsTraining
                    dispatch={weaponsDispatch}
                    space={space}
                    shipId={shipId}
                />
            </ErrorBoundary>
        </Root>
    )
};