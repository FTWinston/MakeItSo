import type { ShipState } from 'src/types/ShipState';
import { PowerLevel, ShipSystem } from 'src/types/ShipSystem';
import { adjustDuration, durationToTicks } from 'src/utils/timeSpans';
import { createCards } from '../features/Cards';

function determineCardGenerationDuration(power: PowerLevel): number {
    switch (power) {
        case 0:
            return 60;
        case 1:
            return 35;
        case 2:
            return 15;
        case 3:
            return 10;
        case 4:
            return 5;
    }
}

export function updateCardGeneration(state: ShipState, currentTime: number) {
    const reactorSystem = state.systems.get(ShipSystem.Reactor);
    const powerLevelChanged = reactorSystem.powerLevelChanged;

    if (reactorSystem.powerLevelChanged) {
        reactorSystem.powerLevelChanged = false;
    }

    const generationProgress = state.engineering.choiceProgress;

    if (!generationProgress) {
        state.engineering.choiceProgress = {
            startTime: currentTime,
            endTime: currentTime + durationToTicks(determineCardGenerationDuration(reactorSystem.power)),
        };

        return;
    }
    
    if (powerLevelChanged) {
        // Adjust choiceProgress to account for duration, maintaining % complete.
        state.engineering.choiceProgress = adjustDuration(generationProgress, determineCardGenerationDuration(reactorSystem.power));
    }
    
    if (currentTime >= generationProgress.endTime) {
        state.engineering.numChoices = Math.min(9, state.engineering.numChoices + 1);
        
        if (state.engineering.choiceCards.length === 0) {
            state.engineering.choiceCards = createCards([state.engineering.nextCardId++, state.engineering.nextCardId++, state.engineering.nextCardId++]);
        }

        state.engineering.choiceProgress = undefined;
    }
}
