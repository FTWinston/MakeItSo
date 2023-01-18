import { StoryObj } from '@storybook/react';
import { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem, Select } from 'src/lib/mui';
import { DefiniteMap } from 'src/types/DefiniteMap';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { arrayToMap } from 'src/utils/arrays';
import { getDefaultSystemStates, getDefaultTrainingState } from 'src/utils/getDefaultTrainingState';
import { storyCards } from '../features/Cards/components/CardHand.stories';
import { createCards } from '../features/Cards/data/EngineeringCards';
import { EngineeringCardType } from '../features/Cards/types/EngineeringCard';
import { getComplexStoryTiles } from '../features/SystemTiles/components/SystemTiles.stories';
import { DamageAction, EngineeringAction } from '../types/EngineeringState';
import { SystemStatusEffectType } from '../types/SystemStatusEffect';
import { EngineeringTraining } from './EngineeringTraining';

export default {
    title: 'Engineering',
    component: EngineeringTraining,
};

type Story = StoryObj<typeof EngineeringTraining>;

export const Empty: Story = {
    args: {
        getInitialState: () => {
            const systems = getDefaultSystemStates();
            return {
                ...getDefaultTrainingState(),
                systems: arrayToMap(systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>,
                engineering: {
                    systemOrder: systems.map(system => system.system),
                    handCards: [],
                    maxHandSize: 7,
                    choiceCards: [],
                    numChoices: 0,
                    nextCardId: 14,
                    nextEffectId: 1,
                },
            };
        },
        getEffects: () => [
            {
                type: 'damage',
                system: ShipSystem.Shields,
                healthChange: -1,
            } as DamageAction
        ],
    }
}

export const Busy: Story = {
    args: {
        getInitialState: () => {
            const systems = getComplexStoryTiles();
            return {
                ...getDefaultTrainingState(),
                systems: arrayToMap(systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>,
                engineering: {
                    systemOrder: systems.map(system => system.system),
                    handCards: storyCards,
                    maxHandSize: 7,
                    choiceCards: createCards([11, 12, 13]),
                    numChoices: 3,
                    nextCardId: 14,
                    nextEffectId: 1,
                },
            };
        },
        getEffects: () => [
            {
                type: 'damage',
                system: ShipSystem.Weapons,
                healthChange: -1,
            } as DamageAction
        ],
    }
};

export const Custom: Story = {
    args: {
        getInitialState: () => {
            const systems = getDefaultSystemStates();
            return {
                ...getDefaultTrainingState(),
                systems: arrayToMap(systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>,
                engineering: {
                    systemOrder: systems.map(system => system.system),
                    handCards: [],
                    maxHandSize: 7,
                    choiceCards: [],
                    numChoices: 0,
                    nextCardId: 14,
                    nextEffectId: 1,
                },
            };
        },
        getEffects: () => [],
    },
    render: (props) => {
        const { t } = useTranslation('engineering');

        const [targetSystem, setTargetSystem] = useState<ShipSystem>(ShipSystem.Hull);

        const customRender = (dispatch: Dispatch<EngineeringAction>, defaultRender: () => JSX.Element) => {
            return (
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1em', backgroundColor: '#000'}}>                    
                    <Box sx={{fontSize: '0.8em'}}>
                        <h2>Add cards</h2>
                        <ul>
                        {Object.values(EngineeringCardType).map((type, index) => <li key={index} onClick={() => dispatch({ type: 'add custom card', cardType: type })}>{t(`card ${type} title`)}</li>)}
                        </ul>
                    </Box>
                    
                    {defaultRender()}
                    
                    <Box sx={{fontSize: '0.8em'}}>
                        <h2>Add effects</h2>
                        <Select
                            value={targetSystem}
                            onChange={e => setTargetSystem(e.target.value as ShipSystem)}
                        >
                            {Object.keys(ShipSystem)
                                .map(key => Number(key) as ShipSystem)
                                .filter(key => !isNaN(key))
                                .map((type, index) => <MenuItem key={index} value={type}>{t(`system ${type}`)}</MenuItem>)}
                        </Select>
                        <ul>
                        {Object.values(SystemStatusEffectType).map((type, index) => <li key={index} onClick={() => dispatch({ type: 'add custom effect', system: targetSystem, effectType: type })}>{t(`effect ${type}`)}</li>)}
                        </ul>
                    </Box>
                </Box>
            );
        };

        return <EngineeringTraining {...props} customRender={customRender} />;
    }
}
