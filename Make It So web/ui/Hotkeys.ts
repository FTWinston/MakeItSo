const Hotkeys = {
    bindings: {},
    showHotkeys: false,
    register(hotkey, button) {
        var keyCode = typeof hotkey === 'string' ? hotkey.charCodeAt(0) : hotkey;

        if (this.bindings.hasOwnProperty(keyCode))
            this.bindings[keyCode].push(button);
        else
            this.bindings[keyCode] = [button];
    },
	unregister(hotkey, button) {
		var keyCode = typeof hotkey === 'string' ? hotkey.charCodeAt(0) : hotkey;
		
		var keys = this.bindings[keyCode];
		var pos = keys.indexOf(button);
		if (pos != -1)
			keys.splice(pos, 1);
	},
	initialize() {
		document.onkeydown = this.onKeyDown;
		document.onkeyup = this.onKeyUp;
	},
	onKeyDown(e) {
		var presses = Hotkeys.bindings[e.which];
		if (presses === undefined) {
			if (e.which == 112) {
				Hotkeys.showHotkeys = !Hotkeys.showHotkeys;
				gameClient.showHotkeys(Hotkeys.showHotkeys);
				
				e.preventDefault();
			}
			return;
		}
		
		for (var i=0; i<presses.length; i++) {
			var button = presses[i];
			
			if (button.isVisible())
			{
				if (button.keyDown != undefined)
					button.keyDown(e);
				return;
			}
		}
	},
	onKeyUp(e){
		var presses = Hotkeys.bindings[e.which];
		if (presses === undefined)
			return;
		
		for (var i=0; i<presses.length; i++) {
			var button = presses[i];
			
			if (button.isVisible())
			{
				if (button.keyUp != undefined)
					button.keyUp(e);
				if (button.keyPress != undefined)
					button.keyPress(e);
				return;
			}
		}
	}
};

Hotkeys.initialize();