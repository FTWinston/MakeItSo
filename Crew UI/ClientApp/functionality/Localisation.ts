import { Localisation } from './Localisation';
import English from '../localisations/English';

export interface Localisation {
    name: string;
    flag: string;
    load: () => TextLocalisation;
}

export const Localisations: Localisation[] = [
    {
        name: 'English',
        flag: 'english.png',
        load: () => English,
    }
];

export interface TextLocalisation {
    common: {
        save: string;
        cancel: string;
        ready: string;
        settings: string;
        help: string;
    }
    errors: {
        connectionLost: string;
    }
    screens: {
        connecting: {
            connecting: string;
        }
        settings: {
            intro: string;
            userName: string;
            userNamePlaceholder: string;
            userNameDescription: string;
            inputMode: string;
            inputModePrompt: string;
            inputModeKeyboard: string;
            inputModeTouch: string;
            inputModeGamepad: string;
        }
    }
}