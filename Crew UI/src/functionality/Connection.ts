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
        console.log('sent', cmd);
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
                store.dispatch(crewActions.addPlayer(playerID, playerName));
                break;
            }
            case 'playersys': {
                pos = data.indexOf(' ');
                let playerID = parseInt(data.substr(0, pos));
                let system = parseInt(data.substr(pos + 1)) as ShipSystem;
                store.dispatch(crewActions.setPlayerSystem(playerID, system === 0 ? undefined : system));

                if (playerID === store.getState().crew.localPlayerID) {
                    store.dispatch(screenActions.showSystemView());
                }
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
                if (store.getState().screen.display !== ClientScreen.NameEntry) {
                    store.dispatch(screenActions.showGameMenu());
                }
                break;
            case 'game-':
                store.dispatch(screenActions.setGameFinished());
                store.dispatch(screenActions.showWaitingForPlayers());
                break;
            case 'pause':
                store.dispatch(screenActions.setGamePaused());
                if (store.getState().screen.display !== ClientScreen.NameEntry) {
                    store.dispatch(screenActions.showWaitingForPlayers());
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
                break;
            }
            case 'ship_pos': {
                const vals = data.split(' ').map(v => parseInt(v));
                store.dispatch(environmentActions.setShipPosition(vals[0], vals[1], vals[2]));
                store.dispatch(environmentActions.setShipVelocity(vals[3], vals[4], vals[5]));
                break;
            }
            case 'ship_rot': {
                const vals = data.split(' ').map(v => parseInt(v));
                store.dispatch(environmentActions.setShipOrientation(vals[0], vals[1], vals[2]));
                store.dispatch(environmentActions.setShipOrientationRate(vals[3], vals[4], vals[5]));
                break;
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