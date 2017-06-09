﻿const language = {
    common: {
        save: 'Save',
        cancel: 'Cancel',
        ready: 'Ready',
        settings: 'Settings',
        help: 'Help',
    },
    errors: {
        connectionLost: 'The connection to your ship has been lost.\nIf the game is still running, check your network connection.',
        /*
        shipFull: 'This ship is full: there is no room for you to join.',
        */
        gameStarted: 'This game has already started: wait for the crew to pause or end the game.',
        unrecognisedCommand: 'Unrecognised command from server: @cmd@',
        wrongSystem: 'Received command for @system@, which was not selected by this client: @cmd@',
        systemDidntHandleMessage: '@system@ failed to handle command from server: @cmd@',
        noWebsockets: 'Your web browser doesn\'t support Web Sockets. Make It So uses these to communicate with the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.',
        noCanvas: 'Your web browser doesn\'t support Canvas. Make It So uses this to draw various elements of the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.',
        /*
        parameterNotNumeric: 'Parameter was not numeric',
        parameterNumber: 'Expected @num@ parameters',
        */
    },
    screens: {
        settings: {
            intro: 'Set up how you will interact with the game, and enter your name.',
            inputMode: 'Input mode',
            inputModePrompt: 'Select how you wish to interact with the game. Ship systems will display differently depending on the input mode you select.',
            inputModeKeyboard: 'Keyboard',
            inputModeTouchscreen: 'Touchscreen',
            inputModeGamepad: 'Gamepad',
            inputModeDescriptionKeyboard: 'On-screen buttons with keyboard shortcuts',
            inputModeDescriptionTouchscreen: 'Use Multi-touch controls',
            inputModeDescriptionGamepad: 'Use an attached game controller',
            userName: 'User name',
            userNamePlaceholder: 'Enter your name...',
            userNameDescription: 'Enter the name you wish to display to your crewmates',
        },
        roleSelection: {
            roleHeading: 'Select your role',
            systemHeading: 'Select your systems',
            rolePrompt: 'Each crew member should select a different role.\nWait for everyone to join before choosing, as the roles change depending on the size of your crew.\nEach role consists of multiple systems. Experienced crews can switch to selecting systems directly.',
            systemPrompt: 'Multiple crew members can select the same system, but only one can view it at a time.\nEach system must be selected by at least one crew member.\nNovice crews can switch to selecting pre-set roles consisting of multiple systems.',
            showSystems: 'Select systems (advanced)',
            showRoles: 'Select roles (simple)',
            resume: 'Resume game',
            quit: 'Quit game',
            setup: 'Setup game',
            setupInUse: 'Another crew member is setting up the game',
            systemInUse: 'Another crew member has selected this system',
        },
        setup: {
            intro: 'Create or join a game',
            gameType: 'Game type',
            gameTypePrompt: 'Will you play with just your own crew, or with others?',
            gameTypeLocal: 'Single crew',
            gameTypeLocalDescription: 'Play against the computer, with only your crew',
            gameTypeJoin: 'Join game',
            gameTypeJoinDescription: 'Join a multi-crew game hosted elsewhere',
            gameTypeHost: 'Host game',
            gameTypeHostDescription: 'Host a multi-crew game that others can join',
            shipName: 'Ship name',
            shipNameDescription: 'The name of the ship your crew will operate',
            joinAddress: 'Server address',
            joinAddressDescription: 'IP address or URL of the game server to join',
            serverName: 'Server name',
            serverNameDescription: 'The name of the game to display to other crews',
            gameMode: 'Game mode',
            gameModePrompt: 'Select the kind of game you want to play:',
            gameModeExploration: 'Exploration',
            gameModeSurvival: 'Survival',
            gameModeArena: 'Arena',
            gameModeExplorationDescription: 'Carry out missions, explore the galaxy, and boldly go where no one has gone before.',
            gameModeSurvivalDescription: 'Survive for as long as possible against endless waves of computer-controlled ships.',
            gameModeArenaDescription: 'Human-crewed ships battle for supremacy in a single star system.',
            difficulty: 'Difficulty',
            difficultyPrompt: 'Higher values give more, tougher AI opponents.',
            start: 'Start game',

            shipNames: [
                'Excalibur',
                'Bosephorous',
                'Enigma',
                'Praetor',
            ],
        },
        active: {
            pause: 'Pause',
        },
    },

    messages: {
        confirmLeave: 'The game is still active.',
        connecting: 'Connecting...',
        wait: 'Please wait...',
        gameEnded: 'The game has ended.',
        gameEndedUser:  '@name@ ended the game.',
        refreshPage: 'Refresh the page to continue.',
    },

    roles: {
        none: 'None selected',
        solo: 'Solo',
        pilot: 'Pilot',
        operations: 'Operations',
        tactical: 'Tactical',
        engineering: 'Engineer',
    },

    systems: {
        helm: {
            name: 'Helm',
            help: 'TO-DO: fill in this help text',
        },
        warp: {
            name: 'Warp',
            help: 'TO-DO: fill in this help text',
        },
        weapons: {
            name: 'Weapons',
            help: 'TO-DO: fill in this help text',
        },
        sensors: {
            name: 'Sensors',
            help: 'TO-DO: fill in this help text',
        },
        power: {
            name: 'Power',
            help: 'TO-DO: fill in this help text',
        },
        damage: {
            name: 'Damage Control',
            help: 'TO-DO: fill in this help text',
        },
        view: {
            name: 'Viewscreen',
            help: 'TO-DO: fill in this help text',
        },
        comms: {
            name: 'Communications',
            help: 'TO-DO: fill in this help text',
        },
    },
/*
    systemContainerPause: 'pause',

    directionForward: 'forward',
    directionLeft: 'port',
    directionRight: 'starboard',
    directionBackward: 'aft',
    directionUp: 'dorsal',
    directionDown: 'ventral',

    viewscreenPan: 'Pan',
    viewscreenZoom: 'Zoom',    
    viewscreenDirection: 'direction',
    viewscreenChaseMode: 'chase mode',
    viewscreenCommsChannel: 'comms channel',
    viewscreenTarget: 'target',

    helmRotation: 'rotation',
    helmRotateUp: 'up',
    helmRotateDown: 'down',
    helmRotateLeft: 'left',
    helmRotateRight: 'right',
    helmRotateStop: 'stop',
    helmSpeedForward: 'forward',
    helmSpeedBackward: 'backward',
    helmSpeedStop: 'stop',
    helmTranslation: 'translation',
    helmTranslateUp: 'up',
    helmTranslateDown: 'down',
    helmTranslateLeft: 'left',
    helmTranslateRight: 'right',
    helmWarpFactor: 'warp factor',
    helmWarpIncrease: 'increase',
    helmWarpDecrease: 'decrease',
    helmWarpStop: 'stop',
    helmForwardSpeedOutput: 'Forward speed:',
    helmSidewaysSpeedOutput: 'Lateral speed:',
    helmVerticalSpeedOutput: 'Vertical speed:',
    helmWarpFactorOutput: 'Warp factor:',
    helmPitchOutput: 'Pitch:',
    helmYawOutput: 'Yaw:',
    helmRollOutput: 'Roll:',

    shieldsToggleOn: 'Enable shields',
    shieldsToggleOff: 'Disable shields',
    shieldsEnabled: 'Shields are enabled',
    shieldsDisabled: 'Shields are disabled',
    shieldsRegenFocus: 'Regeneration focus:',
    shieldsCharge: 'Charge',

    powerLevels: 'System power levels:',
    powerAux: 'AUX power',
    powerCardSelect: 'Select a card to add to your library:',
    powerCardWait: 'Please wait for new cards to become available.',
    powerConfirmChoose: 'Add to library',
    powerConfirmUse: 'Activate card',
    powerCards: [
        { name: 'Card 1', desc: 'Does some stuff', rarity: 1, cost: 1 },
        { name: 'Card 2', desc: 'Does more stuff', rarity: 1, cost: 1 },
        { name: 'Card 3', desc: 'Does even more stuff', rarity: 2, cost: 1 },
        { name: 'Card 4', desc: 'Does some things', rarity: 1, cost: 2 },
        { name: 'Card 5', desc: 'Does more things', rarity: 2, cost: 2 },
        { name: 'Card 6', desc: 'Does even more things', rarity: 3, cost: 3 },
        { name: 'Card 7', desc: 'Doesn\'t do very much', rarity: 1, cost: 4 },
    ],
    powerSystems: ['Engines', 'Sensors', 'Weapons', 'Shields', 'Repairs', 'Deflector'],

    weaponRoll: 'Roll',
    weaponReroll: 'Re-roll',
    weaponDiscardRoll: 'Discard',
    weaponFire: 'Fire',
*/
}