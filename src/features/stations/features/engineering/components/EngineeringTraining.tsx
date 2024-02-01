import { produce } from 'immer';
import { Dispatch, useEffect, useReducer, useRef } from 'react';
import { Ship } from 'src/classes/Ship';
import { engineeringReducer } from 'src/features/stations';
import { useInterval } from 'src/hooks/useInterval';
import { DamageAction, EngineeringAction } from '../types/EngineeringState';
import { Engineering } from './Engineering';
import { SpaceAction, getStorySpaceReducer } from 'src/features/stations/utils/getStorySpaceReducer';
import { Space } from 'src/classes/Space';
import { EngineeringCardType } from '../features/Cards';
import { SystemStatusEffectType } from '../types/SystemStatusEffect';
import { ShipSystem } from 'src/types/ShipSystem';

interface Props {
    getInitialState: () => Space;
    getEffects: () => DamageAction[];
    renderMenuItems?: () => JSX.Element;
    cardToAdd?: EngineeringCardType;
    systemToAffect?: string;
    effectToApply?: SystemStatusEffectType;
}

const shipId = 1;
const spaceReducer = getStorySpaceReducer(shipId, engineeringReducer);
const engineeringActionReducer = (space: Space, action: SpaceAction<EngineeringAction>) => spaceReducer(space, action);

export const EngineeringTraining: React.FC<Props> = (props) => {
    const { getEffects, getInitialState, cardToAdd, systemToAffect, effectToApply } = props;

    const [space, dispatch] = useReducer(produce(engineeringActionReducer), undefined, getInitialState);
    const ship = space.objects.get(shipId) as Ship;

    // Run tick action at a regular interval.
    useInterval(() => dispatch({ type: 'tick' }), 200);

    useEngineeringStoryControls(dispatch, cardToAdd, systemToAffect, effectToApply);

    // Check for new automatic effects and apply them at a less frequent interval.
    useInterval(() => {
        const effects = getEffects();

        for (const effect of effects) {
            dispatch(effect);
        }
    }, 1500, [getEffects]);

    const { systemOrder, ...otherState } = ship.engineering;
    const orderedSystemInfo = systemOrder.map(system => ship.systems.get(system));

    return (
        <Engineering
            {...otherState}
            renderMenuItems={props.renderMenuItems}
            shipDestroyed={ship.destroyed}
            systems={orderedSystemInfo}
            chooseCard={cardId => dispatch({ type: 'draw', cardId })}
            playCard={(card, targetSystem, repair) => dispatch({ type: 'play', cardId: card.id, targetSystem, repair })}
        />
    );
};

export function useEngineeringStoryControls(dispatch: Dispatch<EngineeringAction>, cardToAdd?: EngineeringCardType, systemToAffect?: string, effectToApply?: SystemStatusEffectType) {
    const initialRender = useRef(true);

    // Check for a card being added manually.
    useEffect(() => {
        if (cardToAdd && !initialRender.current) {
            dispatch({ type: 'add custom card', cardType: cardToAdd });
        }
    }, [cardToAdd]);

    // Check for an effect being added manually.
    useEffect(() => {
        if (systemToAffect && effectToApply && !initialRender.current) {
            const system = Number(Object.keys(ShipSystem).filter(x => ShipSystem[x as any] == systemToAffect)[0]);
            dispatch({ type: 'add custom effect', system, effectType: effectToApply, });
        }
        else {
            initialRender.current = false;
        }
    }, [systemToAffect, effectToApply]);
}
