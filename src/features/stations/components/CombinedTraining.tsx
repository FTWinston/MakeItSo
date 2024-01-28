import { produce } from 'immer';
import { useMemo, useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { crewActionReducer } from 'src/features/stations';
import { useInterval } from 'src/hooks/useInterval';
import { Box, styled } from 'src/lib/mui';
import { CrewStation, ShipSystem } from 'src/types/ShipSystem';
import { Engineering, EngineeringAction } from '../features/engineering';
import { Helm, HelmAction } from '../features/helm';
import { Sensors, SensorsAction } from '../features/sensors';
import { WeaponsAction } from '../features/weapons';
import { Weapons } from '../features/weapons/components/Weapons';
import { getTime } from 'src/utils/timeSpans';

interface Props {
    getInitialState: () => Ship;
}

const Root = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2em',
    flexWrap: 'wrap',
    backgroundColor: '#333',
});

export const CombinedTraining: React.FC<Props> = (props) => {
    const [ship, dispatch] = useReducer(produce(crewActionReducer), undefined, props.getInitialState);

    const engineeringDispatch = (action: EngineeringAction) => dispatch({ station: CrewStation.Engineering, action });
    const helmDispatch = (action: HelmAction) => dispatch({ station: CrewStation.Helm, action });
    const sensorsDispatch = (action: SensorsAction) => dispatch({ station: CrewStation.Sensors, action });
    const weaponsDispatch = (action: WeaponsAction) => dispatch({ station: CrewStation.Weapons, action });
    
    // Tick the ship, and all of its systems, at a regular interva;.
    useInterval(() => ship.space.tick(getTime()), 200);

    const { systemOrder: engineeringSystemOrder, ...otherEngineeringState } = ship.engineering;
    const engineeringSystemInfo = engineeringSystemOrder.map(system => ship.systems.get(system));

    const { power: enginePower, health: engineHealth } = ship.systems.get(ShipSystem.Engines);
    const { power: sensorPower, health: sensorHealth } = ship.systems.get(ShipSystem.Sensors);
    const { power: weaponPower, health: weaponHealth } = ship.systems.get(ShipSystem.Weapons);

    const otherObjects = useMemo(() => {
        return [...ship.space.objects.values()]
            .filter(obj => obj.id !== ship.id);
    }, [ship.space.objects]);

    return (
        <Root>
            <Helm
                power={enginePower}
                health={engineHealth}
                evasion={ship.evasionChance}
                ship={ship}
                shipDestroyed={ship.destroyed}
                otherObjects={otherObjects}
                stop={() => helmDispatch({ type: 'stop' })}
                discardManeuverCard={() => helmDispatch({ type: 'discard' })}
                maneuvers={ship.helm.maneuvers}
                maneuverChoice={ship.helm.maneuverChoice}
                speed={ship.helm.speed}
                speedWhileRotating={ship.helm.speedWhileRotating}
                rotationalSpeed={ship.helm.rotationalSpeed}
                destination={ship.helm.destination?.val ?? null}
                setDestination={destination => helmDispatch({ type: 'set destination', destination })}
                maneuver={choice => helmDispatch({ type: 'maneuver', choice })}
            />
            <Sensors
                power={sensorPower}
                health={sensorHealth}
                shipDestroyed={ship.destroyed}
                targets={ship.sensors.possibleTargets}
                viewTarget={ship.viewTarget}
                setViewTarget={target => sensorsDispatch({ type: 'view', target })}
                scanTarget={ship.sensors.currentTarget?.id}
                setScanTarget={target => sensorsDispatch({ type: 'target', target })}
                scanTargetTree={ship.sensors.scanTree}
                scanItem={ship.sensors.currentScan}
                scanCellBoard={ship.sensors.scanCellBoard}
                setScanItem={scan => sensorsDispatch({ type: 'scan', scan })}
                revealCell={index => sensorsDispatch({ type: 'reveal', index })}
                flagCell={index => sensorsDispatch({ type: 'flag', index })}
            />
            <Engineering
                {...otherEngineeringState}
                shipDestroyed={ship.destroyed}
                systems={engineeringSystemInfo}
                chooseCard={cardId => engineeringDispatch({ type: 'draw', cardId })}
                playCard={(card, targetSystem, repair) => engineeringDispatch({ type: 'play', cardId: card.id, targetSystem, repair })}
            />
            <Weapons
                {...ship.weapons}
                power={weaponPower}
                health={weaponHealth}
                shipDestroyed={ship.destroyed}
            />
        </Root>
    )
};