enum FeatureState {
    Unavailable = 0,
    Disabled,
    Enabled
};

const FeatureDetection = {
    Accelerometer: ('deviceorientation' in window),
    Canvas: ('CanvasRenderingContext2D' in window),
    Gamepad: navigator.getGamepads !== undefined || navigator.webkitGetGamepads !== undefined,
    Touch: ('ontouchstart' in window || navigator.msMaxTouchPoints),
    Vibration: ('vibrate' in navigator),
    WebSockets: ('WebSocket' in window || 'MozWebSocket' in window),

    CheckRequirements: function(game: GameClient) {
        if (!this.WebSockets) {
            game.showError('Your web browser doesn\'t support Web Sockets. Make It So uses these to communicate with the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.');
            return false;
        }
        
        if (!this.Canvas) {
            game.showError('Your web browser doesn\'t support Canvas. Make It So uses this to draw various elements of the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.');
            return false;
        }
        return true;
    }
}