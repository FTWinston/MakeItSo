import { SystemState } from '../../common/data/server/SystemState';
import { PowerLevel } from '../../common/data/PowerLevel';

export function updatePowerLevel(systemState: SystemState) {
    systemState.prevPower = systemState.power;
    systemState.power = Math.max(Math.min(systemState.basePower, PowerLevel.Full), PowerLevel.Off);
}
