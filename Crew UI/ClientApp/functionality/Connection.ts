import { store } from '../Client';
import { actionCreators as crewActions } from '../store/Crew';
import { actionCreators as userActions } from '../store/User';
import { actionCreators as screenActions, ClientScreen } from '../store/Screen';
import { actionCreators as helmActions } from '../store/Helm';
import { actionCreators as warpActions, JumpPathStatus } from '../store/Warp';
import { actionCreators as sensorActions } from '../store/Sensors';
import { TextLocalisation } from './Localisation';
import { ShipSystem, SensorTarget, parseSensorTarget, Vector3 } from '../functionality';

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
            }
            case 'warp_add_path': {
                let vals = data.split(' ');
                let id = parseInt(vals[0]);
                let status = parseInt(vals[1]) as JumpPathStatus;

                let points: Vector3[] = [];
                for (let i=4; i<vals.length; i++) {
                    points.push(new Vector3(
                        parseFloat(vals[i-2]),
                        parseFloat(vals[i-1]),
                        parseFloat(vals[i])
                    ));
                }

                store.dispatch(warpActions.addPath(id, status, points));
            }
            case 'warp_ext_path': {
                let vals = data.split(' ');
                let id = parseInt(vals[0]);

                let points: Vector3[] = [];
                for (let i=3; i<vals.length; i++) {
                    points.push(new Vector3(
                        parseFloat(vals[i-2]),
                        parseFloat(vals[i-1]),
                        parseFloat(vals[i])
                    ));
                }

                store.dispatch(warpActions.extendPath(id, points));
            }
            case 'warp_upd_path': {
                let vals = data.split(' ');
                let id = parseInt(vals[0]);
                let status = parseInt(vals[1]) as JumpPathStatus;

                store.dispatch(warpActions.setPathStatus(id, status));
            }
            case 'warp_rem_path': {
                let id = parseInt(data);

                store.dispatch(warpActions.removePath(id));
            }
            default:
                console.log(`Unexpected command: ${cmd}`);
                break;
        }
    }
}