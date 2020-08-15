import { SystemState } from '../../data/SystemState';
import { PowerLevel } from '../../data/PowerLevel';

export function updatePowerLevel(systemState: SystemState) {
    systemState.prevPower = systemState.power;
    systemState.power = Math.max(Math.min(systemState.basePower, PowerLevel.Full), PowerLevel.Off);
}
