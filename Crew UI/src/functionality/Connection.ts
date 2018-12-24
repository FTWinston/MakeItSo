import { store } from '~/index';
import { actionCreators as crewActions } from '~/store/Crew';
import { actionCreators as screenActions, ClientScreen } from '~/store/Screen';
import { actionCreators as environmentActions } from '~/store/Environment';
import { ShipSystem, parseSensorTarget } from '~/functionality';
import { msgPrefix as helmPrefix, receiveMessage as helmMessage } from '~/components/systems/helm'
import { msgPrefix as sensorPrefix, receiveMessage as sensorMessage } from '~/components/systems/sensors'
import { msgPrefix as damagePrefix, receiveMessage as damageMessage } from '~/components/systems/damage'
import { msgPrefix as powerPrefix, receiveMessage as powerMessage } from '~/components/systems/power'
import { msgPrefix as warpPrefix, receiveMessage as warpMessage } from '~/components/systems/warp'
import { msgPrefix as weaponPrefix, receiveMessage as weaponMessage } from '~/components/systems/weapons'

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
                store.dispatch(screenActions.showSystemView());
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
                    store.dispatch(screenActions.showSystemView());
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

            // "sensor targets" are actually shown on multiple systems
            case 'env_target': {
                let target = parseSensorTarget(data);
                store.dispatch(environmentActions.addOrUpdateTarget(target));
                break;
            }
            case 'env_rem': {
                let id = parseInt(data);
                store.dispatch(environmentActions.removeTarget(id));
                break;
            }
            case 'env_clear': {
                store.dispatch(environmentActions.removeAllTargets());
            }
            default:
                if (cmd.startsWith(helmPrefix))
                {
                    if (helmMessage(cmd, data)) {
                        break;
                    }
                }
                else if (cmd.startsWith(warpPrefix))
                {
                    if (warpMessage(cmd, data)) {
                        break;
                    }
                }
                else if (cmd.startsWith(weaponPrefix))
                {
                    if (weaponMessage(cmd, data)) {
                        break;
                    }
                }
                else if (cmd.startsWith(sensorPrefix))
                {
                    if (sensorMessage(cmd, data)) {
                        break;
                    }
                }
                else if (cmd.startsWith(powerPrefix))
                {
                    if (powerMessage(cmd, data)) {
                        break;
                    }
                }
                else if (cmd.startsWith(damagePrefix))
                {
                    if (damageMessage(cmd, data)) {
                        break;
                    }
                }

                console.log(`Unexpected command: ${cmd}`);
                break;
        }
    }
}