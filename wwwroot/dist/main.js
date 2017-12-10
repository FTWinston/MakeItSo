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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(6);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(140);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connection", function() { return connection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configureStore__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_ScreenManager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__functionality__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Client_scss__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Client_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__Client_scss__);









var history = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_history__["createBrowserHistory"])();
var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__configureStore__["a" /* default */])(history);
var connection = new __WEBPACK_IMPORTED_MODULE_7__functionality__["a" /* Connection */]('ws://' + location.host + '/ws');
__WEBPACK_IMPORTED_MODULE_7__functionality__["b" /* Hotkeys */].initialize();
function renderApp() {
    __WEBPACK_IMPORTED_MODULE_1_react_dom__["render"](__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2_react_hot_loader__["AppContainer"], null,
        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_react_redux__["Provider"], { store: store },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__components_ScreenManager__["a" /* default */], null))), document.getElementById('client-root'));
}
renderApp();


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buttons__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonSet__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__ButtonSet__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Canvas__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_2__Canvas__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Choice__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__Choice__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Field__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_4__Field__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Screen__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__Screen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Textbox__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_6__Textbox__["a"]; });









/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = vendor_a65b3acf96981fd3289a;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GameState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return reducer; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
var GameState;
(function (GameState) {
    GameState[GameState["Setup"] = 0] = "Setup";
    GameState[GameState["Paused"] = 1] = "Paused";
    GameState[GameState["Active"] = 2] = "Active";
    GameState[GameState["Finished"] = 3] = "Finished";
})(GameState || (GameState = {}));
var ClientScreen;
(function (ClientScreen) {
    ClientScreen[ClientScreen["Connecting"] = 0] = "Connecting";
    ClientScreen[ClientScreen["UserSettings"] = 1] = "UserSettings";
    ClientScreen[ClientScreen["SelectingSystems"] = 2] = "SelectingSystems";
    ClientScreen[ClientScreen["SetupGame"] = 3] = "SetupGame";
    ClientScreen[ClientScreen["ActiveGame"] = 4] = "ActiveGame";
    ClientScreen[ClientScreen["WaitingForGame"] = 5] = "WaitingForGame";
    ClientScreen[ClientScreen["Finished"] = 6] = "Finished";
    ClientScreen[ClientScreen["Error"] = 7] = "Error";
})(ClientScreen || (ClientScreen = {}));
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    showUserSettings: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.UserSettings }); },
    showSystemSelection: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.SelectingSystems }); },
    showGameSetup: function () { /* sendEnterSetup(); */ return { type: 'SHOW_SCREEN', display: ClientScreen.SetupGame }; },
    showGame: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.ActiveGame }); },
    showWaitingForGame: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.WaitingForGame }); },
    showFinish: function () { return ({ type: 'SHOW_SCREEN', display: ClientScreen.Finished }); },
    setGameActive: function () { return ({ type: 'GAME_STATE', state: GameState.Active }); },
    setGamePaused: function () { return ({ type: 'GAME_STATE', state: GameState.Paused }); },
    setGameFinished: function () { return ({ type: 'GAME_STATE', state: GameState.Finished }); },
    showError: function (message) { return ({ type: 'SHOW_ERROR', message: message }); },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { display: ClientScreen.Connecting, gameState: GameState.Setup };
var reducer = function (state, rawAction) {
    var action = rawAction;
    switch (action.type) {
        case 'SHOW_SCREEN':
            return __assign({}, state, { display: action.display });
        case 'GAME_STATE':
            return __assign({}, state, { gameState: action.state });
        case 'SHOW_ERROR':
            return __assign({}, state, { display: ClientScreen.Error, errorMessage: action.message });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Connection__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Connection__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Hotkeys__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Hotkeys__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Localisation__ = __webpack_require__(55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__Localisation__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ShipSystem__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__ShipSystem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__ShipSystem__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__ShipSystem__["b"]; });






/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functionality__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buttons_scss__ = __webpack_require__(64);
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
            __WEBPACK_IMPORTED_MODULE_1__functionality__["b" /* Hotkeys */].register(this.props.hotkey, this);
    };
    Button.prototype.componentWillUnmount = function () {
        if (this.props.hotkey != null)
            __WEBPACK_IMPORTED_MODULE_1__functionality__["b" /* Hotkeys */].unregister(this.props.hotkey, this);
    };
    Button.prototype.determineClasses = function () {
        var classes = 'button';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }
        if (this.props.fullBorder)
            classes += ' button--fullBorder';
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
            this.props.children,
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functionality__ = __webpack_require__(6);
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
    localisation: __WEBPACK_IMPORTED_MODULE_0__functionality__["c" /* Localisations */][0],
    text: __WEBPACK_IMPORTED_MODULE_0__functionality__["c" /* Localisations */][0].load(),
    showingHotkeys: false,
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
            return __assign({}, state, { showingHotkeys: action.show });
        case 'SET_SCREEN_SIZE':
            return __assign({}, state, { screenWidth: action.width, screenHeight: action.height });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buttons__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonSet_scss__ = __webpack_require__(59);
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmButton__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__ConfirmButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HeldButton__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__HeldButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__IconButton__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__IconButton__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__IconButton__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PushButton__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__PushButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToggleButton__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__ToggleButton__["a"]; });







/***/ }),
/* 11 */
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
    updatePlayer: function (playerID, name) { return ({ type: 'UPDATE_PLAYER', playerID: playerID, name: name }); },
    removePlayer: function (playerID) { return ({ type: 'REMOVE_PLAYER', playerID: playerID }); },
    setPlayerSystems: function (playerID, systems) { return ({ type: 'SET_PLAYER_SYSTEMS', playerID: playerID, systems: systems }); },
    setLocalPlayer: function (playerID) { return ({ type: 'SET_LOCAL_PLAYER', playerID: playerID }); },
    setSetupPlayer: function (playerID) { return ({ type: 'SET_SETUP_PLAYER', playerID: playerID }); },
    setActiveSystem: function (playerID, system) { return ({ type: 'SET_ACTIVE_SYSTEM', playerID: playerID, system: system }); },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { players: [] };
var reducer = function (state, action) {
    switch (action.type) {
        case 'REMOVE_PLAYER':
            return __assign({}, state, { players: state.players.filter(function (p) { return p.id !== action.playerID; }) });
        case 'UPDATE_PLAYER':
            var existing_1 = false;
            var players = state.players.map(function (player, index) {
                if (player.id === action.playerID) {
                    existing_1 = true;
                    return Object.assign({}, player, {
                        name: action.name
                    });
                }
                return player;
            });
            if (!existing_1) {
                players.push({
                    id: action.playerID,
                    name: action.name,
                    selectedSystems: 0,
                });
            }
            return __assign({}, state, { players: players });
        case 'SET_PLAYER_SYSTEMS':
            return __assign({}, state, { players: state.players.map(function (player, index) {
                    if (player.id === action.playerID) {
                        return Object.assign({}, player, {
                            selectedSystems: action.systems
                        });
                    }
                    return player;
                }) });
        case 'SET_LOCAL_PLAYER':
            return __assign({}, state, { localPlayerID: action.playerID });
        case 'SET_SETUP_PLAYER':
            return __assign({}, state, { playerInSetup: action.playerID });
        case 'SET_ACTIVE_SYSTEM':
            return __assign({}, state, { players: state.players.map(function (player, index) {
                    if (player.id === action.playerID) {
                        return Object.assign({}, player, {
                            activeSystem: action.system
                        });
                    }
                    return player;
                }) });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__screens__ = __webpack_require__(34);
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
        if (this.props.showingHotkeys) {
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
            case __WEBPACK_IMPORTED_MODULE_2__store_Screen__["a" /* ClientScreen */].SelectingSystems:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__screens__["c" /* SystemSelection */], null);
            case __WEBPACK_IMPORTED_MODULE_2__store_Screen__["a" /* ClientScreen */].SetupGame:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__screens__["d" /* GameSetup */], null);
            case __WEBPACK_IMPORTED_MODULE_2__store_Screen__["a" /* ClientScreen */].ActiveGame:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__screens__["e" /* GameActive */], null);
            case __WEBPACK_IMPORTED_MODULE_2__store_Screen__["a" /* ClientScreen */].Error:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__screens__["f" /* Error */], null);
            default:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { className: "screen__heading" },
                    "Unable to render screen: ",
                    this.props.screen);
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
        showingHotkeys: state.user.showingHotkeys,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, __WEBPACK_IMPORTED_MODULE_3__store_User__["a" /* actionCreators */])(ScreenManager));


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(58);




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
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(78);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(138);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(139);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Canvas; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
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

var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: props.width === undefined ? 0 : props.width,
            height: props.height === undefined ? 0 : props.height,
        };
        return _this;
    }
    Canvas.prototype.componentDidMount = function () {
        this.props.draw(this.ctx);
    };
    Canvas.prototype.componentDidUpdate = function () {
        this.props.draw(this.ctx);
    };
    Canvas.prototype.render = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("canvas", { width: this.props.width, height: this.props.height, className: this.props.className, ref: function (c) { return _this.setupRef(c); } }));
    };
    Canvas.prototype.setupRef = function (c) {
        if (c === null) {
            return;
        }
        var ctx = c.getContext('2d');
        if (ctx !== null) {
            this.ctx = ctx;
        }
    };
    return Canvas;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Choice; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonSet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Choice_scss__ = __webpack_require__(60);
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Field; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Field_scss__ = __webpack_require__(61);
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
        if (this.props.displayAsRow) {
            contentClasses += ' field__content--row';
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
        displayAsRow: false,
    };
    return Field;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Screen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Screen_scss__ = __webpack_require__(62);
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Textbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Textbox_scss__ = __webpack_require__(63);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], { className: classList, hotkey: this.props.hotkey, mouseClick: function (e) { return _this.clicked(e); }, buttonType: "submit", color: this.props.color, fullBorder: this.props.fullBorder, disabled: this.props.disabled, subtext: this.props.subtext, title: this.props.title }, this.props.text);
    };
    ConfirmButton.prototype.clicked = function (e) {
        var _this = this;
        if (this.state.primed) {
            this.clearAutoCancel();
            if (this.props.clicked != undefined)
                this.props.clicked();
            if (this.props.command !== undefined)
                __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(this.props.command);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], { className: classList, hotkey: this.props.hotkey, subtext: this.props.subtext, fullBorder: this.props.fullBorder, mouseDown: function (e) { return _this.mouseDown(e); }, mouseUp: function (e) { return _this.mouseUp(e); }, color: this.props.color, disabled: this.props.disabled, title: this.props.title }, this.props.text);
    };
    HeldButton.prototype.mouseDown = function (e) {
        this.setState({ held: true });
        if (this.props.pressed != undefined)
            this.props.pressed();
        if (this.props.pressCommand !== undefined)
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(this.props.pressCommand);
    };
    HeldButton.prototype.mouseUp = function (e) {
        if (!this.state.held)
            return;
        this.setState({ held: false });
        if (this.props.released != undefined)
            this.props.released();
        if (this.props.releaseCommand !== undefined)
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(this.props.releaseCommand);
    };
    return HeldButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Icon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IconButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
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



var HelpIcon = __webpack_require__(84);
var PauseIcon = __webpack_require__(86);
var RefreshIcon = __webpack_require__(89);
var SkipBack = __webpack_require__(90);
var SkipForward = __webpack_require__(91);
var HelmIcon = __webpack_require__(85);
var WarpIcon = __webpack_require__(82);
var WeaponsIcon = __webpack_require__(83);
var SensorsIcon = __webpack_require__(80);
var PowerIcon = __webpack_require__(88);
var DamageIcon = __webpack_require__(81);
var ViewScreenIcon = __webpack_require__(92);
var CommunicationsIcon = __webpack_require__(87);
var Icon;
(function (Icon) {
    Icon[Icon["Help"] = 0] = "Help";
    Icon[Icon["Pause"] = 1] = "Pause";
    Icon[Icon["Refresh"] = 2] = "Refresh";
    Icon[Icon["SkipBack"] = 3] = "SkipBack";
    Icon[Icon["SkipForward"] = 4] = "SkipForward";
    Icon[Icon["Helm"] = 5] = "Helm";
    Icon[Icon["Warp"] = 6] = "Warp";
    Icon[Icon["Weapons"] = 7] = "Weapons";
    Icon[Icon["Sensors"] = 8] = "Sensors";
    Icon[Icon["PowerManagement"] = 9] = "PowerManagement";
    Icon[Icon["DamageControl"] = 10] = "DamageControl";
    Icon[Icon["ViewScreen"] = 11] = "ViewScreen";
    Icon[Icon["Communications"] = 12] = "Communications";
})(Icon || (Icon = {}));
var IconButton = (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconButton.prototype.render = function () {
        var _this = this;
        var classList = 'button--icon';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], { className: classList, hotkey: this.props.hotkey, mouseClick: function (e) { return _this.clicked(e); }, color: this.props.color, disabled: this.props.disabled, title: this.props.title, subtext: this.props.subtext }, this.renderIcon());
    };
    IconButton.prototype.renderIcon = function () {
        switch (this.props.icon) {
            case Icon.Help:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](HelpIcon, null);
            case Icon.Pause:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](PauseIcon, null);
            case Icon.Refresh:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](RefreshIcon, null);
            case Icon.SkipBack:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](SkipBack, null);
            case Icon.SkipForward:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](SkipForward, null);
            case Icon.Helm:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](HelmIcon, null);
            case Icon.Warp:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](WarpIcon, null);
            case Icon.Weapons:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](WeaponsIcon, null);
            case Icon.Sensors:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](SensorsIcon, null);
            case Icon.PowerManagement:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](PowerIcon, null);
            case Icon.DamageControl:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](DamageIcon, null);
            case Icon.ViewScreen:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ViewScreenIcon, null);
            case Icon.Communications:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](CommunicationsIcon, null);
            default:
                var exhaustiveCheck = this.props.icon;
        }
    };
    IconButton.prototype.clicked = function (e) {
        if (this.props.clicked !== undefined)
            this.props.clicked();
        if (this.props.command !== undefined)
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(this.props.command);
    };
    return IconButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], { className: classList, hotkey: this.props.hotkey, mouseClick: function (e) { return _this.clicked(e); }, color: this.props.color, disabled: this.props.disabled, fullBorder: this.props.fullBorder, mouseDown: function (e) { return _this.mouseDown(e); }, mouseUp: function (e) { return _this.mouseUp(e); }, title: this.props.title, subtext: this.props.subtext }, this.props.text);
    };
    PushButton.prototype.clicked = function (e) {
        if (this.props.clicked !== undefined)
            this.props.clicked();
        if (this.props.command !== undefined)
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(this.props.command);
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], { className: classList, hotkey: this.props.hotkey, mouseClick: function (e) { return _this.clicked(e); }, color: this.props.color, fullBorder: this.props.fullBorder, disabled: this.props.disabled, subtext: this.props.subtext, title: this.props.title }, this.props.text);
    };
    ToggleButton.prototype.clicked = function (e) {
        if (this.state.active) {
            if (this.props.allowUserDeactivate === false)
                return; // in a choice, don't deactivate a button by clicking on it
            if (this.props.deactivated != undefined)
                this.props.deactivated();
            if (this.props.deactivateCommand !== undefined)
                __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(this.props.deactivateCommand);
        }
        else {
            if (this.props.choiceOptionActivated !== undefined)
                this.props.choiceOptionActivated(this);
            if (this.props.activated != undefined)
                this.props.activated();
            if (this.props.activateCommand !== undefined)
                __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(this.props.activateCommand);
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__general__ = __webpack_require__(3);
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Error_scss__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Error_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Error_scss__);
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




var Error = (function (_super) {
    __extends(Error, _super);
    function Error() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["a" /* Screen */], { centered: true, heading: this.props.text.screens.error.heading },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "errorMessage" }, this.props.message));
    };
    return Error;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
        message: state.screen.errorMessage === undefined ? state.user.text.errors.unknown : state.screen.errorMessage,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(Error));


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functionality__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__systems__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__GameActive_scss__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__GameActive_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__GameActive_scss__);
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







var GameActive = (function (_super) {
    __extends(GameActive, _super);
    function GameActive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameActive.prototype.render = function () {
        var activeSystemName = this.props.activeSystem === undefined ? undefined : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functionality__["d" /* getSystemName */])(this.props.activeSystem, this.props.text);
        var prev;
        var next;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["a" /* Screen */], null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { className: "systemHeader__name" }, activeSystemName),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader__systemIcons systemHeader__systemIcons--fullWidth" }, this.renderSystemIcons()),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader__systemIcons systemHeader__systemIcons--truncated" },
                    prev,
                    next),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader__separator" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader__commonIcons" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* IconButton */], { title: this.props.text.common.help, icon: __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Help }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* IconButton */], { title: this.props.text.screens.active.pause, icon: __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Pause, command: "pause" }))),
            this.renderSystem(this.props.activeSystem));
    };
    GameActive.prototype.renderSystemIcons = function () {
        return [
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Helm, __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Helm),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp, __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Warp),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Weapons, __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Weapons),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Sensors, __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Sensors),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].PowerManagement, __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].PowerManagement),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].DamageControl, __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].DamageControl),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications, __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Communications),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen, __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].ViewScreen),
        ];
    };
    GameActive.prototype.renderSystemIcon = function (system, icon) {
        if ((this.props.displaySystems & system) === 0)
            return undefined;
        var color = this.props.activeSystem === system ? 4 /* Quandry */ : undefined;
        var disabled = (this.props.disableSystems & system) !== 0;
        var clicked = this.props.activeSystem === system ? undefined : function () { return __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("viewsys " + system); };
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* IconButton */], { key: system, title: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functionality__["d" /* getSystemName */])(system, this.props.text), icon: icon, disabled: disabled, color: color, clicked: clicked });
    };
    GameActive.prototype.renderSystem = function (system) {
        switch (system) {
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Helm:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__systems__["a" /* Helm */], null);
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__systems__["b" /* Warp */], null);
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Weapons:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__systems__["c" /* Weapons */], null);
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Sensors:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__systems__["d" /* Sensors */], null);
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].PowerManagement:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__systems__["e" /* PowerManagement */], null);
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].DamageControl:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__systems__["f" /* DamageControl */], null);
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__systems__["g" /* Communications */], null);
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__systems__["h" /* ViewScreen */], null);
        }
    };
    return GameActive;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    var player = state.crew.players.filter(function (p) { return p.id === state.crew.localPlayerID; });
    var disabled = 0;
    for (var _i = 0, _a = state.crew.players; _i < _a.length; _i++) {
        var other = _a[_i];
        if (other.id !== state.crew.localPlayerID && other.activeSystem !== undefined) {
            disabled |= other.activeSystem;
        }
    }
    var activeSystem = player[0].activeSystem;
    var activeName = activeSystem === undefined ? undefined : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functionality__["d" /* getSystemName */])(activeSystem, state.user.text);
    return {
        text: state.user.text,
        activeSystem: activeSystem,
        activeSystemName: activeName,
        displaySystems: player[0].selectedSystems,
        disableSystems: disabled,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(GameActive));


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_Screen__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__general__ = __webpack_require__(3);
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





var GameSetup = (function (_super) {
    __extends(GameSetup, _super);
    function GameSetup(props) {
        var _this = _super.call(this, props) || this;
        // TODO: load these from localStorage
        _this.state = {
            shipName: _this.getRandomName(),
            joinAddress: '',
            serverName: '',
        };
        return _this;
    }
    GameSetup.prototype.render = function () {
        var _this = this;
        var words = this.props.text.screens.gameSetup;
        var choicesVertical = this.props.screenWidth < 300;
        var joinAddress;
        var gameMode;
        var difficulty;
        var hostName;
        if (this.state.gameType === 1 /* Join */) {
            joinAddress = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* Field */], { labelText: words.joinAddress, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["k" /* Textbox */], { color: 2 /* Tertiary */, text: this.state.joinAddress, placeholder: words.joinAddressPlaceholder, textChanged: function (address) { return _this.setState({ joinAddress: address }); } }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.joinAddressDescription)));
        }
        else {
            if (this.state.gameType !== undefined) {
                gameMode = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* Field */], { labelText: words.gameMode },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Choice */], { prompt: words.gameModePrompt, color: 0 /* Primary */, vertical: choicesVertical },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* ToggleButton */], { activated: function () { return _this.setState({ gameMode: 2 /* Exploration */ }); }, description: words.gameModeExplorationDescription, text: words.gameModeExploration }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* ToggleButton */], { activated: function () { return _this.setState({ gameMode: 1 /* Survival */ }); }, description: words.gameModeSurvivalDescription, text: words.gameModeSurvival }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* ToggleButton */], { activated: function () { return _this.setState({ gameMode: 0 /* Arena */ }); }, description: words.gameModeArenaDescription, text: words.gameModeArena, disabled: this.state.gameType === 0 /* Local */ }))));
                if (this.usesDifficulty()) {
                    var levels = [];
                    var _loop_1 = function (i) {
                        levels.push(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* ToggleButton */], { key: i, activated: function () { return _this.setState({ difficulty: i }); }, text: i.toString() }));
                    };
                    for (var i = 1; i <= 10; i++) {
                        _loop_1(i);
                    }
                    difficulty = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* Field */], { labelText: words.difficulty },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Choice */], { prompt: words.difficultyPrompt, color: 2 /* Tertiary */, vertical: this.props.screenWidth < 400 }, levels)));
                }
                if (this.state.gameType === 2 /* Host */) {
                    hostName = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* Field */], { labelText: words.serverName, labelBehaviour: true },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["k" /* Textbox */], { color: 2 /* Tertiary */, text: this.state.serverName, placeholder: words.serverNamePlaceholder, textChanged: function (name) { return _this.setState({ serverName: name }); } }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.serverNameDescription)));
                }
            }
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["a" /* Screen */], { heading: words.intro, pageLayout: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* Field */], { labelText: words.shipName, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "field__contentRow" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["k" /* Textbox */], { color: 2 /* Tertiary */, text: this.state.shipName, textChanged: function (name) { return _this.setState({ shipName: name }); } }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* IconButton */], { color: 2 /* Tertiary */, icon: __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Refresh, clicked: function () { return _this.randomizeName(); }, title: words.shipNameRandom })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.shipNameDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* Field */], { labelText: words.gameType },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Choice */], { prompt: words.gameTypePrompt, color: 0 /* Primary */, vertical: choicesVertical },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* ToggleButton */], { activated: function () { return _this.setState({ gameType: 0 /* Local */ }); }, description: words.gameTypeLocalDescription, text: words.gameTypeLocal }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* ToggleButton */], { activated: function () { return _this.setState({ gameType: 1 /* Join */ }); }, description: words.gameTypeJoinDescription, text: words.gameTypeJoin }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* ToggleButton */], { activated: function () { return _this.setState({ gameType: 2 /* Host */ }); }, description: words.gameTypeHostDescription, text: words.gameTypeHost }))),
            joinAddress,
            gameMode,
            difficulty,
            hostName,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* Field */], { centered: true, displayAsRow: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["l" /* ConfirmButton */], { color: 4 /* Quandry */, clicked: function () { return _this.startGame(); }, text: words.startGame, disabled: !this.decideCanStart() }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["f" /* PushButton */], { color: 3 /* Quaternary */, clicked: function () { return _this.cancel(); }, text: this.props.text.common.cancel, command: "-setup" })));
    };
    GameSetup.prototype.getRandomName = function () {
        var randomNames = this.props.text.screens.gameSetup.shipNames;
        var index = Math.floor(Math.random() * randomNames.length);
        return randomNames[index];
    };
    GameSetup.prototype.randomizeName = function () {
        var name;
        do {
            name = this.getRandomName();
        } while (name == this.state.shipName);
        this.setState({ shipName: name });
    };
    GameSetup.prototype.usesDifficulty = function () {
        switch (this.state.gameMode) {
            case 1 /* Survival */:
            case 2 /* Exploration */:
                return true;
            default:
                return false;
        }
    };
    GameSetup.prototype.decideCanStart = function () {
        if (this.state.gameType === undefined)
            return false;
        if (this.state.shipName === undefined || this.state.shipName.trim().length == 0)
            return false;
        if (this.state.gameType === 1 /* Join */) {
            if (this.state.joinAddress === undefined || this.state.joinAddress.trim().length == 0)
                return false;
        }
        if (this.state.gameType === 0 /* Local */ || this.state.gameType === 2 /* Host */) {
            if (this.state.gameMode === undefined)
                return false;
            if (this.usesDifficulty() && this.state.difficulty === undefined)
                return false;
        }
        if (this.state.gameType === 2 /* Host */) {
            if (this.state.serverName === undefined || this.state.serverName.trim().length == 0)
                return false;
        }
        else if (this.state.gameType === 0 /* Local */) {
            if (this.state.gameMode === 0 /* Arena */)
                return false; // invalid combo
        }
        return true;
    };
    GameSetup.prototype.cancel = function () {
        this.props.showSystemSelection();
    };
    GameSetup.prototype.startGame = function () {
        __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("shipName " + this.state.shipName);
        var command = 'startGame';
        if (this.state.gameType === 1 /* Join */) {
            command += " join " + this.state.joinAddress;
        }
        else {
            switch (this.state.gameType) {
                case 2 /* Host */:
                    command += ' host';
                    break;
                case 0 /* Local */:
                    command += ' local';
                    break;
                default:
                    return;
            }
            switch (this.state.gameMode) {
                case 2 /* Exploration */:
                    command += " exploration " + this.state.difficulty;
                    break;
                case 1 /* Survival */:
                    command += " survival " + this.state.difficulty;
                    break;
                case 0 /* Arena */:
                    command += ' arena';
                    break;
            }
        }
        __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(command);
    };
    return GameSetup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
        screenWidth: state.user.screenWidth,
        screenHeight: state.user.screenHeight,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, __assign({}, __WEBPACK_IMPORTED_MODULE_3__store_Screen__["b" /* actionCreators */]))(GameSetup));


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_Screen__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__general__ = __webpack_require__(3);
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
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["j" /* Field */], { labelText: words.userName, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["k" /* Textbox */], { color: 0 /* Primary */, text: this.props.userName, textChanged: function (t) { return _this.nameChanged(t); }, placeholder: words.userNamePlaceholder }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.userNameDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["j" /* Field */], { labelText: words.inputMode },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["g" /* Choice */], { prompt: words.inputModePrompt, color: 1 /* Secondary */, vertical: inputModeVertical },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["h" /* ToggleButton */], { startActive: this.props.inputMode === 0 /* KeyboardAndMouse */, activated: function () { return _this.inputModeChanged(0 /* KeyboardAndMouse */); }, description: words.inputModeDescriptionKeyboard, text: words.inputModeKeyboard }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["h" /* ToggleButton */], { startActive: this.props.inputMode === 1 /* Touchscreen */, activated: function () { return _this.inputModeChanged(1 /* Touchscreen */); }, description: words.inputModeDescriptionTouch, text: words.inputModeTouch }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["h" /* ToggleButton */], { startActive: this.props.inputMode === 2 /* Gamepad */, disabled: true, activated: function () { return _this.inputModeChanged(2 /* Gamepad */); }, description: words.inputModeDescriptionGamepad, text: words.inputModeGamepad }))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["j" /* Field */], { centered: true },
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
        __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("name " + this.props.userName.trim());
        if (this.props.gameInProgress) {
            if (this.props.hasSelectedSystems) {
                this.props.showGame();
            }
            else {
                this.props.showWaitingForGame();
            }
        }
        else {
            this.props.showSystemSelection();
        }
    };
    return Settings;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    var localPlayer = state.crew.players.filter(function (p) { return p.id === state.crew.localPlayerID; });
    return {
        userName: state.user.userName,
        inputMode: state.user.inputMode,
        localisation: state.user.localisation,
        text: state.user.text,
        screenWidth: state.user.screenWidth,
        screenHeight: state.user.screenHeight,
        gameInProgress: state.screen.gameState === __WEBPACK_IMPORTED_MODULE_4__store_Screen__["c" /* GameState */].Active
            || state.screen.gameState === __WEBPACK_IMPORTED_MODULE_4__store_Screen__["c" /* GameState */].Finished,
        hasSelectedSystems: localPlayer.length > 0 && localPlayer[0].selectedSystems !== 0,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, __assign({}, __WEBPACK_IMPORTED_MODULE_3__store_User__["a" /* actionCreators */], __WEBPACK_IMPORTED_MODULE_4__store_Screen__["b" /* actionCreators */]))(Settings));


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functionality__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SystemSelection_scss__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SystemSelection_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__SystemSelection_scss__);
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






var SystemSelection = (function (_super) {
    __extends(SystemSelection, _super);
    function SystemSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SystemSelection.prototype.render = function () {
        var _this = this;
        var words = this.props.text.screens.systemSelection;
        var systemNames = this.props.text.systemNames;
        var suggestedGroupings = this.determineSuggestedGroupings();
        var setupButton, resumeButton;
        if (this.props.gameInProgress) {
            resumeButton = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["f" /* PushButton */], { color: 1 /* Secondary */, text: words.resumeGame, command: "resume" });
        }
        else {
            setupButton = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["f" /* PushButton */], { color: 1 /* Secondary */, text: words.setupGame, command: "+setup", disabled: this.props.canEnterSetup });
        }
        var settingsButton = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["f" /* PushButton */], { color: 2 /* Tertiary */, text: this.props.text.common.settings, clicked: function () { return _this.props.showUserSettings(); } });
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["a" /* Screen */], { heading: words.intro, pageLayout: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* Field */], { centered: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, suggestedGroupings.length === 0 ? undefined : words.suggestionPrompt),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemSelection" },
                    this.renderSystemControls(systemNames.helm, __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Helm, suggestedGroupings),
                    this.renderSystemControls(systemNames.warp, __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp, suggestedGroupings),
                    this.renderSystemControls(systemNames.weapons, __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Weapons, suggestedGroupings),
                    this.renderSystemControls(systemNames.sensors, __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Sensors, suggestedGroupings),
                    this.renderSystemControls(systemNames.power, __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].PowerManagement, suggestedGroupings),
                    this.renderSystemControls(systemNames.damage, __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].DamageControl, suggestedGroupings),
                    this.renderSystemControls(systemNames.comms, __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications, suggestedGroupings),
                    this.renderSystemControls(systemNames.view, __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen, suggestedGroupings))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* Field */], { centered: true, displayAsRow: true },
                settingsButton,
                setupButton,
                resumeButton));
    };
    SystemSelection.prototype.renderSystemControls = function (name, system, suggestedGroupings) {
        var players = this.props.playersBySystem[system];
        var groupNames = ['Δ', 'Ω', 'Ψ', 'Χ', 'Θ', 'Σ'];
        var groups = '';
        for (var i = 0; i < suggestedGroupings.length; i++) {
            if ((suggestedGroupings[i] & system) !== 0) {
                groups += groupNames[i];
            }
        }
        // select by default systems chosen by the current player, so they can go to settings and back without screwing with the UI
        var preselected = this.props.preselectedSystems !== undefined && (this.props.preselectedSystems & system) !== 0;
        return [
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { key: "a", className: "systemSelection__group" }, groups),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* ToggleButton */], { key: "b", text: name, color: 0 /* Primary */, activateCommand: "sys+ " + system, deactivateCommand: "sys- " + system, startActive: preselected }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { key: "c", className: "systemSelection__help" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* IconButton */], { color: 4 /* Quandry */, icon: __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Help, title: this.props.text.common.help })),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { key: "d", className: "systemSelection__who" }, players)
        ];
    };
    SystemSelection.prototype.determineSuggestedGroupings = function () {
        switch (this.props.numPlayers) {
            case 2:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Helm | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].PowerManagement | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].DamageControl | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                ];
            case 3:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Helm | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].PowerManagement | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].DamageControl | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                ];
            case 4:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Helm | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].PowerManagement | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].DamageControl | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                ];
            case 5:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Helm,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].PowerManagement | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].DamageControl | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                ];
            case 6:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Helm,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].PowerManagement,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Communications,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["e" /* ShipSystem */].DamageControl,
                ];
            default:
                return [];
        }
    };
    return SystemSelection;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    // use the current player's selections if we have any
    var localPlayer = state.crew.players.filter(function (p) { return p.id === state.crew.localPlayerID; });
    var preselectedSystems = localPlayer.length === 0 ? 0 : localPlayer[0].selectedSystems; // if 0, use saved session values?
    var players = {};
    for (var _i = 0, allSystems_1 = __WEBPACK_IMPORTED_MODULE_3__functionality__["f" /* allSystems */]; _i < allSystems_1.length; _i++) {
        var system = allSystems_1[_i];
        players[system] = state.crew.players.filter(function (p) { return p.selectedSystems & system; }).map(function (p) { return p.name; }).join(', ');
    }
    return {
        playersBySystem: players,
        text: state.user.text,
        canEnterSetup: state.crew.playerInSetup !== undefined && state.crew.playerInSetup !== state.crew.localPlayerID,
        gameInProgress: state.screen.gameState === __WEBPACK_IMPORTED_MODULE_2__store_Screen__["c" /* GameState */].Paused,
        numPlayers: state.crew.players.length,
        preselectedSystems: preselectedSystems,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, __WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */])(SystemSelection));


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Connecting__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Connecting__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Settings__ = __webpack_require__(32);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Settings__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SystemSelection__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__SystemSelection__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GameSetup__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__GameSetup__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GameActive__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__GameActive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Error__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__Error__["a"]; });








/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Communications_scss__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Communications_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Communications_scss__);
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



var Communications = (function (_super) {
    __extends(Communications, _super);
    function Communications() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Communications.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system" }, "This is the communications system. TODO: implement this!");
    };
    return Communications;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(Communications));


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Communications__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Communications__["a"]; });



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DamageControl_scss__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DamageControl_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__DamageControl_scss__);
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



var DamageControl = (function (_super) {
    __extends(DamageControl, _super);
    function DamageControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DamageControl.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system" }, "This is the damage control system. TODO: implement this!");
    };
    return DamageControl;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(DamageControl));


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DamageControl__ = __webpack_require__(37);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__DamageControl__["a"]; });



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackGroup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__general__ = __webpack_require__(3);
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


var FeedbackGroup = (function (_super) {
    __extends(FeedbackGroup, _super);
    function FeedbackGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: 0,
            height: 0,
        };
        return _this;
    }
    FeedbackGroup.prototype.componentDidMount = function () {
        var _this = this;
        this.resizeListener = function () { return _this.updateSize(); };
        window.addEventListener('resize', this.resizeListener);
        this.updateSize();
    };
    FeedbackGroup.prototype.updateSize = function () {
        if (this.root === null) {
            return;
        }
        this.setState({
            width: this.root.offsetWidth,
            height: this.root.offsetHeight,
        });
    };
    FeedbackGroup.prototype.render = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "feedbackGroup", ref: function (r) { return _this.root = r; } },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "feedbackGroup__label" }, this.props.label),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__general__["i" /* Canvas */], { width: this.state.width, height: this.state.height, draw: function (ctx) { return _this.drawFeedback(ctx); }, className: "feedbackGroup__background" }),
            this.props.children));
    };
    FeedbackGroup.prototype.drawFeedback = function (ctx) {
        var width = this.state.width, halfWidth = width / 2;
        var height = this.state.height, halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);
        var x = this.props.x * halfWidth + halfWidth;
        var y = this.props.y * halfHeight + halfHeight;
        // faint lines showing center
        ctx.strokeStyle = '#fff';
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(halfWidth, 0);
        ctx.lineTo(halfWidth, height);
        ctx.moveTo(0, halfHeight);
        ctx.lineTo(width, halfHeight);
        ctx.stroke();
        // faint lines showing current pos
        ctx.strokeStyle = '#0c0';
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        // arrows showing the current pos
        ctx.fillStyle = '#0c0';
        ctx.globalAlpha = 1;
        ctx.beginPath();
        var vmin = Math.min(width, height);
        var breadth = vmin * 0.025, depth = vmin * 0.025 * 1.412;
        ctx.moveTo(x - breadth, 0);
        ctx.lineTo(x + breadth, 0);
        ctx.lineTo(x, depth);
        ctx.moveTo(x - breadth, height);
        ctx.lineTo(x + breadth, height);
        ctx.lineTo(x, height - depth);
        ctx.moveTo(0, y - breadth);
        ctx.lineTo(0, y + breadth);
        ctx.lineTo(depth, y);
        ctx.moveTo(width, y - breadth);
        ctx.lineTo(width, y + breadth);
        ctx.lineTo(width - depth, y);
        ctx.fill();
        // tick marks showing the center
        ctx.strokeStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(halfWidth, 0);
        ctx.lineTo(halfWidth, depth);
        ctx.moveTo(halfWidth, height);
        ctx.lineTo(halfWidth, height - depth);
        ctx.moveTo(0, halfHeight);
        ctx.lineTo(depth, halfHeight);
        ctx.moveTo(width, halfHeight);
        ctx.lineTo(width - depth, halfHeight);
        ctx.stroke();
    };
    return FeedbackGroup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FeedbackGroup__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Helm_scss__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Helm_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Helm_scss__);
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





var Helm = (function (_super) {
    __extends(Helm, _super);
    function Helm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Helm.prototype.render = function () {
        switch (this.props.inputMode) {
            case 0 /* KeyboardAndMouse */:
                return this.renderButtons();
            case 1 /* Touchscreen */:
                return this.renderTouch();
            case 2 /* Gamepad */:
                return this.renderGamepad();
        }
    };
    Helm.prototype.renderButtons = function () {
        var words = this.props.text.systems.helm;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system helm helm--buttonInput" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__FeedbackGroup__["a" /* FeedbackGroup */], { label: words.rotation, x: 0, y: 0 },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["d" /* ButtonSet */], { vertical: true },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["d" /* ButtonSet */], { color: 1 /* Secondary */ },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "spacer" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.up, hotkey: "W" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "spacer" })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["d" /* ButtonSet */], { color: 1 /* Secondary */ },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.left, hotkey: "A" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.down, hotkey: "S" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.right, hotkey: "D" })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["d" /* ButtonSet */], { color: 1 /* Secondary */ },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "spacer" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["f" /* PushButton */], { text: words.stop, hotkey: "X", color: 0 /* Primary */ }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "spacer" })))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__FeedbackGroup__["a" /* FeedbackGroup */], { label: words.translation, x: 0, y: 0 },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["d" /* ButtonSet */], { vertical: true },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["d" /* ButtonSet */], { color: 3 /* Quaternary */ },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "spacer" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.up, hotkey: "I" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "spacer" })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["d" /* ButtonSet */], { color: 3 /* Quaternary */ },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.left, hotkey: "J" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.down, hotkey: "K" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.right, hotkey: "L" })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["d" /* ButtonSet */], { color: 3 /* Quaternary */ },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "spacer" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["f" /* PushButton */], { text: words.stop, hotkey: "M", color: 0 /* Primary */ }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "spacer" })))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("fieldset", { className: "helm--buttonInput__speed" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("legend", null, words.speed),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["g" /* Choice */], { color: 2 /* Tertiary */, allowUnselected: true },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["h" /* ToggleButton */], { text: words.speedBackHalf, hotkey: "1" }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["h" /* ToggleButton */], { text: words.speedBackQuarter, hotkey: "2" }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["h" /* ToggleButton */], { text: words.stop, hotkey: "3", color: 0 /* Primary */ }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["h" /* ToggleButton */], { text: words.speedQuarter, hotkey: "4" }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["h" /* ToggleButton */], { text: words.speedHalf, hotkey: "5" }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["h" /* ToggleButton */], { text: words.speedThreeQuarter, hotkey: "6" }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["h" /* ToggleButton */], { text: words.speedFull, hotkey: "7" }))));
    };
    Helm.prototype.renderTouch = function () {
        var words = this.props.text.systems.helm;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system helm helm--touchInput" }, "This is the helm system. TODO: implement this!");
    };
    Helm.prototype.renderGamepad = function () {
        var words = this.props.text.systems.helm;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system helm helm--gamepadInput" }, "This is the helm system. TODO: implement this!");
    };
    return Helm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
        inputMode: state.user.inputMode,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(Helm));


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helm__ = __webpack_require__(40);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Helm__["a"]; });



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comms__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__comms__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__damage__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__damage__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helm__ = __webpack_require__(41);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__helm__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__power__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__power__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sensors__ = __webpack_require__(46);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__sensors__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__viewscreen__ = __webpack_require__(48);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_5__viewscreen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__warp__ = __webpack_require__(50);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__warp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__weapons__ = __webpack_require__(52);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__weapons__["a"]; });










/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PowerManagement_scss__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PowerManagement_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__PowerManagement_scss__);
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



var PowerManagement = (function (_super) {
    __extends(PowerManagement, _super);
    function PowerManagement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PowerManagement.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system" }, "This is the power management system. TODO: implement this!");
    };
    return PowerManagement;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(PowerManagement));


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PowerManagement__ = __webpack_require__(43);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__PowerManagement__["a"]; });



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sensors_scss__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sensors_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Sensors_scss__);
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



var Sensors = (function (_super) {
    __extends(Sensors, _super);
    function Sensors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sensors.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system" }, "This is the sensors system. TODO: implement this!");
    };
    return Sensors;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(Sensors));


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sensors__ = __webpack_require__(45);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Sensors__["a"]; });



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ViewScreen_scss__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ViewScreen_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ViewScreen_scss__);
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



var ViewScreen = (function (_super) {
    __extends(ViewScreen, _super);
    function ViewScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewScreen.prototype.render = function () {
        switch (this.props.inputMode) {
            case 0 /* KeyboardAndMouse */:
                return this.renderButtons();
            case 1 /* Touchscreen */:
                return this.renderTouch();
            case 2 /* Gamepad */:
                return this.renderGamepad();
        }
    };
    ViewScreen.prototype.renderButtons = function () {
        var words = this.props.text.systems.view;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system system--buttonInput" }, "This is the viewscreen system. TODO: implement this!");
    };
    ViewScreen.prototype.renderTouch = function () {
        var words = this.props.text.systems.view;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system system--touchInput" }, "This is the viewscreen system. TODO: implement this!");
    };
    ViewScreen.prototype.renderGamepad = function () {
        var words = this.props.text.systems.view;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system system--gamepadInput" }, "This is the viewscreen system. TODO: implement this!");
    };
    return ViewScreen;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
        inputMode: state.user.inputMode,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(ViewScreen));


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ViewScreen__ = __webpack_require__(47);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ViewScreen__["a"]; });



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Warp_scss__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Warp_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Warp_scss__);
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



var Warp = (function (_super) {
    __extends(Warp, _super);
    function Warp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Warp.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system" }, "This is the warp system. TODO: implement this!");
    };
    return Warp;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(Warp));


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Warp__ = __webpack_require__(49);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Warp__["a"]; });



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Weapons_scss__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Weapons_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Weapons_scss__);
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



var Weapons = (function (_super) {
    __extends(Weapons, _super);
    function Weapons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Weapons.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system" }, "This is the weapons system. TODO: implement this!");
    };
    return Weapons;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(Weapons));


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Weapons__ = __webpack_require__(51);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Weapons__["a"]; });



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_Crew__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(5);



var Connection = (function () {
    function Connection(url) {
        var _this = this;
        this.socket = new WebSocket(url);
        this.socket.onerror = this.socket.onclose = function () { return __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].showError(__WEBPACK_IMPORTED_MODULE_0__Client__["store"].getState().user.text.errors.connectionLost)); };
        this.socket.onmessage = function (e) { return _this.messageReceived(e); };
        this.socket.onopen = function () { return _this.connected(); };
        this.close = function () { return _this.socket.close(); };
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
            case 'player': {
                pos = data.indexOf(' ');
                var playerID = parseInt(data.substr(0, pos));
                var playerName = data.substr(pos + 1);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_Crew__["a" /* actionCreators */].updatePlayer(playerID, playerName));
                break;
            }
            case 'playersys': {
                pos = data.indexOf(' ');
                var playerID = parseInt(data.substr(0, pos));
                var systems = parseInt(data.substr(pos + 1));
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_Crew__["a" /* actionCreators */].setPlayerSystems(playerID, systems));
                break;
            }
            case 'viewsys': {
                pos = data.indexOf(' ');
                var playerID = parseInt(data.substr(0, pos));
                var system = parseInt(data.substr(pos + 1));
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_Crew__["a" /* actionCreators */].setActiveSystem(playerID, system === 0 ? undefined : system));
                break;
            }
            case 'disconnect':
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_Crew__["a" /* actionCreators */].removePlayer(parseInt(data)));
                break;
            case 'setup+': {
                var playerID = parseInt(data);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_Crew__["a" /* actionCreators */].setSetupPlayer(playerID));
                if (playerID === __WEBPACK_IMPORTED_MODULE_0__Client__["store"].getState().crew.localPlayerID) {
                    __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].showGameSetup());
                }
                break;
            }
            case 'setup-':
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_Crew__["a" /* actionCreators */].setSetupPlayer(undefined));
                break;
            case 'game+':
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_Crew__["a" /* actionCreators */].setSetupPlayer(undefined));
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].setGameActive());
                if (__WEBPACK_IMPORTED_MODULE_0__Client__["store"].getState().screen.display !== __WEBPACK_IMPORTED_MODULE_2__store_Screen__["a" /* ClientScreen */].UserSettings) {
                    __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].showGame());
                }
                break;
            case 'game-':
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].setGameFinished());
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].showSystemSelection());
                break;
            case 'pause':
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].setGamePaused());
                if (__WEBPACK_IMPORTED_MODULE_0__Client__["store"].getState().screen.display !== __WEBPACK_IMPORTED_MODULE_2__store_Screen__["a" /* ClientScreen */].UserSettings) {
                    __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].showSystemSelection());
                }
                break;
            case 'already_started':
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].setGameActive());
                break;
            case 'already_paused':
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_2__store_Screen__["b" /* actionCreators */].setGamePaused());
                break;
            default:
                console.log("Unexpected command: " + cmd);
                break;
        }
    };
    return Connection;
}());



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hotkeys; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_User__ = __webpack_require__(8);


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
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_1__store_User__["a" /* actionCreators */].showHotkeys(!__WEBPACK_IMPORTED_MODULE_0__Client__["store"].getState().user.showingHotkeys));
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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Localisations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__localisations_English__ = __webpack_require__(57);

var Localisations = [
    {
        name: 'English',
        flag: 'english.png',
        load: function () { return __WEBPACK_IMPORTED_MODULE_0__localisations_English__["a" /* default */]; },
    }
];


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShipSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return allSystems; });
/* harmony export (immutable) */ __webpack_exports__["b"] = getSystemName;
var ShipSystem;
(function (ShipSystem) {
    ShipSystem[ShipSystem["Helm"] = 1] = "Helm";
    ShipSystem[ShipSystem["Warp"] = 2] = "Warp";
    ShipSystem[ShipSystem["Weapons"] = 4] = "Weapons";
    ShipSystem[ShipSystem["Sensors"] = 8] = "Sensors";
    ShipSystem[ShipSystem["PowerManagement"] = 16] = "PowerManagement";
    ShipSystem[ShipSystem["DamageControl"] = 32] = "DamageControl";
    ShipSystem[ShipSystem["ViewScreen"] = 64] = "ViewScreen";
    ShipSystem[ShipSystem["Communications"] = 128] = "Communications";
})(ShipSystem || (ShipSystem = {}));
var allSystems = [
    ShipSystem.Helm,
    ShipSystem.Warp,
    ShipSystem.Weapons,
    ShipSystem.Sensors,
    ShipSystem.PowerManagement,
    ShipSystem.DamageControl,
    ShipSystem.Communications,
    ShipSystem.ViewScreen,
];
function getSystemName(system, text) {
    switch (system) {
        case ShipSystem.Helm:
            return text.systemNames.helm;
        case ShipSystem.Warp:
            return text.systemNames.warp;
        case ShipSystem.Weapons:
            return text.systemNames.weapons;
        case ShipSystem.Sensors:
            return text.systemNames.sensors;
        case ShipSystem.PowerManagement:
            return text.systemNames.power;
        case ShipSystem.DamageControl:
            return text.systemNames.damage;
        case ShipSystem.Communications:
            return text.systemNames.comms;
        case ShipSystem.ViewScreen:
            return text.systemNames.view;
        default:
            var exhaustiveCheck = system;
    }
}


/***/ }),
/* 57 */
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
            rotation: 'Rotation',
            translation: 'Translation',
            speed: 'Speed',
            stop: 'Stop',
            up: 'Up',
            down: 'Down',
            left: 'Left',
            right: 'Right',
            speedBackHalf: '-1/2',
            speedBackQuarter: '-1/4',
            speedQuarter: '1/4',
            speedHalf: '1/2',
            speedThreeQuarter: '3/4',
            speedFull: 'Full',
        },
        warp: {},
        weapons: {},
        sensors: {},
        power: {},
        damage: {},
        comms: {},
        view: {},
    },
};
/* harmony default export */ __webpack_exports__["a"] = (words);


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Crew__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Screen__ = __webpack_require__(5);



// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    user: __WEBPACK_IMPORTED_MODULE_0__User__["b" /* reducer */],
    crew: __WEBPACK_IMPORTED_MODULE_1__Crew__["b" /* reducer */],
    screen: __WEBPACK_IMPORTED_MODULE_2__Screen__["d" /* reducer */],
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 60 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 61 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 63 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 64 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 65 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 66 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 67 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 68 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 69 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 70 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 71 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 72 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 73 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 74 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 75 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(77);
} else {
  module.exports = require('./AppContainer.dev');
}

/***/ }),
/* 77 */
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(79);
} else {
  module.exports = require('./index.dev');
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.AppContainer = __webpack_require__(76);

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,React.createElement("polyline",{"points":"22 12 18 12 15 21 9 3 6 12 2 12"}));
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-activity"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("path",{"d":"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","key":0}),React.createElement("line",{"x1":"12","y1":"9","x2":"12","y2":"13","key":1}),React.createElement("line",{"x1":"12","y1":"17","x2":"12","y2":"17","key":2})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-alert-triangle"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"12","cy":"12","r":"10","key":0}),React.createElement("polygon",{"points":"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-compass"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"12","cy":"12","r":"10","key":0}),React.createElement("line",{"x1":"22","y1":"12","x2":"18","y2":"12","key":1}),React.createElement("line",{"x1":"6","y1":"12","x2":"2","y2":"12","key":2}),React.createElement("line",{"x1":"12","y1":"6","x2":"12","y2":"2","key":3}),React.createElement("line",{"x1":"12","y1":"22","x2":"12","y2":"18","key":4})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-crosshair"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("path",{"d":"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","key":0}),React.createElement("circle",{"cx":"12","cy":"12","r":"10","key":1}),React.createElement("line",{"x1":"12","y1":"17","x2":"12","y2":"17","key":2})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-help-circle"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,React.createElement("polygon",{"points":"3 11 22 2 13 21 11 13 3 11"}));
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-navigation"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("rect",{"x":"6","y":"4","width":"4","height":"16","key":0}),React.createElement("rect",{"x":"14","y":"4","width":"4","height":"16","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-pause"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,React.createElement("path",{"d":"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}));
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-phone-call"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("path",{"d":"M18.36 6.64a9 9 0 1 1-12.73 0","key":0}),React.createElement("line",{"x1":"12","y1":"2","x2":"12","y2":"12","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-power"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("polyline",{"points":"23 4 23 10 17 10","key":0}),React.createElement("polyline",{"points":"1 20 1 14 7 14","key":1}),React.createElement("path",{"d":"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15","key":2})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-refresh-cw"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("polygon",{"points":"19 20 9 12 19 4 19 20","key":0}),React.createElement("line",{"x1":"5","y1":"19","x2":"5","y2":"5","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-skip-back"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("polygon",{"points":"5 4 15 12 5 20 5 4","key":0}),React.createElement("line",{"x1":"19","y1":"5","x2":"19","y2":"19","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-skip-forward"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("polygon",{"points":"23 7 16 12 23 17 23 7","key":0}),React.createElement("rect",{"x":"1","y":"5","width":"15","height":"14","rx":"2","ry":"2","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-video"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(142);

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(143);

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(73);

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map