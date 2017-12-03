/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(6);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = vendor_a65b3acf96981fd3289a;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functionality_Localisation__ = __webpack_require__(30);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    setUserName: function (name) {
        localStorage.setItem('userName', name);
        return { type: 'USER_NAME', name: name };
    },
    setInputMode: function (inputMode) {
        localStorage.setItem('inputMode', inputMode.toString());
        return { type: 'INPUT_MODE', inputMode: inputMode };
    },
    setLocalisation: function (localisation) { return ({ type: 'LOCALISATION', localisation: localisation }); },
    showHotkeys: function (show) { return ({ type: 'SHOW_HOTKEYS', show: show }); },
    setScreenSize: function (width, height) { return ({ type: 'SET_SCREEN_SIZE', width: width, height: height }); },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var savedInputMode = localStorage.getItem('inputMode');
var unloadedState = {
    userName: localStorage.getItem('userName') || '',
    inputMode: savedInputMode === null ? 1 /* Touchscreen */ : parseInt(savedInputMode),
    localisation: __WEBPACK_IMPORTED_MODULE_0__functionality_Localisation__["a" /* Localisations */][0],
    text: __WEBPACK_IMPORTED_MODULE_0__functionality_Localisation__["a" /* Localisations */][0].load(),
    showHotkeys: false,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
};
var reducer = function (state, rawAction) {
    var action = rawAction;
    switch (action.type) {
        case 'USER_NAME':
            return __assign({}, state, { userName: action.name });
        case 'INPUT_MODE':
            return __assign({}, state, { inputMode: action.inputMode });
        case 'LOCALISATION':
            return __assign({}, state, { localisation: action.localisation, text: action.localisation.load() });
        case 'SHOW_HOTKEYS':
            return __assign({}, state, { showHotkeys: action.show });
        case 'SET_SCREEN_SIZE':
            return __assign({}, state, { screenWidth: action.width, screenHeight: action.height });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(140);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connection", function() { return connection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configureStore__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_ScreenManager__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__functionality_Connection__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__functionality_Hotkeys__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Client_scss__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Client_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__Client_scss__);










var history = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_history__["createBrowserHistory"])();
var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__configureStore__["a" /* default */])(history);
var connection = new __WEBPACK_IMPORTED_MODULE_7__functionality_Connection__["a" /* Connection */]('ws://' + location.host + '/ws');
__WEBPACK_IMPORTED_MODULE_8__functionality_Hotkeys__["a" /* Hotkeys */].initialize();
function renderApp() {
    __WEBPACK_IMPORTED_MODULE_1_react_dom__["render"](__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2_react_hot_loader__["AppContainer"], null,
        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_react_redux__["Provider"], { store: store },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__components_ScreenManager__["a" /* default */], null))), document.getElementById('client-root'));
}
renderApp();


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functionality_Hotkeys__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buttons_scss__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buttons_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__buttons_scss__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.componentDidMount = function () {
        if (this.props.hotkey != null)
            __WEBPACK_IMPORTED_MODULE_1__functionality_Hotkeys__["a" /* Hotkeys */].register(this.props.hotkey, this);
    };
    Button.prototype.componentWillUnmount = function () {
        if (this.props.hotkey != null)
            __WEBPACK_IMPORTED_MODULE_1__functionality_Hotkeys__["a" /* Hotkeys */].unregister(this.props.hotkey, this);
    };
    Button.prototype.determineClasses = function () {
        var classes = 'button';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }
        if (this.props.fullBorder)
            classes += ' fullBorder';
        switch (this.props.color) {
            case 0 /* Primary */:
                classes += ' button--primary';
                break;
            case 1 /* Secondary */:
                classes += ' button--secondary';
                break;
            case 2 /* Tertiary */:
                classes += ' button--tertiary';
                break;
            case 3 /* Quaternary */:
                classes += ' button--quaternary';
                break;
            case 4 /* Quandry */:
                classes += ' button--quandry';
                break;
        }
        return classes;
    };
    Button.prototype.render = function () {
        var subtext = this.props.subtext === undefined ? undefined : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "button__subtext" }, this.props.subtext);
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: this.determineClasses(), disabled: this.props.disabled, onMouseDown: this.props.disabled ? undefined : this.props.mouseDown, onMouseUp: this.props.disabled ? undefined : this.props.mouseUp, onMouseLeave: this.props.disabled ? undefined : this.props.mouseLeave, onClick: this.props.disabled ? undefined : this.props.mouseClick, "data-hotkey": this.props.hotkey, type: this.props.buttonType, title: this.props.title },
            this.props.text,
            subtext);
    };
    Button.prototype.keyDown = function (e) {
        if (this.props.mouseDown !== undefined)
            this.props.mouseDown(e);
    };
    Button.prototype.keyUp = function (e) {
        if (this.props.mouseUp !== undefined)
            this.props.mouseUp(e);
    };
    Button.prototype.keyPress = function (e) {
        if (this.props.mouseClick !== undefined)
            this.props.mouseClick(e);
    };
    Button.defaultProps = {
        buttonType: 'button',
        text: '',
        fullBorder: false,
    };
    return Button;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return reducer; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ClientScreen;
(function (ClientScreen) {
    ClientScreen[ClientScreen["Connecting"] = 0] = "Connecting";
    ClientScreen[ClientScreen["UserSettings"] = 1] = "UserSettings";
    ClientScreen[ClientScreen["WaitingForPlayers"] = 2] = "WaitingForPlayers";
    ClientScreen[ClientScreen["SelectingRoles"] = 3] = "SelectingRoles";
    ClientScreen[ClientScreen["SetupGame"] = 4] = "SetupGame";
    ClientScreen[ClientScreen["ActiveGame"] = 5] = "ActiveGame";
    ClientScreen[ClientScreen["WaitingForGame"] = 6] = "WaitingForGame";
    ClientScreen[ClientScreen["Paused"] = 7] = "Paused";
    ClientScreen[ClientScreen["Finished"] = 8] = "Finished";
    ClientScreen[ClientScreen["Error"] = 9] = "Error";
})(ClientScreen || (ClientScreen = {}));
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    showUserSettings: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.UserSettings }); },
    showWaitingForPlayers: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.WaitingForPlayers }); },
    showRoleSelection: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.SelectingRoles }); },
    showGameSetup: function () { /* sendEnterSetup(); */ return { type: 'SHOW_SCREEN', display: ClientScreen.SetupGame }; },
    showGame: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.ActiveGame }); },
    showWaitingForGame: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.WaitingForGame }); },
    showPause: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.Paused }); },
    showFinish: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.Finished }); },
    setGameInProgress: function (inProgress) { return ({ type: 'GAME_IN_PROGRESS', inProgress: inProgress }); },
    showError: function (message) { return ({ type: 'SHOW_ERROR', message: message }); },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { display: ClientScreen.Connecting, gameInProgress: false };
var reducer = function (state, rawAction) {
    var action = rawAction;
    switch (action.type) {
        case 'SHOW_SCREEN':
            return __assign({}, state, { display: action.display });
        case 'GAME_IN_PROGRESS':
            return __assign({}, state, { gameInProgress: action.inProgress });
        case 'SHOW_ERROR':
            return __assign({}, state, { display: ClientScreen.Error, errorMessage: action.message });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hotkeys; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_User__ = __webpack_require__(2);


var Hotkeys = (function () {
    function Hotkeys() {
    }
    Hotkeys.getKeyCode = function (hotkey) {
        var keyCode = this.keyCodes[hotkey];
        if (keyCode !== undefined)
            return keyCode;
        return hotkey.charCodeAt(0);
    };
    Hotkeys.register = function (hotkey, button) {
        var keyCode = this.getKeyCode(hotkey);
        this.bindings[keyCode] = button;
    };
    Hotkeys.unregister = function (hotkey, button) {
        var keyCode = this.getKeyCode(hotkey);
        if (this.bindings[keyCode] == button)
            delete this.bindings[keyCode];
    };
    Hotkeys.initialize = function () {
        document.onkeydown = Hotkeys.onKeyDown;
        document.onkeyup = Hotkeys.onKeyUp;
    };
    Hotkeys.onKeyDown = function (e) {
        var button = Hotkeys.bindings[e.which];
        if (button === undefined) {
            if (e.which === 112) {
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_User__["a" /* actionCreators */].showHotkeys(!__WEBPACK_IMPORTED_MODULE_0__Client__["store"].getState().user.showHotkeys));
                e.preventDefault();
            }
            return;
        }
        if (button.keyDown !== undefined)
            button.keyDown(e);
    };
    Hotkeys.onKeyUp = function (e) {
        var button = Hotkeys.bindings[e.which];
        if (button === undefined)
            return;
        if (button.keyUp !== undefined)
            button.keyUp(e);
        if (button.keyPress !== undefined)
            button.keyPress(e);
    };
    Hotkeys.bindings = {};
    Hotkeys.keyCodes = {
        'enter': 13,
        'space': 32,
        'tab': 9,
        'control': 17,
        'shift': 16,
        'alt': 18,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        ',': 188,
        '.': 190,
        '/': 191,
    };
    return Hotkeys;
}());



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buttons__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonSet_scss__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonSet_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ButtonSet_scss__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ButtonSet = (function (_super) {
    __extends(ButtonSet, _super);
    function ButtonSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonSet.prototype.render = function () {
        var _this = this;
        var classes = 'buttonset';
        if (this.props.vertical)
            classes += ' buttonset--vertical';
        if (this.props.className !== undefined)
            classes += ' ' + this.props.className;
        var childrenWithProps = __WEBPACK_IMPORTED_MODULE_0_react__["Children"].map(this.props.children, function (child) {
            if (typeof child === 'string' || typeof child === 'number' || child === null)
                return child;
            if (child.type !== __WEBPACK_IMPORTED_MODULE_1__buttons__["a" /* PushButton */] && child.type !== __WEBPACK_IMPORTED_MODULE_1__buttons__["b" /* ToggleButton */] && child.type !== __WEBPACK_IMPORTED_MODULE_1__buttons__["c" /* HeldButton */] && child.type !== __WEBPACK_IMPORTED_MODULE_1__buttons__["d" /* ConfirmButton */])
                return child;
            var childHasColor = child.props.color !== undefined;
            var childProps = {
                disabled: _this.props.disabled || child.props.disabled,
                color: childHasColor ? child.props.color : _this.props.color,
                fullBorder: childHasColor && _this.props.color !== undefined,
            };
            if (child.type === __WEBPACK_IMPORTED_MODULE_1__buttons__["b" /* ToggleButton */]) {
                var toggleProps = childProps;
                toggleProps.allowUserDeactivate = _this.props.allowUnselected;
                toggleProps.choiceOptionActivated = _this.props.childActivated;
            }
            return __WEBPACK_IMPORTED_MODULE_0_react__["cloneElement"](child, childProps);
        });
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes }, childrenWithProps));
    };
    ButtonSet.defaultProps = {
        vertical: false,
        allowUnselected: true,
    };
    return ButtonSet;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Screen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Screen_scss__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Screen_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Screen_scss__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Screen = (function (_super) {
    __extends(Screen, _super);
    function Screen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Screen.prototype.render = function () {
        var classes = 'screen';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }
        if (this.props.centered) {
            classes += ' screen--centered';
        }
        if (this.props.pageLayout) {
            classes += ' screen--pageLayout';
        }
        var heading;
        if (this.props.heading !== undefined) {
            heading = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { className: "screen__heading" }, this.props.heading);
        }
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes },
            heading,
            this.props.children));
    };
    Screen.defaultProps = {
        centered: false,
        pageLayout: false,
    };
    return Screen;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmButton__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__ConfirmButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HeldButton__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__HeldButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PushButton__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__PushButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToggleButton__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__ToggleButton__["a"]; });






/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buttons__ = __webpack_require__(10);
/* unused harmony reexport ConfirmButton */
/* unused harmony reexport HeldButton */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonSet__ = __webpack_require__(8);
/* unused harmony reexport ButtonSet */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Choice__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__Choice__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Field__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__Field__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Screen__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__Screen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Textbox__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__Textbox__["a"]; });








/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    addPlayers: function (players) { return ({ type: 'ADD_PLAYERS', players: players }); },
    removePlayer: function (playerID) { return ({ type: 'REMOVE_PLAYER', playerID: playerID }); },
    changePlayerName: function (playerID, name) { return ({ type: 'CHANGE_PLAYER_NAME', playerID: playerID, name: name }); },
    setPlayerSystems: function (playerID, flags) { return ({ type: 'SET_PLAYER_SYSTEMS', playerID: playerID, flags: flags }); },
    setLocalPlayer: function (playerID) { return ({ type: 'SET_LOCAL_PLAYER', playerID: playerID }); },
    setSetupPlayer: function (playerID) { return ({ type: 'SET_SETUP_PLAYER', playerID: playerID }); },
    setSelectionMode: function (selectSystems) { return ({ type: 'SET_SELECTION_MODE', selectSystemsDirectly: selectSystems }); },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { players: [], selectSystemsDirectly: false };
var reducer = function (state, action) {
    switch (action.type) {
        case 'ADD_PLAYERS':
            return __assign({}, state, { players: state.players.concat(action.players) });
        case 'REMOVE_PLAYER':
            return __assign({}, state, { players: state.players.filter(function (p) { return p.id !== action.playerID; }) });
        case 'CHANGE_PLAYER_NAME':
            return __assign({}, state, { players: state.players.map(function (player, index) {
                    if (player.id === action.playerID) {
                        return Object.assign({}, player, {
                            name: action.name
                        });
                    }
                    return player;
                }) });
        case 'SET_PLAYER_SYSTEMS':
            return __assign({}, state, { players: state.players.map(function (player, index) {
                    if (player.id === action.playerID) {
                        return Object.assign({}, player, {
                            flags: action.flags
                        });
                    }
                    return player;
                }) });
        case 'SET_LOCAL_PLAYER':
            return __assign({}, state, { localPlayerID: action.playerID });
        case 'SET_SETUP_PLAYER':
            return __assign({}, state, { playerInSetup: action.playerID });
        case 'SET_SELECTION_MODE':
            return __assign({}, state, { selectSystemsDirectly: action.selectSystemsDirectly });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_User__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__screens__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__general_Screen__ = __webpack_require__(9);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var ScreenManager = (function (_super) {
    __extends(ScreenManager, _super);
    function ScreenManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreenManager.prototype.componentWillMount = function () {
        var _this = this;
        this.updateDimensions();
        window.addEventListener('resize', function () { return _this.updateDimensions(); });
    };
    ScreenManager.prototype.render = function () {
        var classes = 'client';
        if (this.props.showHotkeys) {
            classes += ' client--showHotkeys';
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes }, this.renderScreen());
    };
    ScreenManager.prototype.renderScreen = function () {
        switch (this.props.screen) {
            case __WEBPACK_IMPORTED_MODULE_2__store_Screen__["a" /* ClientScreen */].Connecting:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__screens__["a" /* Connecting */], null);
            case __WEBPACK_IMPORTED_MODULE_2__store_Screen__["a" /* ClientScreen */].UserSettings:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__screens__["b" /* Settings */], null);
            default:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general_Screen__["a" /* Screen */], { centered: true },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { className: "screen__heading" },
                        "Unable to render required screen: ",
                        this.props.screen));
        }
    };
    ScreenManager.prototype.updateDimensions = function () {
        this.props.setScreenSize(window.innerWidth, window.innerHeight);
    };
    return ScreenManager;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        screen: state.screen.display,
        errorMessage: state.screen.errorMessage,
        showHotkeys: state.user.showHotkeys,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, __WEBPACK_IMPORTED_MODULE_3__store_User__["a" /* actionCreators */])(ScreenManager));


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(32);




function configureStore(history, initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    var windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    var devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension;
    var createStoreWithMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerMiddleware"])(history)), devToolsExtension ? devToolsExtension() : function (next) { return next; })(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"]);
    // Combine all reducers and instantiate the app-wide store instance
    var allReducers = buildRootReducer(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* reducers */]);
    var store = createStoreWithMiddleware(allReducers, initialState);
    // Enable Webpack hot module replacement for reducers
    if (false) {
        module.hot.accept('./store', function () {
            var nextRootReducer = require('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }
    return store;
}
function buildRootReducer(allReducers) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(Object.assign({}, allReducers, { routing: __WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerReducer"] }));
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_Crew__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(6);



var Connection = (function () {
    function Connection(url) {
        var _this = this;
        this.socket = new WebSocket(url);
        this.socket.onerror = this.socket.onclose = function () { return __WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].showError(__WEBPACK_IMPORTED_MODULE_0__Client__["store"].getState().user.text.errors.connectionLost); };
        this.socket.onmessage = function (e) { return _this.messageReceived(e); };
        this.socket.onopen = function () { return _this.connected(); };
        this.close = this.socket.close.bind(this.socket);
    }
    Connection.prototype.send = function (cmd) {
        this.socket.send(cmd);
    };
    Connection.prototype.connected = function () {
        __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].showUserSettings());
    };
    Connection.prototype.messageReceived = function (ev) {
        var data = (ev.data || '');
        console.log('received', data);
        var pos = data.indexOf(' ');
        var cmd = pos === -1 ? data : data.substr(0, pos);
        data = pos === -1 ? '' : data.substr(pos + 1);
        switch (cmd) {
            case 'id':
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_Crew__["a" /* actionCreators */].setLocalPlayer(parseInt(data)));
                break;
            default:
                console.log("Unexpected command: " + cmd);
                break;
        }
    };
    return Connection;
}());



/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(41);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(138);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(139);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Choice; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonSet__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Choice_scss__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Choice_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Choice_scss__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Choice = (function (_super) {
    __extends(Choice, _super);
    function Choice(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeChild: undefined
        };
        return _this;
    }
    Choice.prototype.render = function () {
        var _this = this;
        var classes = 'choice';
        if (this.props.className !== undefined)
            classes += ' ' + this.props.className;
        var prompt = this.props.prompt == null ? null : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "choice__prompt" }, this.props.prompt);
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes },
            prompt,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__ButtonSet__["a" /* ButtonSet */], { vertical: this.props.vertical, disabled: this.props.disabled, color: this.props.color, allowUnselected: this.props.allowUnselected, childActivated: function (c) { return _this.childActivated(c); } }, this.props.children),
            this.renderDescription()));
    };
    Choice.prototype.renderDescription = function () {
        var anyDesc = false;
        __WEBPACK_IMPORTED_MODULE_0_react__["Children"].forEach(this.props.children, function (child) {
            if (child.props.description !== undefined)
                anyDesc = true;
        });
        if (!anyDesc)
            return undefined;
        var description, descClass;
        if (this.state.activeChild !== undefined && this.state.activeChild.props.description !== undefined) {
            description = this.state.activeChild.props.description;
            descClass = 'choice__description';
        }
        else {
            description = '.';
            descClass = 'choice__description choice__description--hidden';
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: descClass }, description);
    };
    Choice.prototype.childActivated = function (activated) {
        if (this.state.activeChild !== undefined)
            this.state.activeChild.setState({ active: false });
        this.setState({ activeChild: activated });
    };
    Choice.defaultProps = {
        vertical: false,
        allowUnselected: false,
    };
    return Choice;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Field; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Field_scss__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Field_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Field_scss__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Field = (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.prototype.render = function () {
        var contentClasses = 'field__content';
        if (this.props.centered) {
            contentClasses += ' field__content--centered';
        }
        var label;
        if (this.props.labelText !== undefined) {
            label = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "field__label" }, this.props.labelText);
        }
        if (this.props.labelBehaviour) {
            return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: 'field' },
                label,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: contentClasses }, this.props.children)));
        }
        else {
            return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'field', role: "group" },
                label,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: contentClasses }, this.props.children)));
        }
    };
    Field.defaultProps = {
        centered: false,
        labelBehaviour: false,
    };
    return Field;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Textbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Textbox_scss__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Textbox_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Textbox_scss__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Textbox = (function (_super) {
    __extends(Textbox, _super);
    function Textbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Textbox.prototype.render = function () {
        var _this = this;
        var classes = 'textbox';
        switch (this.props.color) {
            case 0 /* Primary */:
                classes += ' textbox--primary';
                break;
            case 1 /* Secondary */:
                classes += ' textbox--secondary';
                break;
            case 2 /* Tertiary */:
                classes += ' textbox--tertiary';
                break;
            case 3 /* Quaternary */:
                classes += ' textbox--quaternary';
                break;
            case 4 /* Quandry */:
                classes += ' textbox--quandry';
                break;
        }
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: classes, type: "text", value: this.props.text, onChange: function (e) { return _this.props.textChanged(e.target.value); }, placeholder: this.props.placeholder }));
    };
    Textbox.defaultProps = {
        centered: false,
        labelBehaviour: true,
    };
    return Textbox;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ConfirmButton = (function (_super) {
    __extends(ConfirmButton, _super);
    function ConfirmButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { primed: false };
        return _this;
    }
    ConfirmButton.prototype.render = function () {
        var _this = this;
        var classList = this.state.primed ? 'button--confirm state--active' : 'button--confirm';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], { className: classList, hotkey: this.props.hotkey, mouseClick: function (e) { return _this.clicked(e); }, buttonType: "submit", color: this.props.color, fullBorder: this.props.fullBorder, disabled: this.props.disabled, text: this.props.text, subtext: this.props.subtext, title: this.props.title });
    };
    ConfirmButton.prototype.clicked = function (e) {
        var _this = this;
        if (this.state.primed) {
            this.clearAutoCancel();
            if (this.props.clicked != undefined)
                this.props.clicked();
            /*
            if (this.props.command !== undefined)
                gameClient.server.send(this.props.command);
            */
        }
        else {
            this.autoCancel = setTimeout(function () { return _this.cancelPrime(); }, 10000);
        }
        this.setState({ primed: !this.state.primed });
        e.preventDefault();
    };
    ConfirmButton.prototype.cancelPrime = function () {
        if (this.state.primed)
            this.setState({ primed: false });
        this.autoCancel = undefined;
    };
    ConfirmButton.prototype.clearAutoCancel = function () {
        if (this.autoCancel !== undefined) {
            clearTimeout(this.autoCancel);
            this.autoCancel = undefined;
        }
    };
    ConfirmButton.prototype.componentWillUnmount = function () {
        this.clearAutoCancel();
    };
    return ConfirmButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeldButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var HeldButton = (function (_super) {
    __extends(HeldButton, _super);
    function HeldButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { held: false };
        return _this;
    }
    HeldButton.prototype.render = function () {
        var _this = this;
        var classList = this.state.held ? 'button--held state--active' : 'button--held';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], { className: classList, hotkey: this.props.hotkey, text: this.props.text, subtext: this.props.subtext, fullBorder: this.props.fullBorder, mouseDown: function (e) { return _this.mouseDown(e); }, mouseUp: function (e) { return _this.mouseUp(e); }, color: this.props.color, disabled: this.props.disabled, title: this.props.title });
    };
    HeldButton.prototype.mouseDown = function (e) {
        this.setState({ held: true });
        if (this.props.pressed != undefined)
            this.props.pressed();
        /*
        if (this.props.pressCommand !== undefined)
            gameClient.server.send(this.props.pressCommand);
        */
    };
    HeldButton.prototype.mouseUp = function (e) {
        if (!this.state.held)
            return;
        this.setState({ held: false });
        if (this.props.released != undefined)
            this.props.released();
        /*
        if (this.props.releaseCommand !== undefined)
            gameClient.server.send(this.props.releaseCommand);
        */
    };
    return HeldButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var PushButton = (function (_super) {
    __extends(PushButton, _super);
    function PushButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { held: false };
        return _this;
    }
    PushButton.prototype.render = function () {
        var _this = this;
        var classList = this.state.held ? 'button--push state--active' : 'button--push';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], { className: classList, hotkey: this.props.hotkey, mouseClick: function (e) { return _this.clicked(e); }, color: this.props.color, disabled: this.props.disabled, fullBorder: this.props.fullBorder, mouseDown: function (e) { return _this.mouseDown(e); }, mouseUp: function (e) { return _this.mouseUp(e); }, title: this.props.title, text: this.props.text, subtext: this.props.subtext });
    };
    PushButton.prototype.clicked = function (e) {
        if (this.props.clicked !== undefined)
            this.props.clicked();
        /*
        if (this.props.command !== undefined)
            gameClient.server.send(this.props.command);
        */
    };
    PushButton.prototype.mouseDown = function (e) {
        this.setState({ held: true });
    };
    PushButton.prototype.mouseUp = function (e) {
        this.setState({ held: false });
    };
    return PushButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ToggleButton = (function (_super) {
    __extends(ToggleButton, _super);
    function ToggleButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { active: props.startActive === true };
        return _this;
    }
    ToggleButton.prototype.componentWillMount = function () {
        if (this.props.startActive === true && this.props.choiceOptionActivated !== undefined)
            this.props.choiceOptionActivated(this);
    };
    ToggleButton.prototype.render = function () {
        var _this = this;
        var classList = this.state.active ? 'button--toggle state--active' : 'button--toggle';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], { className: classList, hotkey: this.props.hotkey, mouseClick: function (e) { return _this.clicked(e); }, color: this.props.color, fullBorder: this.props.fullBorder, disabled: this.props.disabled, text: this.props.text, subtext: this.props.subtext, title: this.props.title });
    };
    ToggleButton.prototype.clicked = function (e) {
        if (this.state.active) {
            if (this.props.allowUserDeactivate === false)
                return; // in a choice, don't deactivate a button by clicking on it
            if (this.props.deactivated != undefined)
                this.props.deactivated();
            /*
            if (this.props.deactivateCommand !== undefined)
                gameClient.server.send(this.props.deactivateCommand);
            */
        }
        else {
            if (this.props.choiceOptionActivated !== undefined)
                this.props.choiceOptionActivated(this);
            if (this.props.activated != undefined)
                this.props.activated();
            /*
            if (this.props.activateCommand !== undefined)
                gameClient.server.send(this.props.activateCommand);
            */
        }
        this.setState({ active: !this.state.active });
    };
    ToggleButton.prototype.select = function (selected) {
        this.setState({ active: selected });
    };
    ToggleButton.defaultProps = {
        inChoice: false,
        startActive: false,
        allowUserDeactivate: true,
    };
    return ToggleButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_User__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__general__ = __webpack_require__(11);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Connecting = (function (_super) {
    __extends(Connecting, _super);
    function Connecting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Connecting.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__general__["a" /* Screen */], { centered: true, heading: this.props.text.screens.connecting.connecting });
    };
    return Connecting;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, __WEBPACK_IMPORTED_MODULE_2__store_User__["a" /* actionCreators */])(Connecting));


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_User__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_Screen__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__general__ = __webpack_require__(11);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};






var Settings = (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Settings.prototype.render = function () {
        var _this = this;
        var words = this.props.text.screens.settings;
        var hasUserName = this.props.userName.trim().length > 0;
        var inputModeVertical = this.props.screenWidth < 330;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["a" /* Screen */], { heading: words.intro, pageLayout: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["b" /* Field */], { labelText: words.userName, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["c" /* Textbox */], { color: 0 /* Primary */, text: this.props.userName, textChanged: function (t) { return _this.nameChanged(t); }, placeholder: words.userNamePlaceholder }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.userNameDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["b" /* Field */], { labelText: words.inputMode },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["d" /* Choice */], { prompt: words.inputModePrompt, color: 1 /* Secondary */, vertical: inputModeVertical },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["e" /* ToggleButton */], { startActive: this.props.inputMode === 0 /* KeyboardAndMouse */, activated: function () { return _this.inputModeChanged(0 /* KeyboardAndMouse */); }, description: words.inputModeDescriptionKeyboard, text: words.inputModeKeyboard }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["e" /* ToggleButton */], { startActive: this.props.inputMode === 1 /* Touchscreen */, activated: function () { return _this.inputModeChanged(1 /* Touchscreen */); }, description: words.inputModeDescriptionTouch, text: words.inputModeTouch }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["e" /* ToggleButton */], { startActive: this.props.inputMode === 2 /* Gamepad */, disabled: true, activated: function () { return _this.inputModeChanged(2 /* Gamepad */); }, description: words.inputModeDescriptionGamepad, text: words.inputModeGamepad }))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["b" /* Field */], { centered: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["f" /* PushButton */], { color: 2 /* Tertiary */, disabled: !hasUserName, clicked: function () { return _this.close(); }, text: this.props.text.common.save })),
            "Screen size is ",
            this.props.screenWidth,
            "x",
            this.props.screenHeight);
    };
    Settings.prototype.nameChanged = function (name) {
        this.props.setUserName(name);
    };
    Settings.prototype.inputModeChanged = function (mode) {
        this.props.setInputMode(mode);
    };
    Settings.prototype.close = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("name " + this.props.userName.trim());
        var localPlayer = this.props.players.filter(function (p) { return p.id === _this.props.localPlayerID; });
        if (localPlayer.length === 0) {
            if (this.props.gameInProgress) {
                this.props.showWaitingForGame();
            }
            else {
                this.props.showWaitingForPlayers();
            }
        }
        else {
            if (this.props.gameInProgress) {
                this.props.showPause();
            }
            else {
                this.props.showRoleSelection();
            }
        }
    };
    return Settings;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        userName: state.user.userName,
        inputMode: state.user.inputMode,
        localisation: state.user.localisation,
        text: state.user.text,
        screenWidth: state.user.screenWidth,
        screenHeight: state.user.screenHeight,
        gameInProgress: state.screen.gameInProgress,
        players: state.crew.players,
        localPlayerID: state.crew.localPlayerID,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, __assign({}, __WEBPACK_IMPORTED_MODULE_3__store_User__["a" /* actionCreators */], __WEBPACK_IMPORTED_MODULE_4__store_Screen__["b" /* actionCreators */]))(Settings));


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Connecting__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Connecting__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Settings__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Settings__["a"]; });




/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Localisations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__localisations_English__ = __webpack_require__(31);

var Localisations = [
    {
        name: 'English',
        flag: 'english.png',
        load: function () { return __WEBPACK_IMPORTED_MODULE_0__localisations_English__["a" /* default */]; },
    }
];


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var words = {
    common: {
        save: 'Save',
        cancel: 'Cancel',
        ready: 'Ready',
        settings: 'Settings',
        help: 'Help',
    },
    errors: {
        connectionLost: 'The connection to your ship has been lost.\nIf the game is still running, check your network connection.',
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
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = (words);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Crew__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Screen__ = __webpack_require__(6);



// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    user: __WEBPACK_IMPORTED_MODULE_0__User__["b" /* reducer */],
    crew: __WEBPACK_IMPORTED_MODULE_1__Crew__["b" /* reducer */],
    screen: __WEBPACK_IMPORTED_MODULE_2__Screen__["c" /* reducer */],
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(40);
} else {
  module.exports = require('./AppContainer.dev');
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable react/prop-types */



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var Component = React.Component;

var AppContainer = function (_Component) {
  _inherits(AppContainer, _Component);

  function AppContainer() {
    _classCallCheck(this, AppContainer);

    return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
  }

  _createClass(AppContainer, [{
    key: 'render',
    value: function render() {
      if (this.props.component) {
        return React.createElement(this.props.component, this.props.props);
      }

      return React.Children.only(this.props.children);
    }
  }]);

  return AppContainer;
}(Component);

module.exports = AppContainer;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(42);
} else {
  module.exports = require('./index.dev');
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.AppContainer = __webpack_require__(39);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(142);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(143);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(73);

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map