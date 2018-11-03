import { store } from '~/index';
import { actionCreators } from '~/store/User';
import { Button } from '~/components/general/buttons/Button';

export type Hotkey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'L' | 'K' | 'M'
            | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
            | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
            | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10'
            | ',' | '.' | '/' | 'enter' | 'space' | 'control' | 'shift' | 'alt' | 'tab';

interface IButtonBinding {
    isButton: true;
    button: Button;
}

interface IActionBinding {
    isButton: false;
    action: () => void;
}

type Binding = IButtonBinding | IActionBinding;

export class Hotkeys {
    private static bindings: { [key: number]:Binding; } = {};
    
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
        this.bindings[keyCode] = {isButton: true, button};
    }

    static unregister(hotkey: Hotkey, button?: Button) {
        let keyCode = this.getKeyCode(hotkey);
            
        if (button !== undefined) {
            const binding = this.bindings[keyCode];
            if (!binding.isButton || binding.button !== button) {
                return;
            }
        }

        delete this.bindings[keyCode];
    }

    static registerAction(hotkey: Hotkey, action: () => void) {
        let keyCode = this.getKeyCode(hotkey);
        this.bindings[keyCode] = { isButton: false, action };
    }

    static initialize() {
        document.onkeydown = Hotkeys.onKeyDown;
        document.onkeyup = Hotkeys.onKeyUp;
    }

    private static onKeyDown(e: KeyboardEvent) {
        const binding = Hotkeys.bindings[e.which];
        if (binding === undefined) {
            if (e.which === 112) {
                store.dispatch(actionCreators.showHotkeys(!store.getState().user.showingHotkeys));
                e.preventDefault();
            }
            return;
        }
        
        if (binding.isButton) {
            const button = binding.button;
            if (button.keyDown !== undefined) {
                button.keyDown(e);
            }
        }
        else {
            binding.action();
        }
    }

    private static onKeyUp(e: KeyboardEvent) {
        const binding = Hotkeys.bindings[e.which];
        if (binding === undefined || !binding.isButton)
            return;
        
        const button = binding.button;

        if (button.keyUp !== undefined)
            button.keyUp(e);
        if (button.keyPress !== undefined)
            button.keyPress(e);
    }
}