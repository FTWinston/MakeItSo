import { Localisation } from './Localisation';
import English from '~/localisations/English';

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
        optionEnable: string;
        optionDisable: string;
        noOptions: string;
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
            shipNamePlaceholder: string;
            shipNameDescription: string;
            shipNameRandom: string;
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
        active: {
            pause: string;
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
        shields: string,
    },
    systemHelp: {
        helm: string,
        warp: string,
        weapons: string,
        sensors: string,
        power: string,
        damage: string,
        comms: string,
        view: string,
    },
    systems: {
        helm: {
            heading: string;
            roll: string;
            speed: string;
            mark: string;
            elevation: string;
            metresPerSecond: string;
            rotation: string;
            strafe: string;
            forwardBackward: string;
            rotateStop: string;
            rotateUp: string;
            rotateDown: string;
            rotateLeft: string;
            rotateRight: string;
            strafeStop: string;
            strafeUp: string;
            strafeDown: string;
            strafeLeft: string;
            strafeRight: string;
            moveBackward: string;
            speedStop: string;
            moveForward: string;
        },
        warp: {
            newPath: string;
            deletePath: string;
            startJump: string;
            unknownPosition: string;
            jump: string;
            from: string;
            to: string;
            power: string;
            powerDescription: string;
            eta: string;
            readyTime: string;
            readyToJump: string;
            outOfRange: string;
            charging: string;
            jumpInProgress: string;
            seconds: string;
            startPos: string;
            startPosDescription: string;
            projectionYaw: string;
            projectionYawDescription: string;
            projectionPitch: string;
            projectionPitchDescription: string;
            calculate: string;
            calculating: string;
            stopCalculating: string;
            editPath: string;
            keepPath: string;
            calculationFailed: string;
            preparingStart: string;
            readyStart: string;
            jumpDestStart: string;
            autoRotate: string;
        },
        weapons: {

        },
        sensors: {

        },
        power: {
            pickCards: string;
            discardCard: string;
            discardChoice: string;
            handLabel: string;
            choiceLabel: string;
            backToHand: string;

            cards: {
                boostHelm: {
                    name: string;
                    desc: string;
                },
                boostWarp: {
                    name: string;
                    desc: string;
                },
                boostWeapons: {
                    name: string;
                    desc: string;
                },
                boostSensors: {
                    name: string;
                    desc: string;
                },
                boostShields: {
                    name: string;
                    desc: string;
                },
                boostDamageControl: {
                    name: string;
                    desc: string;
                },
                boostComms: {
                    name: string;
                    desc: string;
                },
                boostSelectable: {
                    name: string;
                    desc: string;
                },
                overloadHelm: {
                    name: string;
                    desc: string;
                },
                overloadWarp: {
                    name: string;
                    desc: string;
                },
                overloadWeapons: {
                    name: string;
                    desc: string;
                },
                overloadSensors: {
                    name: string;
                    desc: string;
                },
                overloadShields: {
                    name: string;
                    desc: string;
                },
                overloadDamageControl: {
                    name: string;
                    desc: string;
                },
                overloadComms: {
                    name: string;
                    desc: string;
                },
                overloadSelectable: {
                    name: string;
                    desc: string;
                },
                rerouteHelm: {
                    name: string;
                    desc: string;
                },
                rerouteWarp: {
                    name: string;
                    desc: string;
                },
                rerouteWeapons: {
                    name: string;
                    desc: string;
                },
                rerouteSensors: {
                    name: string;
                    desc: string;
                },
                rerouteShields: {
                    name: string;
                    desc: string;
                },
                rerouteDamageControl: {
                    name: string;
                    desc: string;
                },
                rerouteComms: {
                    name: string;
                    desc: string;
                },
                bypassSafeties: {
                    name: string;
                    desc: string;
                },
                focusPower: {
                    name: string;
                    desc: string;
                },
                recalibrate: {
                    name: string;
                    desc: string;
                },
            }
        },
        damage: {
            roll: string;
            discard: string;
            comboNames: {
                aces: string;
                twos: string;
                threes: string;
                fours: string;
                fives: string;
                sixes: string;
                threeOfAKind: string;
                fourOfAKind: string;
                fullHouse: string;
                smallStraight: string;
                largeStraight: string;
                yahtzee: string;
                chance: string;
            }
            comboDescriptions: {
                aces: string;
                twos: string;
                threes: string;
                fours: string;
                fives: string;
                sixes: string;
                threeOfAKind: string;
                fourOfAKind: string;
                fullHouse: string;
                smallStraight: string;
                largeStraight: string;
                yahtzee: string;
                chance: string;
            }
        },
        comms: {

        },
        view: {

        },
    },
}