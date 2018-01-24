import { TextLocalisation } from '../functionality';

let words: TextLocalisation = {
    common: {
        save: 'Save',
        cancel: 'Cancel',
        ready: 'Ready',
        settings: 'Settings',
        help: 'Help',
    },
    errors: {
        unknown: 'Unable to display information on this error. Sorry.',
        connectionLost: 'The connection to your ship has been lost.\nIf the game is still running, check your network connection then refresh the page.',
    },
    screens: {
        connecting: {
            connecting: 'Connecting to your ship...',
        },
        settings: {
            intro: 'Enter your name, and choose an input mode:',
            userName: 'Your name',
            userNamePlaceholder: 'Enter your name...',
            userNameDescription: 'This is only visible to your crewmates.',
            inputMode: 'Input mode',
            inputModePrompt: 'Some ship systems will display differently depending on your selection.',
            inputModeKeyboard: 'Mouse and keyboard',
            inputModeTouch: 'Touchscreen',
            inputModeGamepad: 'Game controller',
            inputModeDescriptionKeyboard: 'On-screen buttons with keyboard shortcuts',
            inputModeDescriptionTouch: 'Use Multi-touch controls',
            inputModeDescriptionGamepad: 'Use an attached game controller',
        },
        waiting: {
            intro: 'Please wait for all of your crew to join, then click \'Ready\'',
            players: 'Current players:',
        },
        systemSelection: {
            intro: 'Select the ship systems you will control:',
            suggestionPrompt: 'The symbols on the left show suggested system groupings.',
            setupGame: 'Setup game',
            resumeGame: 'Resume game',
        },
        gameSetup: {
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
            shipNamePlaceholder: 'You must name your ship',
            shipNameDescription: 'The name of the ship your crew will operate',
            shipNameRandom: 'Pick a random name for your ship',
            joinAddress: 'Server address',
            joinAddressPlaceholder: 'Enter address',
            joinAddressDescription: 'IP address or URL of the game server to join',
            serverName: 'Server name',
            serverNamePlaceholder: 'Enter a name',
            serverNameDescription: 'The game name to display to other crews',
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
            startGame: 'Start game',

            shipNames: [
                'Achilles',
                'Apollo',
                'Aries',
                'Atlas',
                'Asimov',
                'Bellerephon',
                'Bosephorous',
                'Callisto',
                'Challenger',
                'Charon',
                'Chekov',
                'Clarke',
                'Cochrane',
                'Columbus',
                'Copernicus',
                'Curie',
                'da Vinci',
                'Destiny',
                'Drake',
                'Einstein',
                'Endeavour',
                'Endurance',
                'Enigma',
                'Equinox',
                'Europa',
                'Excalibur',
                'Falchion',
                'Fermi',
                'Fleming',
                'Franklin',
                'Galileo',
                'Ganymede',
                'Hawking',
                'Hera',
                'Io',
                'Korolev',
                'Krakatoa',
                'LaGrange',
                'Lexington',
                'Lionheart',
                'Luna',
                'Magellan',
                'Majestic',
                'Marco Polo',
                'Nautilus',
                'Nightingale',
                'Nobel',
                'Nova',
                'Oberon',
                'Oberth',
                'Odyssey',
                'Olympia',
                'Olympic',
                'Pasteur',
                'Pegasus',
                'Phoenix',
                'Picasso',
                'Planck',
                'Prometheus',
                'Proxima',
                'Reliant',
                'Renegade',
                'Rigel',
                'Rubicon',
                'Sentinel',
                'Sovereign',
                'Soyuz',
                'Tempest',
                'Titan',
                'Tolstoy',
                'Triton',
                'Ulysses',
                'Valiant',
                'Vesta',
                'Yeager',
                'Yellowstone',
                'Yosemite',
                'Yukon',
                'Zodiac',
            ],
        },
        active: {
            pause: 'Pause',
        },
        error: {
            heading: 'An error has occurred',
        },
    },
    systemNames: {
        helm: 'Helm',
        warp: 'Warp',
        weapons: 'Weapons',
        sensors: 'Sensors',
        power: 'Power',
        damage: 'Damage Control',
        view: 'Viewscreen',
        comms: 'Communications',
    },
    systems: {
        helm: {
            heading: 'Heading:',
            roll: 'Roll:',
            speed: 'Speed:',
            mark: 'mk',
            metresPerSecond: 'm/s',
            rotation: 'Rotation',
            strafe: 'Lateral / Vertical',
            forwardBackward: 'Forward / Backward',
            rotateStop: 'Stop all rotation',
            rotateUp: 'Rotate upward',
            rotateDown: 'Rotate downward',
            rotateLeft: 'Rotate left',
            rotateRight: 'Rotate right',
            strafeStop: 'Stop lateral & vertical movement',
            strafeUp: 'Move up',
            strafeDown: 'Move down',
            strafeLeft: 'Move left',
            strafeRight: 'move right',
            moveBackward: 'Back',
            speedStop: 'Stop',
            moveForward: 'Ahead',
        },
        warp: {
            newPath: 'Plot new path',
            deletePath: 'Delete path',
            startJump: 'Prepare to jump',
            unknownPosition: 'Unknown',
            jump: 'Jump',
            from: 'From',
            to: 'to',
            power: 'Power level',
            powerDescription: 'Higher power allows longer jumps, but requires longer to charge',
            eta: 'ETA:',
            seconds: 'seconds',
            startPos: 'Start',
            startPosDescription: 'Location this jump will start from',
            projectionYaw: 'Yaw',
            projectionYawDescription: 'Yaw of jump direction',
            projectionPitch: 'Pitch',
            projectionPitchDescription: 'Pitch of jump direction',
            calculate: 'Calculate jump',
        },
        weapons: {

        },
        sensors: {

        },
        power: {

        },
        damage: {

        },
        comms: {

        },
        view: {

        },
    },
};

export default words;