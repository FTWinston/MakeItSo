import { store } from '../Client';
import { actionCreators as crewActions } from '../store/Crew';
import { actionCreators as userActions } from '../store/User';
import { actionCreators as screenActions, ClientScreen } from '../store/Screen';
import { actionCreators as helmActions } from '../store/Helm';
import { TextLocalisation } from './Localisation';
import { ShipSystem } from '../functionality';

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
            case 'already_started':
                store.dispatch(screenActions.setGameActive());
                break;
            case 'already_paused':
                store.dispatch(screenActions.setGamePaused());
                break;
            case 'helm_manoever_limits': {
                let vals = data.split(' ');
                let pitch = parseFloat(vals[0]);
                let yaw = parseFloat(vals[1]);
                let roll = parseFloat(vals[2]);
                let translationX = parseFloat(vals[3]);
                let translationY = parseFloat(vals[4]);
                helmActions.setManoeveringLimits(pitch, yaw, roll, translationX, translationY);
                break;
            }
            case 'helm_speed_limits': {
                let vals = data.split(' ');
                let forwardMax = parseFloat(vals[0]);
                let revMax = parseFloat(vals[1]);
                helmActions.setSpeedLimits(forwardMax, revMax);
                break;
            }
            case 'helm_orientation': {
                let vals = data.split(' ');
                let pitch = parseFloat(vals[0]);
                let yaw = parseFloat(vals[1]);
                let roll = parseFloat(vals[2]);
                helmActions.setOrientation(pitch, yaw, roll);
                break;
            }
            case 'helm_rotation_rates': {
                let vals = data.split(' ');
                let pitch = parseFloat(vals[0]);
                let yaw = parseFloat(vals[1]);
                let roll = parseFloat(vals[2]);
                helmActions.setRotationRates(pitch, yaw, roll);
                break;
            }
            case 'helm_translation_rates': {
                let vals = data.split(' ');
                let x = parseFloat(vals[0]);
                let y = parseFloat(vals[1]);
                let forward = parseFloat(vals[2]);
                helmActions.setTranslationRates(x, y, forward);
                break;
            }
            default:
                console.log(`Unexpected command: ${cmd}`);
                break;
        }
    }
}