import { TextLocalisation } from '~/functionality';

let words: TextLocalisation = {
    common: {
        save: 'Save',
        cancel: 'Cancel',
        goBack: 'Go back',
        ready: 'Ready',
        settings: 'Settings',
        help: 'Help',
        optionEnable: 'Enabled',
        optionDisable: 'Disabled',
        noOptions: 'This system has no configurable options',
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
        shields: 'Shields',
    },
    systemHelp: {
        helm: 'help help help',
        warp: 'Warp help',
        weapons: 'help help help',
        sensors: 'help help help',
        power: 'help help help',
        damage: 'help help help',
        view: 'help help help',
        comms: 'help help help',
    },
    systems: {
        helm: {
            heading: 'Heading:',
            roll: 'Roll:',
            speed: 'Speed:',
            mark: 'mk',
            elevation: 'Elevation',
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
            startJump: 'Prepare to jump',
            jump: 'Jump',
            panUp: 'Pan up',
            panDown: 'Pan down',
            plotJumpFrom: 'Ready to plot jump from',
            jumpingTo: 'Jupming to',
            plottingJumpFrom: 'Plotting jump from',
            to: 'to',
            charging: 'Jump charge progress',
            shipPosition: 'Current ship position',
            inRange: 'In range of the calculated start point.',
            outOfRange: 'Too far from the calculated start point. Cannot jump!',
            jumpValid: 'Jump calculations are valid.',
            jumpInvalid: 'Error in jump calculations. Jump destination is off-target!',
            eta: 'Arriving at destination in',
            seconds: 's',
        },
        weapons: {
            difficultyPrefix: 'Difficulty:',
            difficulty: {
                easy: 'Easy',
                medium: 'Medium',
                hard: 'Hard',
            },
            facingPrefix: 'Easiest when facing:',
            face: {
                none: 'N/A',
                front: 'Front',
                rear: 'Rear',
                top: 'Top',
                bottom: 'Bottom',
                left: 'Left',
                right: 'Right',
            },
            solutions: {
                misc: {
                    name: 'General',
                    desc: 'Don\'t focus on any specific point. Just try and hit the target.',
                },
                engines: {
                    name: 'Target engines',
                    desc: 'Limit the target\'s ability to manoeuvre.',
                },
                warp: {
                    name: 'Target warp drive',
                    desc: 'Increase the difficulty of jumping away.',
                },
                weapons: {
                    name: 'Target weapons',
                    desc: 'Reduce the target\'s ability to shoot back.',
                },
                sensors: {
                    name: 'Target sensors',
                    desc: 'Limit the target\'s situational awareness.',
                },
                power: {
                    name: 'Target power core',
                    desc: 'Reduce the target\'s available power.',
                },
                damage: {
                    name: 'Target damage control',
                    desc: 'Prevent the target from repairing damage as easily.',
                },
                comms: {
                    name: 'Target communications',
                    desc: 'Make it harder for the target to call for help.',
                },
                miscVulnerability: {
                    name: 'Vulnerability: general',
                    desc: 'Inflict more significant damage.',
                },
                engineVulnerability: {
                    name: 'Vulnerability: engines',
                    desc: 'Inflict more significant damage.',
                },
                warpVulnerability: {
                    name: 'Vulnerability: warp drive',
                    desc: 'Inflict more significant damage.',
                },
                weaponsVulnerability: {
                    name: 'Vulnerability: weapons',
                    desc: 'Inflict more significant damage.',
                },
                sensorsVulnerability: {
                    name: 'Vulnerability: sensors',
                    desc: 'Inflict more significant damage.',
                },
                powerVulnerability: {
                    name: 'Vulnerability: power core',
                    desc: 'Inflict more significant damage.',
                },
                damageVulnerability: {
                    name: 'Vulnerability: damage control',
                    desc: 'Inflict more significant damage.',
                },
            }
        },
        sensors: {
            targetTypes: {
                star: 'Star',
                planet: 'Planet',
                station: 'Station',
                ship: 'Ship',
                misc: 'Misc',
            }
        },
        power: {
            pickCards: 'Pick cards',
            discardCard: 'Discard card',
            discardChoice: 'Discard choice',
            handLabel: 'Your cards:',
            choiceLabel: 'Choose a card:',
            backToHand: 'Go back',
            
            cards: {
                boostHelm: {
                    name: 'Boost Helm',
                    desc: 'Increase power of helm system by 25% for 20 seconds.',
                },
                boostWarp: {
                    name: 'Boost Warp',
                    desc: 'Increase power of warp system by 25% for 20 seconds.',
                },
                boostWeapons: {
                    name: 'Boost Weapons',
                    desc: 'Increase power of weapons system by 25% for 20 seconds.',
                },
                boostSensors: {
                    name: 'Boost Sensors',
                    desc: 'Increase power of sensors system by 25% for 20 seconds.',
                },
                boostShields: {
                    name: 'Boost Shields',
                    desc: 'Increase power of shields system by 25% for 20 seconds.',
                },
                boostDamageControl: {
                    name: 'Boost Damage Control',
                    desc: 'Increase power of damage control system by 25% for 20 seconds.',
                },
                boostComms: {
                    name: 'Boost Communications',
                    desc: 'Increase power of communications system by 25% for 20 seconds.',
                },
                boostSelectable: {
                    name: 'Boost Any System',
                    desc: 'Increase power of selected system by 25% for 15 seconds.',
                },
                overloadHelm: {
                    name: 'Overload Helm',
                    desc: 'Increase power of helm system by 50% for 10 seconds, then damage it.',
                },
                overloadWarp: {
                    name: 'Overload Warp',
                    desc: 'Increase power of warp system by 50% for 10 seconds, then damage it.',
                },
                overloadWeapons: {
                    name: 'Overload Weapons',
                    desc: 'Increase power of weapons system by 50% for 10 seconds, then damage it.',
                },
                overloadSensors: {
                    name: 'Overload Sensors',
                    desc: 'Increase power of sensors system by 50% for 10 seconds, then damage it.',
                },
                overloadShields: {
                    name: 'Overload Shields',
                    desc: 'Increase power of shields system by 50% for 10 seconds, then damage it.',
                },
                overloadDamageControl: {
                    name: 'Overload Damage Control',
                    desc: 'Increase power of damage control system by 50% for 10 seconds, then damage it.',
                },
                overloadComms: {
                    name: 'Overload Communications',
                    desc: 'Increase power of communications system by 50% for 10 seconds, then damage it.',
                },
                overloadSelectable: {
                    name: 'Overload Any System',
                    desc: 'Increase power of selected system by 50% for 10 seconds, then damage it.',
                },
                rerouteHelm: {
                    name: 'Reroute Helm',
                    desc: 'Reduce power of helm system by 100% for 10 seconds, adding power to target system.',
                },
                rerouteWarp: {
                    name: 'Reroute Warp',
                    desc: 'Reduce power of warp system by 100% for 10 seconds, adding power to target system.',
                },
                rerouteWeapons: {
                    name: 'Reroute Weapons',
                    desc: 'Reduce power of weapons system by 100% for 10 seconds, adding power to target system.',
                },
                rerouteSensors: {
                    name: 'Reroute Sensors',
                    desc: 'Reduce power of sensors system by 100% for 10 seconds, adding power to target system.',
                },
                rerouteShields: {
                    name: 'Reroute Shields',
                    desc: 'Reduce power of shields system by 100% for 10 seconds, adding power to target system.',
                },
                rerouteDamageControl: {
                    name: 'Reroute Damage Control',
                    desc: 'Reduce power of damage control system by 100% for 10 seconds, adding power to target system.',
                },
                rerouteComms: {
                    name: 'Reroute Communications',
                    desc: 'Reduce power of communications system by 100% for 10 seconds, adding power to target system.',
                },
                bypassSafeties: {
                    name: 'Bypass Safeties',
                    desc: 'Increase power of target system by 75% for 15 seconds, and deal damage to every other system.',
                },
                focusPower: {
                    name: 'Focus Power',
                    desc: 'Reduce power of all non-target systems by 25 for 10 seconds, adding removed power to target system.',
                },
                recalibrate: {
                    name: 'Recalibrate',
                    desc: 'Remove all ongoing effects from target system, resetting its power to 100%.',
                },
            }
        },
        damage: {
            roll: 'Roll',
            discard: 'Discard',

            
            comboNames: {
                aces: 'Aces',
                twos: 'Twos',
                threes: 'Threes',
                fours: 'Fours',
                fives: 'Fives',
                sixes: 'Sixes',
                threeOfAKind: 'Three of a Kind',
                fourOfAKind: 'Four of a Kind',
                fullHouse: 'Full House',
                smallStraight: 'Small Straight',
                largeStraight: 'Large Straight',
                yahtzee: 'Yahtzee',
                chance: 'Chance',
            },
            comboDescriptions: {
                aces: 'The sum of dice showing 1',
                twos: 'The sum of dice showing 2',
                threes: 'The sum of dice showing 3',
                fours: 'The sum of dice showing 4',
                fives: 'The sum of dice showing 5',
                sixes: 'The sum of dice showing 6',
                threeOfAKind: 'Three dice the same',
                fourOfAKind: 'Four dice the same',
                fullHouse: 'Three of one number and two of another',
                smallStraight: 'Four sequential numbers',
                largeStraight: 'Five sequential numbers',
                yahtzee: 'All five dice the same',
                chance: 'Any combination of dice',
            }
        },
        comms: {

        },
        view: {

        },
    },
};

export default words;