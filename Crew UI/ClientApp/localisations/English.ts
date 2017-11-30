import { TextLocalisation } from '../functionality/Localisation';

let words: TextLocalisation = {
    common: {
        save: 'Save',
        cancel: 'Cancel',
        ready: 'Ready',
        settings: 'Settings',
        help: 'Help',
    },
    screens: {
        connecting: {
            connecting: 'Connecting to your ship...',
        },
        settings: {
            intro: 'Please fill in the following',
            userName: 'Your name',
            userNamePlaceholder: 'Enter your name...',
            userNameDescription: 'This is only visible to your crewmates.',
            inputMode: 'Input mode',
            inputModePrompt: 'Select how you wish to interact with ship systems. Systems may display differently depending on your selection.',
            inputModeKeyboard: 'Mouse and keyboard',
            inputModeTouch: 'Touchscreen',
            inputModeGamepad: 'Game controller',
        }
    }
};

export default words;