import { store } from '~/Client';
import { actionCreators } from '~/store/User';
import { Button } from '~/components/general/buttons/Button';

export type Hotkey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'L' | 'K' | 'M'
            | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
            | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
            | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10'
            | ',' | '.' | '/' | 'enter' | 'space' | 'control' | 'shift' | 'alt' | 'tab';

export class Hotkeys {
    private static bindings: { [key: number]:Button; } = {};
    
    private static keyCodes: { [key: string]:number; } = {
        'enter': 13,
        'space': 32,
        'tab' : 9,
        'control': 17,
        'shift': 16,
        'alt': 18,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        ',': 188,
        '.': 190,
        '/': 191,
    };
    private static getKeyCode(hotkey: Hotkey) {
        let keyCode = this.keyCodes[hotkey];
        if (keyCode !== undefined)
            return keyCode;

        return hotkey.charCodeAt(0);
    }
    static register(hotkey: Hotkey, button: Button) {
        let keyCode = this.getKeyCode(hotkey);
        this.bindings[keyCode] = button;
    }
    static unregister(hotkey: Hotkey, button: Button) {
        let keyCode = this.getKeyCode(hotkey);
        if (this.bindings[keyCode] == button)
            delete this.bindings[keyCode];
    }
    static initialize() {
        document.onkeydown = Hotkeys.onKeyDown;
        document.onkeyup = Hotkeys.onKeyUp;
    }
    private static onKeyDown(e: KeyboardEvent) {
        var button = Hotkeys.bindings[e.which];
        if (button === undefined) {
            if (e.which === 112) {
                store.dispatch(actionCreators.showHotkeys(!store.getState().user.showingHotkeys));
                e.preventDefault();
            }
            return;
        }
        
        if (button.keyDown !== undefined)
            button.keyDown(e);
    }
    private static onKeyUp(e: KeyboardEvent) {
        var button = Hotkeys.bindings[e.which];
        if (button === undefined)
            return;
        
        if (button.keyUp !== undefined)
            button.keyUp(e);
        if (button.keyPress !== undefined)
            button.keyPress(e);
    }
}