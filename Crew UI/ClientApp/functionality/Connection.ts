import { store } from '../Client';
import { actionCreators as crewActions } from '../store/Crew';
import { actionCreators as userActions } from '../store/User';
import { actionCreators as screenActions } from '../store/Screen';
import { TextLocalisation } from './Localisation';

export class Connection {
    private socket: WebSocket;
    close: () => void;

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.socket.onerror = this.socket.onclose = () => screenActions.showError(store.getState().user.text.errors.connectionLost);
        this.socket.onmessage = e => this.messageReceived(e);
        this.socket.onopen = () => this.connected();
        this.close = this.socket.close.bind(this.socket);
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
            case 'all_present':
                store.dispatch(screenActions.showRoleSelection());
                break;
            case 'player': {
                pos = data.indexOf(' ');
                let playerID = parseInt(data.substr(0, pos));
                let playerName = data.substr(pos + 1);
                store.dispatch(crewActions.updatePlayer(playerID, playerName));
                break;
            }
            case 'disconnect':
                store.dispatch(crewActions.removePlayer(parseInt(data)));
                break;
            default:
                console.log(`Unexpected command: ${cmd}`);
                break;
        }
    }
}