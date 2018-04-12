import { store } from '~/Client';
import { actionCreators as crewActions } from '~/store/Crew';
import { actionCreators as userActions } from '~/store/User';
import { actionCreators as screenActions, ClientScreen } from '~/store/Screen';
import { actionCreators as helmActions } from '~/store/Helm';
import { actionCreators as warpActions, WarpScreenStatus } from '~/store/Warp';
import { actionCreators as powerActions, PowerCellType, PowerSystem,
    numCells as numPowerCells, numSystems as numPowerSystems, maxNumSpare as maxNumSparePowerCells
} from '~/store/Power';
import { actionCreators as sensorActions } from '~/store/Sensors';
import { TextLocalisation } from './Localisation';
import { ShipSystem, SensorTarget, parseSensorTarget, Vector3 } from '~/functionality';
import { JumpPathStatus } from '~/functionality/sensors';

export class Connection {
    private socket: WebSocket;
    close: () => void;

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.socket.onerror = this.socket.onclose = () => store.dispatch(screenActions.showError(store.getState().user.text.errors.connectionLost));
        this.socket.onmessage = e => this.messageReceived(e);
        this.socket.onopen = () => this.connected();
        this.close = () => this.socket.close();
    }
    
    send(cmd: string) {
        this.socket.send(cmd);
    }

    private connected() {
        store.dispatch(screenActions.showUserSettings());
    }
    
    private messageReceived(ev: MessageEvent) {
        let data:string = (ev.data || '');
        console.log('received', data);

        let pos:number = data.indexOf(' ');
        let cmd:string = pos === -1 ? data : data.substr(0, pos);
        data = pos === -1 ? '' : data.substr(pos + 1);

        switch (cmd) {
            case 'id':
                store.dispatch(crewActions.setLocalPlayer(parseInt(data)));
                break;
            case 'player': {
                pos = data.indexOf(' ');
                let playerID = parseInt(data.substr(0, pos));
                let playerName = data.substr(pos + 1);
                store.dispatch(crewActions.updatePlayer(playerID, playerName));
                break;
            }
            case 'playersys': {
                pos = data.indexOf(' ');
                let playerID = parseInt(data.substr(0, pos));
                let systems = parseInt(data.substr(pos + 1)) as ShipSystem;
                store.dispatch(crewActions.setPlayerSystems(playerID, systems));
                break;
            }
            case 'viewsys': {
                pos = data.indexOf(' ');
                let playerID = parseInt(data.substr(0, pos));
                let system = parseInt(data.substr(pos + 1)) as ShipSystem;
                store.dispatch(crewActions.setActiveSystem(playerID, system === 0 ? undefined : system));
                break;
            }
            case 'disconnect':
                store.dispatch(crewActions.removePlayer(parseInt(data)));
                break;
            case 'setup+': {
                let playerID = parseInt(data);
                store.dispatch(crewActions.setSetupPlayer(playerID));
                if (playerID === store.getState().crew.localPlayerID) {
                    store.dispatch(screenActions.showGameSetup());
                }
                break;
            }
            case 'setup-':
                store.dispatch(crewActions.setSetupPlayer(undefined));
                break;
            case 'game+':
                store.dispatch(crewActions.setSetupPlayer(undefined));
                store.dispatch(screenActions.setGameActive());
                if (store.getState().screen.display !== ClientScreen.UserSettings) {
                    store.dispatch(screenActions.showGame());
                }
                break;
            case 'game-':
                store.dispatch(screenActions.setGameFinished());
                store.dispatch(screenActions.showSystemSelection());
                break;
            case 'pause':
                store.dispatch(screenActions.setGamePaused());
                if (store.getState().screen.display !== ClientScreen.UserSettings) {
                    store.dispatch(screenActions.showSystemSelection());
                }
                break;
            case 'helm_manoever_limits': {
                let vals = data.split(' ');
                let pitch = parseFloat(vals[0]);
                let yaw = parseFloat(vals[1]);
                let roll = parseFloat(vals[2]);
                let translationX = parseFloat(vals[3]);
                let translationY = parseFloat(vals[4]);
                store.dispatch(helmActions.setManoeveringLimits(pitch, yaw, roll, translationX, translationY));
                break;
            }
            case 'helm_speed_limits': {
                let vals = data.split(' ');
                let forwardMax = parseFloat(vals[0]);
                let revMax = parseFloat(vals[1]);
                store.dispatch(helmActions.setSpeedLimits(forwardMax, revMax));
                break;
            }
            case 'helm_rotation': {
                let vals = data.split(' ');
                let pitch = parseFloat(vals[0]);
                let yaw = parseFloat(vals[1]);
                let roll = parseFloat(vals[2]);
                let pitchRate = parseFloat(vals[3]);
                let yawRate = parseFloat(vals[4]);
                let rollRate = parseFloat(vals[5]);
                store.dispatch(helmActions.setOrientation(pitch, yaw, roll));
                store.dispatch(helmActions.setRotationRates(pitchRate, yawRate, rollRate));
                break;
            }
            case 'helm_translation_rates': {
                let vals = data.split(' ');
                let forward = parseFloat(vals[0]);
                let horiz = parseFloat(vals[1]);
                let vert = parseFloat(vals[2]);
                store.dispatch(helmActions.setTranslationRates(horiz, vert, forward));
                break;
            }
            case 'sensor_target': {
                let target = parseSensorTarget(data);
                store.dispatch(sensorActions.addTarget(target));
                break;
            }
            case 'warp_clear': {
                store.dispatch(warpActions.clearAll());
                break;
            }
            case 'warp_add_path': {
                let vals = data.split(' ');
                let id = parseInt(vals[0]);
                let status = parseInt(vals[1]) as JumpPathStatus;
                let power = parseFloat(vals[2]);

                let points: Vector3[] = [];
                for (let i=5; i<vals.length; i+=3) {
                    points.push(new Vector3(
                        parseFloat(vals[i-2]),
                        parseFloat(vals[i-1]),
                        parseFloat(vals[i])
                    ));
                }

                store.dispatch(warpActions.addPath(id, status, points, power));
                break;
            }
            case 'warp_ext_path': {
                let vals = data.split(' ');
                let id = parseInt(vals[0]);

                let points: Vector3[] = [];
                for (let i=3; i<vals.length; i+=3) {
                    points.push(new Vector3(
                        parseFloat(vals[i-2]),
                        parseFloat(vals[i-1]),
                        parseFloat(vals[i])
                    ));
                }

                store.dispatch(warpActions.extendPath(id, points));
                break;
            }
            case 'warp_rem_path': {
                let vals = data.split(' ');
                let id = parseInt(vals[0]);
                let displayInvalid = parseInt(vals[1]) === 1;

                if (displayInvalid) {
                    // mark invalid now, then remove after 2 secs
                    store.dispatch(warpActions.setPathStatus(id, JumpPathStatus.Invalid));
                    setTimeout(() => store.dispatch(warpActions.removePath(id)), 2000);
                } else {
                    // remove immediately
                    store.dispatch(warpActions.removePath(id));
                }
                break;
            }
            case 'warp_charge_jump': {
                let vals = data.split(' ');
                let id = parseInt(vals[0]);
                let secsRemaining = parseInt(vals[1]);
                let completion = parseInt(vals[2]);

                store.dispatch(warpActions.chargeJump(id, secsRemaining, completion));
                break;
            }
            case 'warp_cancel_jump': {
                store.dispatch(warpActions.setScreenStatus(WarpScreenStatus.Viewing));
                break;
            }
            case 'warp_jump_failed': {
                // TODO: handle "jump failed" better, idk...
                store.dispatch(warpActions.setScreenStatus(WarpScreenStatus.Charging));
                break;
            }
            case 'warp_ship_pos': {
                let vals = data.split(' ');
                let x = parseInt(vals[0]);
                let y = parseInt(vals[1]);
                let z = parseInt(vals[2]);
                store.dispatch(warpActions.setShipPosition(x, y, z));
                break;
            }
            case 'warp_jump': {
                let vals = data.split(' ');
                let id = parseInt(vals[0]);
                let secsRemaining = parseInt(vals[1]);

                store.dispatch(warpActions.performJump(id, secsRemaining));
                break;
            }
            case 'power_cell_t': {
                let vals = data.split(' ').map(v => parseInt(v));
                let cell = vals[0];
                let type = vals[1] as PowerCellType;
                store.dispatch(powerActions.setCellType(cell, type));
                break;
            }
            case 'power_all_cells_t': {
                let types = data.split(' ').map(v => parseInt(v) as PowerCellType);
                if (types.length !== numPowerCells) {
                    throw `Invalid number of power cells: need ${numPowerCells}, but got ${types.length}: ${data}`;
                }
                store.dispatch(powerActions.setAllCellTypes(types));
                break;
            }
            case 'power_cell_p': {
                let vals = data.split(' ').map(v => parseInt(v));
                let cell = vals[0];
                let level = vals[1];
                store.dispatch(powerActions.setCellPower(cell, level));
                break;
            }
            case 'power_all_cells_p': {
                let levels = data.split(' ').map(v => parseInt(v));
                if (levels.length !== numPowerCells) {
                    throw `Invalid number of power cells: need ${numPowerCells}, but got ${levels.length}: ${data}`;
                }
                store.dispatch(powerActions.setAllCellPower(levels));
                break;
            }
            case 'power_sys': {
                let vals = data.split(' ');
                let sys = parseInt(vals[0]) as PowerSystem;
                let enabled = vals[1] === '1';
                store.dispatch(powerActions.setSystemStatus(sys, enabled));
                break;
            }
            case 'power_all_sys': {
                let states = data.split(' ').map(v => v === '1');
                if (states.length !== numPowerSystems) {
                    throw `Invalid number of power systems: need ${numPowerSystems}, but got ${states.length}: ${data}`;
                }
                store.dispatch(powerActions.setAllSystems(states));
                break;
            }
            case 'power_reactor': {
                store.dispatch(powerActions.setReactorPower(parseInt(data)));
                break;
            }
            case 'power_all_spare': {
                let types = data.split(' ').map(v => parseInt(v) as PowerCellType);
                if (types.length > maxNumSparePowerCells) {
                    throw `Invalid number of spare power cells: maximum of ${maxNumSparePowerCells}, but got ${types.length}: ${data}`;
                }
                store.dispatch(powerActions.setAllSpareCells(types));
                break;
            }
            default:
                console.log(`Unexpected command: ${cmd}`);
                break;
        }
    }
}