﻿const language = {
    systemNames: ['Helm', 'Viewscreen', 'Comms', 'Sensors', 'Weapons', 'Shields', 'Damage Control', 'Power', 'Deflector'],
    errorConnectionLost: 'The connection to your ship has been lost.\nIf the game is still running, check your network connection.',
    errorShipFull: 'This ship is full: there is no room for you to join.',
    errorGameStarted: 'This game has already started: wait for the crew to pause or end the game, then try again.',
    errorUnrecognisedCommand: 'Unrecognised command from server: ',
    errorWrongSystem: 'Received command for system #@num@, which was not selected by this client: ',
    errorSystemDidntHandleMessage: '@system@ failed to handle "@cmd@" command from server, with data @data@',
    errorNoWebsockets: 'Your web browser doesn\'t support Web Sockets. Make It So uses these to communicate with the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.',
    errorNoCanvas: 'Your web browser doesn\'t support Canvas. Make It So uses this to draw various elements of the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.',
    errorParameterNotNumeric: 'Parameter was not numeric',
    errorParameterNumber: 'Expected @num@ parameters',
    
    messageConnecting: 'Connecting...',
    messageWait: 'Please wait...',
    messageConfirmLeave: 'The game is still active.',
    messageGameEnded: 'The game has ended.',
    messageGameEndedUser:  'User @name@ ended the game.',
    messageRefreshPage: 'Refresh the page to continue.',

    menuGoBack: 'go back',

    systemListPrompt: 'Select systems to control:',
    systemListSetupGame: 'setup game',
    systemListResumeGame: 'resume game',
    systemListEndGame: 'end game',
    systemListInputMode: 'helm input mode:',
    inputModes: ['Keyboard', 'Touchscreen', 'Accelerometer', 'Gamepad'],
    inputModeDescriptions: [
        'On-screen buttons with keyboard shortcuts',
        'Touchscreen controls',
        'Accelerometer steering, with touchscreen controls',
        'Operate the helm using an attached game controller'
    ],
    inputModePrompt: 'Select the control scheme you wish to use to control the helm. Other systems can be controlled by any combination of on-screen buttons, touch controls, keyboard shortcuts and gamepad input, but the helm will display different controls depending on the control scheme you select.',

    gameSetupIntro: 'This screen should let you set up your ship and start a new game, browse servers, etc',
    gameSetupServerType: 'Do you wish to play with just your own crew, or with others?',
    gameSetupServerTypeLocal: 'Play a solo-crew game',
    gameSetupServerTypeLocalDescription: 'Play against the computer, with no other human crews.',
    gameSetupServerTypeRemote: 'Join a multi-crew game',
    gameSetupServerTypeRemoteDescription: 'Join a game being hosted remotely.',
    gameSetupServerTypeHost: 'Host a multi-crew game',
    gameSetupServerTypeHostDescription: 'Host a game which other human crews can connect to.',
    gameSetupGameMode: 'Select the game mode you wish to play:',
    gameSetupGameModeExploration: 'Exploration',
    gameSetupGameModeExplorationDescription: 'Carry out missions, explore the galaxy, and boldly go where no one has gone before.',
    gameSetupGameModeEndurance: 'Endurance',
    gameSetupGameModeEnduranceDescription: 'Survive for as long as possible against endless waves of computer-controlled ships.',
    gameSetupGameModeArena: 'Arena',
    gameSetupGameModeArenaDescription: 'Human-crewed ships battle for supremacy in a single star system.',
    gameSetupStartGame: 'start game',

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
    viewscreenNoTarget: 'none',

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
}