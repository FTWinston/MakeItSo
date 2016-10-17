enum FeatureState {
    Unavailable = 0,
    Disabled,
    Enabled
};

const FeatureDetection = {
    Accelerometer: ('deviceorientation' in window),
    Canvas: ('CanvasRenderingContext2D' in window),
    Gamepad: navigator.getGamepads !== undefined/* || navigator.webkitGetGamepads !== undefined*/,
    Touch: ('ontouchstart' in window || navigator.msMaxTouchPoints),
    Vibration: ('vibrate' in navigator),
    WebSockets: ('WebSocket' in window || 'MozWebSocket' in window),

    CheckRequirements: function(game: GameClient) {
        if (!this.WebSockets) {
            game.showError(language.errorNoWebsockets);
            return false;
        }
        
        if (!this.Canvas) {
            game.showError(language.errorNoCanvas);
            return false;
        }
        return true;
    }
}