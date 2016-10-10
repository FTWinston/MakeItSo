enum FeatureState {
    Unavailable = 0,
    Disabled,
    Enabled
};

const FeatureDetection = {
    Vibration: ('vibrate' in navigator),
    Touch: ('ontouchstart' in window || navigator.msMaxTouchPoints),
    WebSockets: ('WebSocket' in window || 'MozWebSocket' in window),
    Canvas: ('CanvasRenderingContext2D' in window),

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