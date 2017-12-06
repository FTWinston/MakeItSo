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
        unknown: string;
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
            inputModeDescriptionKeyboard: string;
            inputModeDescriptionTouch: string;
            inputModeDescriptionGamepad: string;
        },
        waiting: {
            intro: string;
            players: string;
        },
        systemSelection: {
            intro: string,
            suggestionPrompt: string,
            setupGame: string,
            resumeGame: string,
        },
        gameSetup: {
            intro: string;
            gameType: string;
            gameTypePrompt: string;
            gameTypeLocal: string;
            gameTypeLocalDescription: string;
            gameTypeJoin: string;
            gameTypeJoinDescription: string;
            gameTypeHost: string;
            gameTypeHostDescription: string;
            shipName: string;
            shipNamePlaceholder: string
            shipNameDescription: string;
            joinAddress: string;
            joinAddressPlaceholder: string;
            joinAddressDescription: string;
            serverName: string;
            serverNamePlaceholder: string
            serverNameDescription: string;
            gameMode: string;
            gameModePrompt: string;
            gameModeExploration: string;
            gameModeSurvival: string;
            gameModeArena: string;
            gameModeExplorationDescription: string;
            gameModeSurvivalDescription: string;
            gameModeArenaDescription: string;
            difficulty: string;
            difficultyPrompt: string;
            startGame: string;
            shipNames: string[];
        },
        error: {
            heading: string;
        },
    },
    systemNames: {
        helm: string,
        warp: string,
        weapons: string,
        sensors: string,
        power: string,
        damage: string,
        comms: string,
        view: string,
    },
}