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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(6))(6);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(6))(140);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buttons__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonSet__ = __webpack_require__(17);
/* unused harmony reexport ButtonSet */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Canvas__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_2__Canvas__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Choice__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__Choice__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Coordinate__ = __webpack_require__(45);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_4__Coordinate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Field__ = __webpack_require__(46);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__Field__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__FlexibleCanvas__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_6__FlexibleCanvas__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Icons__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__Icons__["b"]; });
/* unused harmony reexport renderIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__NumericTextbox__ = __webpack_require__(47);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__NumericTextbox__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Panel__ = __webpack_require__(48);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_9__Panel__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ProgressBar__ = __webpack_require__(49);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_10__ProgressBar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Screen__ = __webpack_require__(50);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_11__Screen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Textbox__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_12__Textbox__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__TouchArea__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_13__TouchArea__["a"]; });
















/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connection", function() { return connection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configureStore__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_ScreenManager__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__functionality__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Client_scss__ = __webpack_require__(40);
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Connection__ = __webpack_require__(98);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Connection__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cube__ = __webpack_require__(104);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_1__cube__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Hotkeys__ = __webpack_require__(99);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__Hotkeys__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Localisation__ = __webpack_require__(100);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__Localisation__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__math__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_4__math__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_4__math__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__math__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sensors__ = __webpack_require__(32);
/* unused harmony reexport JumpPath */
/* unused harmony reexport SensorTarget */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__sensors__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ShipSystem__ = __webpack_require__(101);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__ShipSystem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_6__ShipSystem__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__ShipSystem__["b"]; });









/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShipSystemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_systems_Options__ = __webpack_require__(62);
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


var ShipSystemComponent = (function (_super) {
    __extends(ShipSystemComponent, _super);
    function ShipSystemComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShipSystemComponent.prototype.componentWillMount = function () {
        this.loadOptions();
    };
    ShipSystemComponent.prototype.renderOptions = function () {
        var _this = this;
        var options = [];
        var labels = this.getOptionLabels();
        var _loop_1 = function (opt) {
            var label = labels[opt];
            var val = this_1.state[opt];
            if (typeof val === 'boolean') {
                options.push(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_systems_Options__["a" /* BooleanOption */], { key: opt, label: label, value: val, changeValue: function (v) { return _this.changeBooleanOption(opt, v); }, text: this_1.props.text }));
            }
            else {
                throw 'Unable to handle non-boolean options in system state';
            }
        };
        var this_1 = this;
        for (var opt in this.state) {
            _loop_1(opt);
        }
        if (options.length === 0) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemOptions systemOptions--empty" }, this.props.text.common.noOptions);
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemOptions" }, options);
    };
    ShipSystemComponent.prototype.renderHelp = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHelp" }, this.getHelpText());
    };
    ShipSystemComponent.prototype.loadOptions = function () {
        var state = {};
        for (var opt in this.state) {
            var strVal = localStorage.getItem(this.name() + " " + opt);
            if (strVal === null) {
                continue;
            }
            var prevVal = this.state[opt];
            if (typeof prevVal === 'boolean') {
                state[opt] = strVal === 'true' ? true : false;
            }
            else {
                state[opt] = strVal;
            }
        }
        this.setState(state);
    };
    ShipSystemComponent.prototype.saveOption = function (opt, val) {
        localStorage.setItem(this.name() + " " + opt, val.toString());
    };
    ShipSystemComponent.prototype.changeBooleanOption = function (opt, val) {
        this.saveOption(opt, val);
        var newState = {};
        newState[opt] = val;
        this.setState(newState);
    };
    return ShipSystemComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = vendor_a65b3acf96981fd3289a;

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functionality__ = __webpack_require__(4);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functionality__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_general_Icons__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buttons_scss__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buttons_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__buttons_scss__);
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
        if (this.props.noBorder)
            classes += ' button--noBorder';
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
        var icon = this.props.icon === undefined ? undefined : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__components_general_Icons__["a" /* renderIcon */])(this.props.icon, this.props.iconSize);
        var text = this.props.text === undefined ? undefined : this.props.text;
        var subtext = this.props.subtext === undefined ? undefined : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "button__subtext" }, this.props.subtext);
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: this.determineClasses(), disabled: this.props.disabled, onMouseDown: this.props.disabled ? undefined : this.props.mouseDown, onMouseUp: this.props.disabled ? undefined : this.props.mouseUp, onMouseLeave: this.props.disabled ? undefined : this.props.mouseLeave, onTouchStart: this.props.disabled ? undefined : this.props.mouseDown, onTouchEnd: this.props.disabled ? undefined : this.props.mouseUp, onClick: this.props.disabled ? undefined : this.props.mouseClick, "data-hotkey": this.props.hotkey, type: this.props.buttonType, title: this.props.title },
            icon,
            text,
            subtext);
    };
    Button.prototype.keyDown = function (e) {
        if (this.props.mouseDown !== undefined)
            this.props.mouseDown();
    };
    Button.prototype.keyUp = function (e) {
        if (this.props.mouseUp !== undefined)
            this.props.mouseUp();
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Matrix__ = __webpack_require__(105);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__Matrix__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Vector2__ = __webpack_require__(106);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Vector2__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Vector3__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__Vector3__["a"]; });





/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorTarget; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functionality_math__ = __webpack_require__(10);

var SensorTarget = (function () {
    function SensorTarget(id, position) {
        this.id = id;
        this.position = position;
    }
    SensorTarget.prototype.interpolate = function (interval) { };
    SensorTarget.prototype.draw = function (ctx, display, screenPos, markerZ) {
        var floorPos = display.transform(new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](this.position.x, this.position.y, markerZ)).position;
        this.drawShadow(ctx, display, floorPos);
        this.drawIndicator(ctx, screenPos, display, floorPos);
        this.drawTarget(ctx, screenPos, display);
    };
    SensorTarget.prototype.isBetween = function (min, max) {
        return this.position.isBetween(min, max);
    };
    SensorTarget.prototype.drawShadow = function (ctx, display, floorPos) {
        var radius = this.getShadowRadius(display);
        if (radius <= 0) {
            return;
        }
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#000';
        ctx.filter = 'blur(5px)';
        // skew so that shadow fits onto the "floor" plane
        ctx.translate(floorPos.x, floorPos.y);
        ctx.scale(1, 0.4);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };
    SensorTarget.prototype.drawIndicator = function (ctx, targetPos, display, floorPos) {
        // draw a depth indicator, showing Z height against axis more clearly
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = display.onePixel;
        var zScale = 1;
        var dashSize = display.onePixel * 3;
        ctx.setLineDash([dashSize, dashSize]);
        ctx.beginPath();
        ctx.lineTo(floorPos.x, floorPos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(floorPos.x - dashSize, floorPos.y);
        ctx.lineTo(floorPos.x + dashSize, floorPos.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
    };
    return SensorTarget;
}());



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FieldGroup; });
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

var FieldGroup = (function (_super) {
    __extends(FieldGroup, _super);
    function FieldGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldGroup.prototype.render = function () {
        var _this = this;
        var classes = 'fieldGroup';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }
        var label = this.props.label === undefined ? undefined : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "fieldGroup__label" }, this.props.label);
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes, ref: function (r) { return _this.root = r; } },
            label,
            this.props.children));
    };
    return FieldGroup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Helm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functionality__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_systems_ShipSystemComponent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ButtonHelm__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TouchHelm__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Helm_scss__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Helm_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Helm_scss__);
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







var orientation = new __WEBPACK_IMPORTED_MODULE_2__functionality__["j" /* OrientationCube */]();
var Helm = (function (_super) {
    __extends(Helm, _super);
    function Helm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Helm.prototype.name = function () { return 'helm'; };
    Helm.prototype.getHelpText = function () {
        return this.props.text.systemHelp.helm;
    };
    Helm.prototype.getOptionLabels = function () {
        return this.props.text.systems.helm;
    };
    Helm.prototype.render = function () {
        var _this = this;
        switch (this.props.inputMode) {
            case 0 /* KeyboardAndMouse */:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__ButtonHelm__["a" /* ButtonHelm */], __assign({}, this.props, { drawOrientation: function (ctx, w, h) { return _this.drawOrientation(ctx, w, h); } }));
            case 1 /* Touchscreen */:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__TouchHelm__["a" /* TouchHelm */], __assign({}, this.props, { drawOrientation: function (ctx, w, h) { return _this.drawOrientation(ctx, w, h); } }));
            case 2 /* Gamepad */:
                return this.renderGamepad();
        }
    };
    Helm.prototype.renderTouch = function () {
        var words = this.props.text.systems.helm;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system helm helm--touchInput" }, "This is the helm system. TODO: implement this!");
    };
    Helm.prototype.renderGamepad = function () {
        var words = this.props.text.systems.helm;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system helm helm--gamepadInput" }, "This is the helm system. TODO: implement this!");
    };
    Helm.prototype.drawOrientation = function (ctx, width, height) {
        var halfWidth = width / 2, halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.translate(halfWidth, halfHeight);
        ctx.fillStyle = '#0c0';
        orientation.draw(ctx, Math.min(halfWidth, halfHeight) * 0.65, this.props.pitch, this.props.yaw, this.props.roll);
        ctx.translate(-halfWidth, -halfHeight);
    };
    Helm.clamp = function (val) {
        val = Math.round(val);
        if (val < 0) {
            val += 360;
        }
        else if (val >= 360) {
            val -= 360;
        }
        return val;
    };
    Helm.magnitude = function (x, y, z) {
        return Math.round(Math.sqrt(x * x + y * y + z * z));
    };
    return Helm;
}(__WEBPACK_IMPORTED_MODULE_3__components_systems_ShipSystemComponent__["a" /* ShipSystemComponent */]));

// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return __assign({}, state.helm, { text: state.user.text, inputMode: state.user.inputMode });
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {}, null, { withRef: true })(Helm));


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vector3; });
var Vector3 = (function () {
    function Vector3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.clone = function () {
        return new Vector3(this.x, this.y, this.z);
    };
    Vector3.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    };
    Vector3.prototype.subtract = function (other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    };
    Vector3.prototype.scale = function (factor) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
        return this;
    };
    Vector3.prototype.isBetween = function (min, max) {
        return this.x >= min.x && this.x <= max.x
            && this.y >= min.y && this.y <= max.y
            && this.z >= min.z && this.z <= max.z;
    };
    Vector3.prototype.rotateX = function (angle) {
        var cosa = Math.cos(angle);
        var sina = Math.sin(angle);
        var prevY = this.y;
        this.y = this.y * cosa + this.z * sina;
        this.z = this.z * cosa - prevY * sina;
        return this;
    };
    Vector3.prototype.rotateY = function (angle) {
        var cosa = Math.cos(angle);
        var sina = Math.sin(angle);
        var prevZ = this.z;
        this.z = this.z * cosa + this.x * sina;
        this.x = this.x * cosa - prevZ * sina;
        return this;
    };
    Vector3.prototype.rotateZ = function (angle) {
        var cosa = Math.cos(angle);
        var sina = Math.sin(angle);
        var prevX = this.x;
        this.x = this.x * cosa + this.y * sina;
        this.y = this.y * cosa - prevX * sina;
        return this;
    };
    Vector3.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    };
    Vector3.prototype.cross = function (other) {
        return new Vector3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
    };
    Vector3.distanceSq = function (a, b) {
        return (a.x - b.x) * (a.x - b.x)
            + (a.y - b.y) * (a.y - b.y)
            + (a.z - b.z) * (a.z - b.z);
    };
    return Vector3;
}());



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return numCells; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return maxNumSpare; });
/* unused harmony export fullPowerLevel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return reducer; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var numCells = 121;
var maxNumSpare = 5;
var fullPowerLevel = 10;
var numCellColumns = 11;
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    setReactorPower: function (val) { return ({
        type: 'REACTOR_POWER',
        value: val,
    }); },
    setHeatLevels: function (val, rate) { return ({
        type: 'HEAT_LEVELS',
        value: val,
        rate: rate,
    }); },
    setCellType: function (cellID, cellType) { return ({
        type: 'SET_CELL_T',
        cellID: cellID,
        cellType: cellType,
    }); },
    setAllCellTypes: function (cellTypes) { return ({
        type: 'SET_ALL_CELLS_T',
        cellTypes: cellTypes,
    }); },
    setCellPower: function (cellID, cellPower) { return ({
        type: 'SET_CELL_P',
        cellID: cellID,
        cellPower: cellPower,
    }); },
    setAllCellPower: function (cellPower) { return ({
        type: 'SET_ALL_CELLS_P',
        cellPower: cellPower,
    }); },
    setAllSystems: function (systems) { return ({
        type: 'SYSTEM_ALL',
        systems: systems,
    }); },
    addSpareCell: function (cellType) { return ({
        type: 'ADD_SPARE_CELL',
        cellType: cellType,
    }); },
    removeSpareCell: function (spareNum) { return ({
        type: 'REM_SPARE_CELL',
        spare: spareNum,
    }); },
    setAllSpareCells: function (cellTypes) { return ({
        type: 'ALL_SPARE_CELL',
        cellTypes: cellTypes,
    }); },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var cells = [];
for (var i = 0; i < numCells; i++) {
    cells.push({
        index: i,
        row: cellIndexToRow(i),
        col: cellIndexToCol(i),
        type: 0 /* Empty */,
        power: 0
    });
}
var unloadedState = {
    cells: cells,
    reactorPower: 100,
    heatLevel: 0,
    heatRate: 0,
    spareCells: [],
};
var reducer = function (state, rawAction) {
    var action = rawAction;
    switch (action.type) {
        case 'REACTOR_POWER': {
            return __assign({}, state, { reactorPower: action.value });
        }
        case 'HEAT_LEVELS': {
            return __assign({}, state, { heatLevel: action.value, heatRate: action.rate });
        }
        case 'SET_CELL_T': {
            var cells_1 = state.cells.slice();
            cells_1[action.cellID].type = action.cellType;
            return __assign({}, state, { cells: cells_1 });
        }
        case 'SET_ALL_CELLS_T': {
            var cells_2 = state.cells.slice();
            for (var i = 0; i < cells_2.length; i++) {
                cells_2[i].type = action.cellTypes[i];
            }
            return __assign({}, state, { cells: cells_2 });
        }
        case 'SET_CELL_P': {
            var cells_3 = state.cells.slice();
            cells_3[action.cellID].power = action.cellPower;
            return __assign({}, state, { cells: cells_3 });
        }
        case 'SET_ALL_CELLS_P': {
            var cells_4 = state.cells.slice();
            for (var i = 0; i < cells_4.length; i++) {
                cells_4[i].power = action.cellPower[i];
            }
            return __assign({}, state, { cells: cells_4 });
        }
        case 'SYSTEM_ALL': {
            var cells_5 = state.cells.slice();
            for (var _i = 0, _a = action.systems; _i < _a.length; _i++) {
                var system = _a[_i];
                var startCell = cells_5[system.start];
                startCell.system = system.system;
                startCell.endCol = cellIndexToCol(system.end) + 1;
                startCell.endRow = cellIndexToRow(system.end) + 1;
            }
            return __assign({}, state, { cells: cells_5 });
        }
        case 'ADD_SPARE_CELL': {
            var spares = state.spareCells.slice();
            spares.push(action.cellType);
            return __assign({}, state, { spareCells: spares });
        }
        case 'REM_SPARE_CELL': {
            var spares = state.spareCells.slice(0, action.spare).concat(state.spareCells.slice(action.spare + 1));
            return __assign({}, state, { spareCells: spares });
        }
        case 'ALL_SPARE_CELL': {
            return __assign({}, state, { spareCells: action.cellTypes });
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};
function cellIndexToCol(cellIndex) {
    return cellIndex % numCellColumns + 1;
}
function cellIndexToRow(cellIndex) {
    return Math.floor(cellIndex / numCellColumns) + 1;
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functionality_sensors__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functionality_math_Vector3__ = __webpack_require__(14);
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
    clearAll: function () { return ({
        type: 'CLEAR_PATHS',
    }); },
    addPath: function (id, status, points, power) { return ({
        type: 'ADD_PATH',
        id: id,
        status: status,
        points: points,
        power: power,
    }); },
    extendPath: function (id, points) { return ({
        type: 'EXTEND_PATH',
        id: id,
        points: points,
    }); },
    setPathStatus: function (id, status) { return ({
        type: 'SET_PATH_STATUS',
        id: id,
        status: status,
    }); },
    removePath: function (id) { return ({
        type: 'REMOVE_PATH',
        id: id,
    }); },
    setScreenStatus: function (status) { return ({
        type: 'SET_WARP_STATUS',
        status: status,
    }); },
    setShipPosition: function (x, y, z) { return ({
        type: 'SET_SHIP_POSITION',
        pos: new __WEBPACK_IMPORTED_MODULE_1__functionality_math_Vector3__["a" /* Vector3 */](x, y, z),
    }); },
    chargeJump: function (pathID, duration, completion) {
        var endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + duration);
        return {
            type: 'CHARGE_JUMP',
            pathID: pathID,
            endTime: endTime,
            completion: completion,
        };
    },
    performJump: function (pathID, duration) {
        var endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + duration);
        return {
            type: 'DO_JUMP',
            pathID: pathID,
            endTime: endTime,
        };
    },
    selectPath: function (pathID) { return ({
        type: 'SELECT_PATH',
        pathID: pathID,
    }); }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = {
    paths: [],
    status: 0 /* Viewing */,
    chargeCompletion: 0,
    jumpStartEntranceRange: 100,
    shipPosition: new __WEBPACK_IMPORTED_MODULE_1__functionality_math_Vector3__["a" /* Vector3 */](0, 0, 0),
};
var reducer = function (state, rawAction) {
    var action = rawAction;
    switch (action.type) {
        case 'CLEAR_PATHS': {
            var retVal = __assign({}, state, { paths: [] });
            delete retVal.jumpEndTime;
            delete retVal.activePath;
            return retVal;
        }
        case 'ADD_PATH': {
            // determine if path is in range of ship or not
            var pathStatus = action.status;
            if (pathStatus === 3 /* Plotted */ && isInJumpRange(state, action.points[0])) {
                pathStatus = 4 /* InRange */;
            }
            var pathIsNew_1 = true;
            var addingPath_1 = new __WEBPACK_IMPORTED_MODULE_0__functionality_sensors__["a" /* JumpPath */](action.id, action.power, pathStatus, action.points);
            // if path ID already exists, overwrite. Otherwise, add.
            var paths = state.paths.map(function (path, index) {
                if (path.id === action.id) {
                    pathIsNew_1 = false;
                    return addingPath_1;
                }
                return path;
            });
            if (pathIsNew_1) {
                paths.push(addingPath_1);
            }
            // when path is sent again when it finishes calculating, switch screen status
            var status_1 = state.status === 2 /* Calculating */ && action.status !== 1 /* Calculating */
                ? 4 /* CalculationConfirm */
                : state.status;
            return __assign({}, state, { paths: paths, status: status_1 });
        }
        case 'EXTEND_PATH': {
            var paths = state.paths.map(function (path, index) {
                if (path.id === action.id) {
                    return new __WEBPACK_IMPORTED_MODULE_0__functionality_sensors__["a" /* JumpPath */](path.id, path.power, path.status, path.points.concat(action.points));
                }
                return path;
            });
            return __assign({}, state, { paths: paths });
        }
        case 'SET_PATH_STATUS': {
            var paths = state.paths.map(function (path, index) {
                if (path.id === action.id) {
                    return Object.assign({}, path, {
                        status: action.status,
                    });
                }
                return path;
            });
            // if we just calculated this path, it was a failure
            var status_2 = state.status === 2 /* Calculating */ && action.status !== 1 /* Calculating */
                ? 3 /* CalculationFailed */
                : state.status;
            return __assign({}, state, { paths: paths, status: status_2 });
        }
        case 'REMOVE_PATH': {
            var paths = state.paths.filter(function (paths) { return paths.id !== action.id; });
            var retVal = __assign({}, state, { paths: paths });
            if (retVal.activePath !== undefined && retVal.activePath.id === action.id) {
                delete retVal.activePath;
            }
            return retVal;
        }
        case 'SET_WARP_STATUS': {
            var retVal = __assign({}, state, { status: action.status });
            delete retVal.jumpEndTime;
            delete retVal.activePath;
            return retVal;
        }
        case 'CHARGE_JUMP': {
            var paths = state.paths.filter(function (p) { return p.id === action.pathID; });
            var path = paths.length > 0 ? paths[0] : undefined;
            return __assign({}, state, { status: 5 /* Charging */, activePath: path, jumpEndTime: action.endTime, chargeCompletion: action.completion });
        }
        case 'DO_JUMP': {
            var paths = state.paths.filter(function (p) { return p.id === action.pathID; });
            var path = paths.length > 0 ? paths[0] : undefined;
            return __assign({}, state, { status: 6 /* Jumping */, activePath: path, jumpEndTime: action.endTime, chargeCompletion: 100 });
        }
        case 'SELECT_PATH': {
            var path = void 0;
            if (action.pathID !== undefined) {
                var paths = state.paths.filter(function (p) { return p.id === action.pathID; });
                path = paths.length > 0 ? paths[0] : undefined;
            }
            if (state.activePath !== undefined) {
                state.activePath.highlighted = false;
            }
            if (path !== undefined) {
                path.highlighted = true;
            }
            return __assign({}, state, { activePath: path });
        }
        case 'SET_SHIP_POSITION': {
            // update stored paths, indicating if they're in range or not
            var paths = state.paths.map(function (path, index) { return updatePathStatus(path, state); });
            var activePath = state.activePath;
            if (activePath !== undefined) {
                var prev_1 = activePath;
                activePath = paths.filter(function (p) { return p.id === prev_1.id; })[0];
            }
            return __assign({}, state, { shipPosition: action.pos, paths: paths, activePath: activePath });
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};
function isInJumpRange(state, point) {
    var distSq = __WEBPACK_IMPORTED_MODULE_1__functionality_math_Vector3__["a" /* Vector3 */].distanceSq(state.shipPosition, point);
    return distSq < state.jumpStartEntranceRange * state.jumpStartEntranceRange;
}
function updatePathStatus(path, state) {
    if (path.status !== 4 /* InRange */ && path.status !== 3 /* Plotted */) {
        return path;
    }
    var status = isInJumpRange(state, path.points[0])
        ? 4 /* InRange */ : 3 /* Plotted */;
    if (path.status === status) {
        return path;
    }
    return new __WEBPACK_IMPORTED_MODULE_0__functionality_sensors__["a" /* JumpPath */](path.id, path.power, status, path.points);
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buttons__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonSet_scss__ = __webpack_require__(116);
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
        this.redraw();
    };
    Canvas.prototype.componentDidUpdate = function () {
        this.redraw();
    };
    Canvas.prototype.redraw = function () {
        this.props.draw(this.ctx, this.props.width, this.props.height);
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
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexibleCanvas; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Canvas__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FlexibleCanvas_scss__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FlexibleCanvas_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FlexibleCanvas_scss__);
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



var FlexibleCanvas = (function (_super) {
    __extends(FlexibleCanvas, _super);
    function FlexibleCanvas(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: 0,
            height: 0,
        };
        return _this;
    }
    Object.defineProperty(FlexibleCanvas.prototype, "wrapper", {
        get: function () { return this._wrapper; },
        enumerable: true,
        configurable: true
    });
    FlexibleCanvas.prototype.componentDidMount = function () {
        var _this = this;
        this.resizeListener = function () { return _this.updateSize(); };
        window.addEventListener('resize', this.resizeListener);
        this.updateSize();
    };
    FlexibleCanvas.prototype.componentWillUnmount = function () {
        if (this.resizeListener !== undefined) {
            window.removeEventListener('resize', this.resizeListener);
        }
    };
    FlexibleCanvas.prototype.render = function () {
        var _this = this;
        var classes = 'canvasWrapper';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes, style: this.props.style, ref: function (w) { if (w !== null) {
                _this._wrapper = w;
            } }, onClickCapture: this.props.onClick },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Canvas__["a" /* Canvas */], { ref: function (c) { if (c !== null) {
                    _this.canvas = c;
                } }, width: this.state.width, height: this.state.height, draw: this.props.draw, className: "wrappedCanvas" })));
    };
    FlexibleCanvas.prototype.redraw = function () {
        this.canvas.redraw();
    };
    FlexibleCanvas.prototype.updateSize = function () {
        this.setState({
            width: this._wrapper.offsetWidth,
            height: this._wrapper.offsetHeight,
        });
    };
    return FlexibleCanvas;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Icon; });
/* harmony export (immutable) */ __webpack_exports__["a"] = renderIcon;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var Help = __webpack_require__(154);
var Pause = __webpack_require__(156);
var Refresh = __webpack_require__(159);
var SkipBack = __webpack_require__(163);
var SkipForward = __webpack_require__(164);
var X = __webpack_require__(166);
var ArrowUp = __webpack_require__(151);
var ArrowDown = __webpack_require__(148);
var ArrowLeft = __webpack_require__(149);
var ArrowRight = __webpack_require__(150);
var RotateCCW = __webpack_require__(160);
var RotateCW = __webpack_require__(161);
var Settings = __webpack_require__(162);
var HelmIcon = __webpack_require__(155);
var WarpIcon = __webpack_require__(152);
var WeaponsIcon = __webpack_require__(153);
var SensorsIcon = __webpack_require__(146);
var PowerIcon = __webpack_require__(158);
var DamageIcon = __webpack_require__(147);
var ViewScreenIcon = __webpack_require__(165);
var CommunicationsIcon = __webpack_require__(157);
var Icon;
(function (Icon) {
    Icon[Icon["Help"] = 0] = "Help";
    Icon[Icon["Pause"] = 1] = "Pause";
    Icon[Icon["Refresh"] = 2] = "Refresh";
    Icon[Icon["SkipBack"] = 3] = "SkipBack";
    Icon[Icon["SkipForward"] = 4] = "SkipForward";
    Icon[Icon["X"] = 5] = "X";
    Icon[Icon["ArrowUp"] = 6] = "ArrowUp";
    Icon[Icon["ArrowDown"] = 7] = "ArrowDown";
    Icon[Icon["ArrowLeft"] = 8] = "ArrowLeft";
    Icon[Icon["ArrowRight"] = 9] = "ArrowRight";
    Icon[Icon["RotateCCW"] = 10] = "RotateCCW";
    Icon[Icon["RotateCW"] = 11] = "RotateCW";
    Icon[Icon["Settings"] = 12] = "Settings";
    Icon[Icon["Helm"] = 13] = "Helm";
    Icon[Icon["Warp"] = 14] = "Warp";
    Icon[Icon["Weapons"] = 15] = "Weapons";
    Icon[Icon["Sensors"] = 16] = "Sensors";
    Icon[Icon["PowerManagement"] = 17] = "PowerManagement";
    Icon[Icon["DamageControl"] = 18] = "DamageControl";
    Icon[Icon["ViewScreen"] = 19] = "ViewScreen";
    Icon[Icon["Communications"] = 20] = "Communications";
})(Icon || (Icon = {}));
function renderIcon(icon, size) {
    if (size === void 0) { size = 24; }
    var props = {
        width: size,
        height: size,
    };
    switch (icon) {
        case Icon.Help:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Help, __assign({}, props));
        case Icon.Pause:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Pause, __assign({}, props));
        case Icon.Refresh:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Refresh, __assign({}, props));
        case Icon.SkipBack:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](SkipBack, __assign({}, props));
        case Icon.SkipForward:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](SkipForward, __assign({}, props));
        case Icon.X:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](X, __assign({}, props));
        case Icon.ArrowUp:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ArrowUp, __assign({}, props));
        case Icon.ArrowDown:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ArrowDown, __assign({}, props));
        case Icon.ArrowLeft:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ArrowLeft, __assign({}, props));
        case Icon.ArrowRight:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ArrowRight, __assign({}, props));
        case Icon.RotateCCW:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](RotateCCW, __assign({}, props));
        case Icon.RotateCW:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](RotateCW, __assign({}, props));
        case Icon.Settings:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Settings, __assign({}, props));
        case Icon.Helm:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](HelmIcon, __assign({}, props));
        case Icon.Warp:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](WarpIcon, __assign({}, props));
        case Icon.Weapons:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](WeaponsIcon, __assign({}, props));
        case Icon.Sensors:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](SensorsIcon, __assign({}, props));
        case Icon.PowerManagement:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](PowerIcon, __assign({}, props));
        case Icon.DamageControl:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](DamageIcon, __assign({}, props));
        case Icon.ViewScreen:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ViewScreenIcon, __assign({}, props));
        case Icon.Communications:
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](CommunicationsIcon, __assign({}, props));
        default:
            var exhaustiveCheck = icon;
    }
}


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TouchArea__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functionality__ = __webpack_require__(4);
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



var SensorView = (function (_super) {
    __extends(SensorView, _super);
    function SensorView(props) {
        var _this = _super.call(this, props) || this;
        _this.touches = 0;
        _this.state = {
            center: props.targets.length > 0 ? new __WEBPACK_IMPORTED_MODULE_2__functionality__["d" /* Vector3 */](props.targets[0].position.x, props.targets[0].position.y, 0) : new __WEBPACK_IMPORTED_MODULE_2__functionality__["d" /* Vector3 */](0, 0, 0),
            zoom: 1,
            xRotation: 6 * Math.PI / 16,
            yRotation: 0,
            zRotation: Math.PI / 8,
        };
        _this.updateTransform(_this.state);
        return _this;
    }
    SensorView.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var _this = this;
        if (this.state.xRotation !== nextState.xRotation
            || this.state.yRotation !== nextState.yRotation
            || this.state.zRotation !== nextState.zRotation) {
            this.updateTransform(nextState);
        }
        if (this.props.className !== nextProps.className || this.props.autoRotate !== nextProps.autoRotate) {
            return true;
        }
        setTimeout(function () { return _this.touch.redraw(); }, 0); // wait til state/props actually change
        return false;
    };
    SensorView.prototype.componentDidMount = function () {
        if (this.props.autoRotate) {
            this.autoRotateStep();
        }
    };
    SensorView.prototype.componentDidUpdate = function (prevProps, prevState) {
        this.touch.redraw();
        if (this.props.autoRotate) {
            if (!prevProps.autoRotate && this.touches === 0) {
                this.startRotation();
            }
        }
        else if (prevProps.autoRotate) {
            this.stopRotation();
        }
    };
    SensorView.prototype.render = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__TouchArea__["a" /* TouchArea */], { className: this.props.className, draw: function (ctx, w, h) { return _this.drawSensors(ctx, w, h); }, setupTouch: function (a) { return _this.setupTouch(a); }, ref: function (t) { if (t !== null) {
                _this.touch = t;
            } } });
    };
    SensorView.prototype.componentWillUnmount = function () {
        this.stopRotation();
    };
    SensorView.prototype.updateTransform = function (state) {
        this.viewTransform = __WEBPACK_IMPORTED_MODULE_2__functionality__["h" /* Matrix */].yRotation(state.yRotation)
            .multiply(__WEBPACK_IMPORTED_MODULE_2__functionality__["h" /* Matrix */].xRotation(state.xRotation))
            .multiply(__WEBPACK_IMPORTED_MODULE_2__functionality__["h" /* Matrix */].zRotation(state.zRotation));
    };
    SensorView.prototype.drawSensors = function (ctx, width, height) {
        var _this = this;
        var halfWidth = width / 2, halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(halfWidth, halfHeight);
        ctx.scale(this.state.zoom, this.state.zoom);
        var minZ = Number.MAX_VALUE;
        for (var _i = 0, _a = this.props.targets; _i < _a.length; _i++) {
            var target = _a[_i];
            minZ = Math.min(minZ, target.position.z);
        }
        if (minZ === Number.MAX_VALUE) {
            minZ = 0;
        }
        minZ -= 5;
        var display = {
            minX: this.state.center.x - halfWidth,
            minY: this.state.center.y - halfHeight,
            maxX: this.state.center.x + halfWidth,
            maxY: this.state.center.y + halfHeight,
            onePixel: 1 / this.state.zoom,
            transform: function (world) {
                var screen3d = _this.viewTransform.multiplyVector(world.clone().subtract(_this.state.center));
                return {
                    position: new __WEBPACK_IMPORTED_MODULE_2__functionality__["i" /* Vector2 */](screen3d.x, screen3d.y),
                    zDepth: screen3d.z,
                };
            },
        };
        var gridSize = 50;
        var gridExtent = 600 / this.state.zoom;
        var worldMin = new __WEBPACK_IMPORTED_MODULE_2__functionality__["d" /* Vector3 */](Math.round((this.state.center.x - gridExtent) / gridSize) * gridSize, Math.round((this.state.center.y - gridExtent) / gridSize) * gridSize, this.state.center.z - gridExtent);
        var worldMax = new __WEBPACK_IMPORTED_MODULE_2__functionality__["d" /* Vector3 */](Math.round((this.state.center.x + gridExtent) / gridSize) * gridSize, Math.round((this.state.center.y + gridExtent) / gridSize) * gridSize, this.state.center.z + gridExtent * 2);
        this.drawBackground(ctx, display, worldMin, worldMax, gridSize, minZ);
        this.drawRotationMarker(ctx, display, minZ);
        var drawList = this.props.targets
            .filter(function (t) { return t.isBetween(worldMin, worldMax); })
            .map(function (t) {
            var renderPos = display.transform(t.position);
            return {
                target: t,
                screenPos: renderPos.position,
                zDepth: renderPos.zDepth,
            };
        });
        drawList.sort(function (a, b) { return a.zDepth - b.zDepth; });
        for (var _b = 0, drawList_1 = drawList; _b < drawList_1.length; _b++) {
            var drawTarget = drawList_1[_b];
            drawTarget.target.draw(ctx, display, drawTarget.screenPos, minZ);
        }
        ctx.restore();
    };
    SensorView.prototype.drawBackground = function (ctx, display, worldMin, worldMax, gridSize, gridZ) {
        ctx.lineWidth = display.onePixel;
        ctx.strokeStyle = '#fff';
        ctx.beginPath();
        var worldPos = new __WEBPACK_IMPORTED_MODULE_2__functionality__["d" /* Vector3 */](0, 0, gridZ);
        var screenPos;
        for (var x = worldMin.x; x <= worldMax.x; x += gridSize) {
            worldPos.x = x;
            worldPos.y = worldMin.y;
            screenPos = display.transform(worldPos).position;
            ctx.moveTo(screenPos.x, screenPos.y);
            worldPos.y = worldMax.y;
            screenPos = display.transform(worldPos).position;
            ctx.lineTo(screenPos.x, screenPos.y);
        }
        for (var y = worldMin.y; y <= worldMax.y; y += gridSize) {
            worldPos.y = y;
            worldPos.x = worldMin.x;
            screenPos = display.transform(worldPos).position;
            ctx.moveTo(screenPos.x, screenPos.y);
            worldPos.x = worldMax.x;
            screenPos = display.transform(worldPos).position;
            ctx.lineTo(screenPos.x, screenPos.y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
    };
    SensorView.prototype.drawRotationMarker = function (ctx, display, gridZ) {
        var worldPos = new __WEBPACK_IMPORTED_MODULE_2__functionality__["d" /* Vector3 */](this.state.center.x, this.state.center.y, gridZ);
        var screenPos = display.transform(worldPos).position;
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = '#c00';
        ctx.lineWidth = display.onePixel * 4;
        var length = display.onePixel * 12;
        // TODO: skew this to fit perspective
        ctx.beginPath();
        ctx.moveTo(screenPos.x - length, screenPos.y - length);
        ctx.lineTo(screenPos.x + length, screenPos.y + length);
        ctx.moveTo(screenPos.x - length, screenPos.y + length);
        ctx.lineTo(screenPos.x + length, screenPos.y - length);
        ctx.stroke();
        ctx.globalAlpha = 1;
    };
    SensorView.prototype.interactionStarted = function () {
        if (this.touches === 0) {
            this.stopRotation(); // stop auto-rotation immediately
        }
        this.touches++;
    };
    SensorView.prototype.interactionFinished = function () {
        if (this.touches > 0) {
            this.touches--;
        }
        if (this.touches === 0 && this.props.autoRotate) {
            this.startRotation(2000); // start auto-rotation after a delay
        }
    };
    SensorView.prototype.startRotation = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 30; }
        this.autoRotation = setTimeout(function () { return _this.autoRotateStep(); }, delay);
    };
    SensorView.prototype.stopRotation = function () {
        if (this.autoRotation !== undefined) {
            clearTimeout(this.autoRotation);
            this.autoRotation = undefined;
        }
    };
    SensorView.prototype.autoRotateStep = function () {
        this.rotate(0, 0.0025);
        if (this.props.autoRotate) {
            this.startRotation();
        }
    };
    SensorView.prototype.setupTouch = function (area) {
        var _this = this;
        // one-finger / left mouse rotation
        var rotScale = 0.002;
        var rotate = area.createPan2D('rotate', 1, 1, false, function (dx, dy) { return _this.rotate(dy * rotScale, dx * rotScale); }, undefined, function () { return _this.interactionStarted(); }, function () { return _this.interactionFinished(); });
        // 2-finger panning for multitouch
        var pan = area.createPan2D('pan', 2, 1, false, function (dx, dy) { return _this.pan(-dx, -dy); }, function () { return _this.interactionStarted(); }, function () { return _this.interactionFinished(); });
        // right-mouse panning for where multitouch isn't an option
        var rightMouseDown = false;
        area.element.addEventListener('mousedown', function (ev) { if (ev.button !== 0) {
            rightMouseDown = true;
            _this.interactionStarted();
        } });
        area.element.addEventListener('mouseup', function (ev) { if (ev.button !== 0) {
            rightMouseDown = false;
            _this.interactionFinished();
        } });
        area.element.addEventListener('mouseout', function () { if (rightMouseDown) {
            rightMouseDown = false;
            _this.interactionFinished();
        } });
        area.element.addEventListener('mousemove', function (ev) { if (rightMouseDown) {
            _this.pan(-ev.movementX, -ev.movementY);
        } });
        // pinch zooming
        var prevScale = 1;
        var zoom = area.createPinch('zoom', 0.1, function (scale) {
            var touchZoomScale = scale / prevScale;
            if (touchZoomScale > 0.9 && touchZoomScale < 1.1) {
                return;
            }
            prevScale = scale;
            _this.zoom(touchZoomScale);
        }, function () { prevScale = 1; _this.interactionStarted(); }, function () { return _this.interactionFinished(); });
        pan.requireFailure(zoom);
        zoom.requireFailure(pan);
        // mouse wheel zooming
        area.element.addEventListener('wheel', function (ev) {
            if (ev.deltaY == 0) {
                return;
            }
            ev.preventDefault();
            _this.interactionStarted();
            _this.interactionFinished();
            _this.zoom(ev.deltaY < 0 ? 1.1 : 0.9);
        });
    };
    SensorView.prototype.pan = function (screenDx, screenDy) {
        screenDx /= this.state.zoom;
        screenDy /= this.state.zoom;
        var sinRot = Math.sin(this.state.zRotation);
        var cosRot = Math.cos(this.state.zRotation);
        var worldDx = screenDx * cosRot + screenDy * sinRot;
        var worldDy = -screenDx * sinRot + screenDy * cosRot;
        this.setState(function (state) {
            return {
                center: new __WEBPACK_IMPORTED_MODULE_2__functionality__["d" /* Vector3 */](state.center.x + worldDx, state.center.y + worldDy, state.center.z),
            };
        });
    };
    SensorView.prototype.rotate = function (dx, dz) {
        this.setState(function (state) {
            return {
                //xRotation: state.xRotation + dx,
                zRotation: state.zRotation + dz,
            };
        });
    };
    SensorView.prototype.zoom = function (scale) {
        this.setState(function (state) {
            return {
                zoom: state.zoom * scale,
            };
        });
    };
    SensorView.defaultProps = {
        autoRotate: true,
    };
    return SensorView;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Textbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Textbox_scss__ = __webpack_require__(36);
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
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: classes, type: this.props.numeric ? 'numeric' : 'text', value: this.props.text, onChange: function (e) { return _this.props.textChanged(e.target.value); }, placeholder: this.props.placeholder, disabled: this.props.disabled }));
    };
    Textbox.defaultProps = {
        numeric: false,
        disabled: false,
    };
    return Textbox;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TouchArea; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FlexibleCanvas__ = __webpack_require__(19);
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



var TouchArea = (function (_super) {
    __extends(TouchArea, _super);
    function TouchArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TouchArea.prototype, "element", {
        get: function () { return this._element; },
        enumerable: true,
        configurable: true
    });
    TouchArea.prototype.componentDidMount = function () {
        this.hammer = new __WEBPACK_IMPORTED_MODULE_1_hammerjs__["Manager"](this._element);
        this.props.setupTouch(this);
    };
    TouchArea.prototype.render = function () {
        var _this = this;
        var classes = 'touchArea';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }
        return this.props.draw === undefined ?
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes, ref: function (e) { if (e !== null) {
                    _this._element = e;
                } } })
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__FlexibleCanvas__["a" /* FlexibleCanvas */], { className: classes, draw: this.props.draw, ref: function (c) { if (c !== null) {
                    _this.canvas = c;
                    _this._element = c.wrapper;
                } } });
    };
    TouchArea.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return false;
    };
    TouchArea.prototype.addRecogniser = function (recogniser) {
        this.hammer.add(recogniser);
    };
    TouchArea.prototype.removeRecogniser = function (recogniser) {
        this.hammer.remove(recogniser);
    };
    TouchArea.prototype.redraw = function () {
        if (this.canvas !== undefined) {
            this.canvas.redraw();
        }
    };
    TouchArea.prototype.createPan = function (name, pointers, direction, eventScale, clamp, panned, feedback, start, finish) {
        var _this = this;
        var params = {
            event: name,
            pointers: pointers,
            direction: direction,
        };
        var pan = new __WEBPACK_IMPORTED_MODULE_1_hammerjs__["Pan"](params);
        var prevAmount = 0;
        this.hammer.add(pan);
        this.hammer.on(name, function (ev) {
            if (clamp) {
                var panAmount = direction === __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_HORIZONTAL"]
                    ? _this.scaleClampRound(ev.deltaX * eventScale, _this._element.offsetWidth)
                    : _this.scaleClampRound(ev.deltaY * eventScale, _this._element.offsetHeight);
                panned(panAmount);
            }
            else {
                var panAmount = direction === __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_HORIZONTAL"]
                    ? ev.deltaX * eventScale
                    : ev.deltaY * eventScale;
                panned(panAmount - prevAmount);
                prevAmount = panAmount;
            }
            if (feedback !== undefined) {
                var parent_1 = _this._element.parentElement;
                var cx = void 0, cy = void 0;
                if (parent_1 === null) {
                    cx = cy = 0;
                }
                else {
                    cx = parent_1.offsetWidth / 2;
                    cy = parent_1.offsetHeight / 2;
                }
                feedback(cx, cy, cx + ev.deltaX, cy + ev.deltaY);
            }
        });
        this.hammer.on(name + 'end', function (ev) {
            prevAmount = 0;
            panned(0);
            if (finish !== undefined) {
                finish();
            }
        });
        this.hammer.on(name + 'cancel', function (ev) {
            prevAmount = 0;
            panned(0);
            if (finish !== undefined) {
                finish();
            }
        });
        if (start !== undefined) {
            this.hammer.on(name + 'start', function (ev) { return start(); });
        }
        return pan;
    };
    TouchArea.prototype.createPan2D = function (name, pointers, eventScale, clamp, panned, feedback, start, finish) {
        var _this = this;
        var params = {
            event: name,
            pointers: pointers,
            direction: __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_ALL"],
        };
        var pan = new __WEBPACK_IMPORTED_MODULE_1_hammerjs__["Pan"](params);
        this.hammer.add(pan);
        var prevX = 0, prevY = 0;
        this.hammer.on(name, function (ev) {
            var dx = ev.deltaX * eventScale;
            var dy = ev.deltaY * eventScale;
            if (clamp) {
                dx = _this.scaleClampRound(dx, _this._element.offsetWidth);
                dy = _this.scaleClampRound(dy, _this._element.offsetHeight);
                panned(dx, dy);
            }
            else {
                panned(dx - prevX, dy - prevY);
                prevX = dx;
                prevY = dy;
            }
            if (feedback !== undefined) {
                var parent_2 = _this._element.parentElement;
                var cx = void 0, cy = void 0;
                if (parent_2 === null) {
                    cx = cy = 0;
                }
                else {
                    cx = parent_2.offsetWidth / 2;
                    cy = parent_2.offsetHeight / 2;
                }
                feedback(cx, cy, cx + ev.deltaX, cy + ev.deltaY);
            }
        });
        this.hammer.on(name + 'end', function (ev) {
            prevX = 0;
            prevY = 0;
            panned(0, 0);
            if (finish !== undefined) {
                finish();
            }
        });
        this.hammer.on(name + 'cancel', function (ev) {
            prevX = 0;
            prevY = 0;
            panned(0, 0);
            if (finish !== undefined) {
                finish();
            }
        });
        if (start !== undefined) {
            this.hammer.on(name + 'start', function (ev) { return start(); });
        }
        return pan;
    };
    TouchArea.prototype.createRotate = function (name, eventScale, rotated) {
        var _this = this;
        var params = {
            event: name,
        };
        var rot = new __WEBPACK_IMPORTED_MODULE_1_hammerjs__["Rotate"](params);
        this.hammer.add(rot);
        this.hammer.on(name, function (ev) {
            var amount = _this.scaleClampRound(ev.rotation * eventScale, 1);
            rotated(amount);
        });
        this.hammer.on(name + 'end', function (ev) {
            rotated(0);
        });
        this.hammer.on(name + 'cancel', function (ev) {
            rotated(0);
        });
        return rot;
    };
    TouchArea.prototype.createPinch = function (name, threshold, zoom, start, end) {
        var params = {
            event: name,
            threshold: threshold,
        };
        var pinch = new __WEBPACK_IMPORTED_MODULE_1_hammerjs__["Pinch"](params);
        this.hammer.add(pinch);
        this.hammer.on(name, function (ev) { return zoom(ev.scale); });
        if (start !== undefined) {
            this.hammer.on('zoomstart', function (ev) { return start(); });
        }
        if (end !== undefined) {
            this.hammer.on('zoomend', function (ev) { return end(); });
        }
        return pinch;
    };
    TouchArea.prototype.createPress = function (name, duration, pressed, released) {
        var press = new __WEBPACK_IMPORTED_MODULE_1_hammerjs__["Press"]({ event: name, time: duration });
        this.hammer.add(press);
        this.hammer.on(name, pressed);
        if (released !== undefined) {
            this.hammer.on(name + 'up', released);
        }
        return press;
    };
    TouchArea.prototype.scaleClampRound = function (val, maxExtent) {
        val = val / maxExtent; // scale
        val = Math.max(Math.min(val, 1), -1); // clamp
        val = Math.round(val * 100) / 100; // round
        return val;
    };
    return TouchArea;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmButton__ = __webpack_require__(51);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__ConfirmButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HeldButton__ = __webpack_require__(52);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__HeldButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PushButton__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__PushButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToggleButton__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__ToggleButton__["a"]; });






/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackGroup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FieldGroup__ = __webpack_require__(12);
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
        if (this.group === null || this.group.root === null) {
            return;
        }
        var root = this.group.root;
        this.setState({
            width: root.offsetWidth,
            height: root.offsetHeight,
        });
    };
    FeedbackGroup.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.state.width !== nextState.width || this.state.height !== nextState.height) {
            return true;
        }
        // at this point, x, y, z or xMin must have changed, so rerender the canvas
        if (this.canvas !== null) {
            this.overrideProps = nextProps; // ensure nextProps are used rather than current ones, which are outdated
            this.canvas.redraw();
        }
        return false;
    };
    FeedbackGroup.prototype.render = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__FieldGroup__["a" /* FieldGroup */], { ref: function (g) { return _this.group = g; }, label: this.props.label, className: this.props.className },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["m" /* Canvas */], { ref: function (c) { return _this.canvas = c; }, width: this.state.width, height: this.state.height, draw: function (ctx) { return _this.drawFeedback(ctx); }, className: "fieldGroup__background" }),
            this.props.children));
    };
    FeedbackGroup.prototype.redraw = function () {
        if (this.canvas !== null) {
            this.canvas.redraw();
        }
    };
    FeedbackGroup.prototype.drawFeedback = function (ctx) {
        var props = this.props;
        if (this.overrideProps !== undefined) {
            props = this.overrideProps;
            this.overrideProps = undefined; // only use the override props once, cos after that the real props will have updated (even though we don't rerender)
        }
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.drawFeedbackX(ctx, props);
        this.drawFeedbackY(ctx, props);
        this.drawFeedbackX2(ctx, props);
        this.drawFeedbackY2(ctx, props);
        if (this.props.drawExtra !== undefined) {
            this.props.drawExtra(ctx);
        }
    };
    FeedbackGroup.prototype.drawFeedbackX = function (ctx, props) {
        var width = this.state.width;
        var height = this.state.height;
        var maxVal = 1;
        var minVal = props.xMin === undefined ? -1 : props.xMin;
        var minPos = 0;
        var maxPos = width;
        var zeroPos = width * -minVal / (maxVal - minVal);
        var x;
        if (props.x >= 0) {
            x = zeroPos + (maxPos - zeroPos) * props.x / maxVal;
        }
        else {
            x = zeroPos - (zeroPos - minPos) * props.x / minVal;
        }
        // faint lines showing center
        ctx.strokeStyle = '#fff';
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(zeroPos, 0);
        ctx.lineTo(zeroPos, height);
        ctx.stroke();
        ctx.lineWidth = 2;
        var vmin = Math.min(width, height);
        var breadth = vmin * 0.025, depth = vmin * 0.025 * 1.412;
        // axis line and arrow
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = ctx.fillStyle = props.x === 0 ? '#0c0' : '#cc0';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(x - breadth, 0);
        ctx.lineTo(x + breadth, 0);
        ctx.lineTo(x, depth);
        ctx.moveTo(x - breadth, height);
        ctx.lineTo(x + breadth, height);
        ctx.lineTo(x, height - depth);
        ctx.fill();
        // tick marks showing the center
        ctx.strokeStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(zeroPos, 0);
        ctx.lineTo(zeroPos, depth);
        ctx.moveTo(zeroPos, height);
        ctx.lineTo(zeroPos, height - depth);
        ctx.stroke();
    };
    FeedbackGroup.prototype.drawFeedbackY = function (ctx, props) {
        if (props.y === undefined) {
            return;
        }
        var width = this.state.width;
        var height = this.state.height;
        var zeroPos = height / 2;
        var y = Math.min(height, Math.max(0, -props.y * zeroPos + zeroPos));
        // faint lines showing center
        ctx.strokeStyle = '#fff';
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, zeroPos);
        ctx.lineTo(width, zeroPos);
        ctx.stroke();
        ctx.lineWidth = 2;
        var vmin = Math.min(width, height);
        var breadth = vmin * 0.025, depth = vmin * 0.025 * 1.412;
        // axis line and arrow
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = ctx.fillStyle = props.y === 0 ? '#0c0' : '#cc0';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.beginPath();
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
        ctx.moveTo(0, zeroPos);
        ctx.lineTo(depth, zeroPos);
        ctx.moveTo(width, zeroPos);
        ctx.lineTo(width - depth, zeroPos);
        ctx.stroke();
    };
    FeedbackGroup.prototype.drawFeedbackX2 = function (ctx, props) {
        if (props.x2 === undefined) {
            return;
        }
        var width = this.state.width;
        var height = this.state.height;
        var maxVal = 1;
        var minVal = props.xMin === undefined ? -1 : props.xMin;
        var minPos = 0;
        var maxPos = width;
        var zeroPos = width * -minVal / (maxVal - minVal);
        var x;
        if (props.x >= 0) {
            x = zeroPos + (maxPos - zeroPos) * props.x2 / maxVal;
        }
        else {
            x = zeroPos - (zeroPos - minPos) * props.x2 / minVal;
        }
        ctx.lineWidth = 4;
        ctx.setLineDash([6, 6]);
        var vmin = Math.min(width, height);
        var breadth = vmin * 0.025, depth = vmin * 0.025 * 1.412;
        // axis line
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = ctx.fillStyle = props.x2 === 0 ? '#0c0' : '#cc0';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        ctx.setLineDash([]);
    };
    FeedbackGroup.prototype.drawFeedbackY2 = function (ctx, props) {
        if (props.y2 === undefined) {
            return;
        }
        var width = this.state.width;
        var height = this.state.height;
        var zeroPos = height / 2;
        var y = Math.min(height, Math.max(0, -props.y2 * zeroPos + zeroPos));
        ctx.lineWidth = 4;
        ctx.setLineDash([6, 6]);
        var vmin = Math.min(width, height);
        var breadth = vmin * 0.025, depth = vmin * 0.025 * 1.412;
        // axis line
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = ctx.fillStyle = props.y2 === 0 ? '#0c0' : '#cc0';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.setLineDash([]);
    };
    return FeedbackGroup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeadingReadout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Helm__ = __webpack_require__(13);
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


var HeadingReadout = (function (_super) {
    __extends(HeadingReadout, _super);
    function HeadingReadout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeadingReadout.prototype.render = function () {
        var words = this.props.text.systems.helm;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout--label" }, words.heading),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "readout--value" }, __WEBPACK_IMPORTED_MODULE_1__Helm__["b" /* Helm */].clamp(this.props.yaw)),
            "\u00A0",
            words.mark,
            "\u00A0",
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "readout--value" }, __WEBPACK_IMPORTED_MODULE_1__Helm__["b" /* Helm */].clamp(this.props.pitch)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout__smaller" },
                words.roll,
                "\u00A0",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "readout--value" }, __WEBPACK_IMPORTED_MODULE_1__Helm__["b" /* Helm */].clamp(this.props.roll)),
                "\u00B0"));
    };
    return HeadingReadout;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeedReadout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Helm__ = __webpack_require__(13);
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


var SpeedReadout = (function (_super) {
    __extends(SpeedReadout, _super);
    function SpeedReadout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpeedReadout.prototype.render = function () {
        var words = this.props.text.systems.helm;
        var overallSpeed = __WEBPACK_IMPORTED_MODULE_1__Helm__["b" /* Helm */].magnitude(this.props.horizontalSideSpeed, this.props.verticalSideSpeed, this.props.forwardSpeed);
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout--label" }, words.speed),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "readout--value" }, overallSpeed),
            " ",
            words.metresPerSecond);
    };
    return SpeedReadout;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridCell; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_power__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GridCell_scss__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GridCell_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__GridCell_scss__);
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




var GridCell = (function (_super) {
    __extends(GridCell, _super);
    function GridCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridCell.prototype.render = function () {
        var _this = this;
        var style = {
            gridColumnStart: this.props.col,
            gridRowStart: this.props.row,
        };
        var classes = 'gridCell';
        switch (this.props.type) {
            case 0 /* Empty */:
                classes += ' gridCell--empty';
                break;
            case 3 /* Broken */:
                classes += ' gridCell--broken';
                break;
            default:
                return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_general__["k" /* FlexibleCanvas */], { className: classes, style: style, onClick: this.props.clicked, draw: function (ctx, w, h) { return GridCell.draw(ctx, w, h, _this.props.type, _this.props.power); } }));
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes, style: style, onClick: this.props.clicked });
    };
    GridCell.draw = function (ctx, width, height, cellType, power) {
        if (power === void 0) { power = 0; }
        ctx.clearRect(0, 0, width, height);
        if (cellType === 4 /* Radiator */) {
            ctx.strokeStyle = power === 0 ? '#aaaaaa' : '#dd3333';
            ctx.lineWidth = width * 0.1;
            GridCell.drawRadiator(ctx, width, height);
            return;
        }
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = width * 0.33;
        GridCell.drawLines(ctx, width, height, cellType);
        if (power === 0) {
            return;
        }
        GridCell.setStyleForPowerLevel(ctx, width, power);
        GridCell.drawLines(ctx, width, height, cellType);
        ctx.globalAlpha = 1;
    };
    GridCell.drawRadiator = function (ctx, width, height) {
        ctx.strokeRect(width / 4, height / 4, width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(width * 5 / 12, height / 4);
        ctx.lineTo(width * 5 / 12, height * 3 / 4);
        ctx.moveTo(width * 7 / 12, height / 4);
        ctx.lineTo(width * 7 / 12, height * 3 / 4);
        ctx.stroke();
    };
    GridCell.drawLines = function (ctx, width, height, cellType) {
        ctx.beginPath();
        switch (cellType) {
            case 5 /* NorthSouth */:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                break;
            case 6 /* EastWest */:
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                break;
            case 7 /* NorthEast */:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height / 2);
                ctx.lineTo(width, height / 2);
                break;
            case 8 /* SouthEast */:
                ctx.moveTo(width / 2, height);
                ctx.lineTo(width / 2, height / 2);
                ctx.lineTo(width, height / 2);
                break;
            case 9 /* SouthWest */:
                ctx.moveTo(width / 2, height);
                ctx.lineTo(width / 2, height / 2);
                ctx.lineTo(0, height / 2);
                break;
            case 10 /* NorthWest */:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height / 2);
                ctx.lineTo(0, height / 2);
                break;
            case 11 /* NorthEastSouth */:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(width, height / 2);
                break;
            case 12 /* EastSouthWest */:
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(width / 2, height);
                break;
            case 13 /* SouthWestNorth */:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(0, height / 2);
                break;
            case 14 /* WestNorthEast */:
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(width / 2, 0);
                break;
        }
        ctx.stroke();
    };
    GridCell.setStyleForPowerLevel = function (ctx, cellSize, power) {
        // adjust line width / color / opacity to account for power level
        var width = cellSize * 0.2;
        if (power >= __WEBPACK_IMPORTED_MODULE_1__store_power__["a" /* fullPowerLevel */]) {
            // adjust color as line is already at full width
            switch (power - __WEBPACK_IMPORTED_MODULE_1__store_power__["a" /* fullPowerLevel */]) {
                case 0:
                    ctx.strokeStyle = '#00ff00';
                    break;
                case 1:
                    ctx.strokeStyle = '#88ff00';
                    break;
                case 2:
                    ctx.strokeStyle = '#ccff00';
                    break;
                case 3:
                    ctx.strokeStyle = '#ffff00';
                    break;
                case 4:
                    ctx.strokeStyle = '#ffcc00';
                    break;
                case 5:
                    ctx.strokeStyle = '#ff8800';
                    break;
                case 6:
                    ctx.strokeStyle = '#ff4400';
                    break;
                case 7:
                    ctx.strokeStyle = '#ff0000';
                    break;
                case 8:
                    ctx.strokeStyle = '#ff4444';
                    break;
                case 9:
                    ctx.strokeStyle = '#ff8888';
                    break;
                case 10:
                    ctx.strokeStyle = '#ffcccc';
                    break;
                default:
                    ctx.strokeStyle = '#ffffff';
                    break;
            }
        }
        else {
            // reduce width to indicate lower power
            width *= Math.pow(0.7, __WEBPACK_IMPORTED_MODULE_1__store_power__["a" /* fullPowerLevel */] - power);
            // if too narrow, just get fainter instead
            if (width < 1) {
                ctx.globalAlpha = width;
                width = 1;
            }
            ctx.strokeStyle = '#00ff00';
        }
        ctx.lineWidth = width;
    };
    return GridCell;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cube; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functionality_math__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CubeFace__ = __webpack_require__(102);


var Cube = (function () {
    function Cube(drawTop, drawBottom, drawLeft, drawRight, drawFront, drawRear) {
        var vertices = [
            new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](-1, 1, -1),
            new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](1, 1, -1),
            new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](1, -1, -1),
            new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](-1, -1, -1),
            new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](-1, 1, 1),
            new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](1, 1, 1),
            new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](1, -1, 1),
            new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](-1, -1, 1)
        ];
        this.faces = [
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](0, 0, -1), [vertices[0], vertices[1], vertices[2], vertices[3]], drawBottom),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](1, 0, 0), [vertices[2], vertices[1], vertices[5], vertices[6]], drawLeft),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](0, 0, 1), [vertices[5], vertices[4], vertices[7], vertices[6]], drawTop),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](-1, 0, 0), [vertices[0], vertices[3], vertices[7], vertices[4]], drawRight),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](0, 1, 0), [vertices[1], vertices[0], vertices[4], vertices[5]], drawRear),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](0, -1, 0), [vertices[3], vertices[2], vertices[6], vertices[7]], drawFront)
        ];
    }
    Cube.prototype.draw = function (ctx, radius, pitch, yaw, roll) {
        var deg2rad = Math.PI / 180;
        pitch = pitch * deg2rad;
        yaw = -yaw * deg2rad;
        roll = -roll * deg2rad;
        for (var _i = 0, _a = this.faces; _i < _a.length; _i++) {
            var face = _a[_i];
            face.reset();
            var dot = face.normal
                .rotateY(roll)
                .rotateX(pitch)
                .rotateZ(yaw)
                .dot(Cube.towardsCamera);
            if (dot <= 0)
                continue; // only draw faces visible from the camera
            ctx.beginPath();
            var faceVertex = 0;
            var point = face.vertices[faceVertex]
                .scale(radius)
                .rotateY(roll)
                .rotateX(pitch)
                .rotateZ(yaw);
            ctx.moveTo(point.x, point.y);
            for (faceVertex++; faceVertex < 4; faceVertex++) {
                var point_1 = face.vertices[faceVertex]
                    .scale(radius)
                    .rotateY(roll)
                    .rotateX(pitch)
                    .rotateZ(yaw);
                ctx.lineTo(point_1.x, point_1.y);
            }
            ctx.closePath();
            ctx.save();
            ctx.globalAlpha = dot * 0.3 + 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.stroke();
            ctx.strokeStyle = '#000000';
            face.applyTransform(ctx, radius);
            face.drawSymbol(ctx);
            ctx.restore();
        }
    };
    Cube.towardsCamera = new __WEBPACK_IMPORTED_MODULE_0__functionality_math__["a" /* Vector3 */](0, 0, 1);
    return Cube;
}());



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Celestial; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SensorTarget__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sphere_shade_png__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sphere_shade_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__sphere_shade_png__);
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


var image = new Image();
image.src = __WEBPACK_IMPORTED_MODULE_1__sphere_shade_png___default.a;
var Celestial = (function (_super) {
    __extends(Celestial, _super);
    function Celestial(id, position, color, radius) {
        var _this = _super.call(this, id, position) || this;
        _this.color = color;
        _this.radius = radius;
        return _this;
    }
    Celestial.prototype.getShadowRadius = function (display) { return this.radius * 0.85; };
    Celestial.prototype.drawTarget = function (ctx, screenPos, display) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(screenPos.x, screenPos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        var imgRadius = this.radius - Math.min(1, Math.max(0.1, this.radius * 0.02));
        ctx.filter = 'blur(2px)';
        ctx.drawImage(image, screenPos.x - imgRadius, screenPos.y - imgRadius, imgRadius + imgRadius, imgRadius + imgRadius);
        ctx.filter = 'none';
    };
    return Celestial;
}(__WEBPACK_IMPORTED_MODULE_0__SensorTarget__["a" /* SensorTarget */]));



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelatableTarget; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SensorTarget__ = __webpack_require__(11);
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

var RelatableTarget = (function (_super) {
    __extends(RelatableTarget, _super);
    function RelatableTarget(id, position, relationship) {
        var _this = _super.call(this, id, position) || this;
        _this.relationship = relationship;
        return _this;
    }
    RelatableTarget.prototype.getRelationColor = function () {
        switch (this.relationship) {
            case 1 /* Friendly */:
                return '#0c0';
            case 2 /* Enemy */:
                return '#f33';
            case 3 /* Unknown */:
                return '#cc0';
            default:
                return '#06c';
        }
    };
    RelatableTarget.prototype.draw = function (ctx, display, screenPos, markerZ) {
        ctx.strokeStyle = ctx.fillStyle = this.getRelationColor();
        _super.prototype.draw.call(this, ctx, display, screenPos, markerZ);
    };
    return RelatableTarget;
}(__WEBPACK_IMPORTED_MODULE_0__SensorTarget__["a" /* SensorTarget */]));



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = parseSensorTarget;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SensorTarget__ = __webpack_require__(11);
/* unused harmony reexport SensorTarget */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__JumpPath__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Star__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Planet__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Station__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Ship__ = __webpack_require__(110);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__JumpPath__["a"]; });
/* unused harmony reexport Star */
/* unused harmony reexport Planet */
/* unused harmony reexport Station */
/* unused harmony reexport Ship */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6____ = __webpack_require__(4);

//export { MoveableTarget } from './MoveableTarget';







function parseSensorTarget(data) {
    var vals = data.split(' ');
    var id = parseInt(vals[0]);
    var pos = new __WEBPACK_IMPORTED_MODULE_6____["d" /* Vector3 */](parseFloat(vals[1]), parseFloat(vals[2]), parseFloat(vals[3]));
    switch (vals[4]) {
        case '*': {
            var color = vals[5];
            var radius = parseFloat(vals[6]);
            var damageRadius = vals.length > 7 ? parseFloat(vals[7]) : undefined;
            return new __WEBPACK_IMPORTED_MODULE_2__Star__["a" /* Star */](id, pos, color, radius, damageRadius);
        }
        case 'o': {
            var color = vals[5];
            var radius = parseFloat(vals[6]);
            return new __WEBPACK_IMPORTED_MODULE_3__Planet__["a" /* Planet */](id, pos, color, radius);
        }
        case '+': {
            var rel = parseInt(vals[5]);
            return new __WEBPACK_IMPORTED_MODULE_4__Station__["a" /* Station */](id, pos, rel);
        }
        case 'v': {
            var rel = parseInt(vals[5]);
            var vel = new __WEBPACK_IMPORTED_MODULE_6____["d" /* Vector3 */](parseFloat(vals[6]), parseFloat(vals[7]), parseFloat(vals[8]));
            return new __WEBPACK_IMPORTED_MODULE_5__Ship__["a" /* Ship */](id, pos, vel, rel);
        }
        default:
            throw "Unexpected target type: " + vals[4];
    }
}


/***/ }),
/* 33 */
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
/* 34 */
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
    setManoeveringLimits: function (pitch, yaw, roll, translationHorizonta, translationVertical) { return ({
        type: 'SET_MANOEVERING_LIMITS',
        pitchRateMax: pitch,
        yawRateMax: yaw,
        rollRateMax: roll,
        translationRateHorizontalMax: translationHorizonta,
        translationRateVerticalMax: translationVertical,
    }); },
    setSpeedLimits: function (speedMax, speedMaxReverse) { return ({
        type: 'SET_SPEED_LIMITS',
        speedMax: speedMax,
        speedMaxReverse: speedMaxReverse,
    }); },
    setOrientation: function (pitch, yaw, roll) { return ({
        type: 'SET_ORIENTATION',
        pitch: pitch,
        yaw: yaw,
        roll: roll,
    }); },
    setRotationRates: function (pitch, yaw, roll) { return ({
        type: 'SET_ORIENTATION_RATES',
        pitchRate: pitch,
        yawRate: yaw,
        rollRate: roll,
    }); },
    setTranslationRates: function (translationRateHorizontal, translationRateVertical, translationRateForward) { return ({
        type: 'SET_TRANSLATION_RATES',
        translationRateHorizontal: translationRateHorizontal,
        translationRateVertical: translationRateVertical,
        translationRateForward: translationRateForward,
    }); },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = {
    pitch: 0,
    yaw: 0,
    roll: 0,
    pitchRate: 0,
    yawRate: 0,
    rollRate: 0,
    pitchRateMax: 1,
    yawRateMax: 1,
    rollRateMax: 1,
    translationRateHorizontal: 0,
    translationRateVertical: 0,
    translationRateHorizontalMax: 1,
    translationRateVerticalMax: 1,
    translationRateForward: 0,
    translationRateForwardMax: 1,
    translationRateReverseMax: 1,
};
var reducer = function (state, rawAction) {
    var action = rawAction;
    switch (action.type) {
        case 'SET_MANOEVERING_LIMITS':
            return __assign({}, state, { pitchRateMax: action.pitchRateMax, yawRateMax: action.yawRateMax, rollRateMax: action.rollRateMax, translationRateHorizontalMax: action.translationRateHorizontalMax, translationRateVerticalMax: action.translationRateVerticalMax });
        case 'SET_SPEED_LIMITS':
            return __assign({}, state, { translationRateForwardMax: action.speedMax, translationRateReverseMax: action.speedMaxReverse });
        case 'SET_ORIENTATION':
            return __assign({}, state, { pitch: action.pitch, yaw: action.yaw, roll: action.roll });
        case 'SET_ORIENTATION_RATES':
            return __assign({}, state, { pitchRate: action.pitchRate, yawRate: action.yawRate, rollRate: action.rollRate });
        case 'SET_TRANSLATION_RATES':
            return __assign({}, state, { translationRateHorizontal: action.translationRateHorizontal, translationRateVertical: action.translationRateVertical, translationRateForward: action.translationRateForward });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 35 */
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
    addTarget: function (target) { return ({
        type: 'ADD_TARGET',
        target: target,
    }); },
    moveTarget: function (id, position) { return ({
        type: 'MOVE_TARGET',
        targetID: id,
        position: position,
    }); },
    removeTarget: function (id) { return ({
        type: 'REMOVE_TARGET',
        targetID: id,
    }); },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = {
    targets: [],
};
var reducer = function (state, rawAction) {
    var action = rawAction;
    switch (action.type) {
        case 'ADD_TARGET': {
            return __assign({}, state, { targets: state.targets.concat([action.target]) });
        }
        case 'MOVE_TARGET': {
            var targets = state.targets.map(function (target, index) {
                if (target.id === action.targetID) {
                    return Object.assign({}, target, {
                        position: action.position,
                    });
                }
                return target;
            });
            return __assign({}, state, { targets: targets });
        }
        case 'REMOVE_TARGET': {
            var targets = state.targets.filter(function (target) { return target.id !== action.targetID; });
            return __assign({}, state, { targets: targets });
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return Hammer;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__screens__ = __webpack_require__(61);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes, onContextMenu: function (ev) { return ev.preventDefault(); } }, this.renderScreen());
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
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));
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
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(114);




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
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(144);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(6))(138);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(6))(139);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Choice; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonSet__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Choice_scss__ = __webpack_require__(117);
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
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Coordinate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Coordinate_scss__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Coordinate_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Coordinate_scss__);
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


var Coordinate = (function (_super) {
    __extends(Coordinate, _super);
    function Coordinate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Coordinate.prototype.render = function () {
        var classes = 'coordinate';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "coordinate__number" }, this.props.pos.x),
            ",",
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "coordinate__number" }, this.props.pos.y),
            ",",
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "coordinate__number" }, this.props.pos.z));
    };
    return Coordinate;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Field; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Field_scss__ = __webpack_require__(119);
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
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumericTextbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Textbox__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Textbox_scss__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Textbox_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Textbox_scss__);
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



var NumericTextbox = (function (_super) {
    __extends(NumericTextbox, _super);
    function NumericTextbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericTextbox.prototype.render = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Textbox__["a" /* Textbox */], { numeric: true, text: this.props.number === undefined || isNaN(this.props.number) ? '' : this.props.number.toString(), textChanged: function (t) { return _this.props.numberChanged(t === '' ? undefined : parseFloat(t)); }, color: this.props.color, placeholder: this.props.placeholder, disabled: this.props.disabled }));
    };
    return NumericTextbox;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Panel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Panel_scss__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Panel_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Panel_scss__);
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


var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Panel.prototype.render = function () {
        var contentClasses = this.props.forceScroll ? 'panel__content panel__content--forceScroll' : 'panel__content';
        var content = this.props.contentIsList
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", { className: contentClasses }, this.props.children)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: contentClasses }, this.props.children);
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: this.props.className === undefined ? 'panel' : 'panel ' + this.props.className },
            this.props.headerText === undefined ? undefined : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "panel__header" }, this.props.headerText),
            content,
            this.props.footer === undefined ? undefined : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "panel__footer" }, this.props.footer)));
    };
    Panel.defaultProps = {
        forceScroll: false,
    };
    return Panel;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressBar_scss__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressBar_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ProgressBar_scss__);
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


var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressBar.prototype.render = function () {
        var percent = Math.round(100 * this.props.value / this.props.maxValue);
        var percentStyle = { width: percent + '%' };
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "progressBar" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "progressBar__indicator", style: percentStyle },
                percent,
                "%")));
    };
    return ProgressBar;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Screen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Screen_scss__ = __webpack_require__(123);
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
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(3);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], __assign({}, this.props, { className: classList, buttonType: "submit", mouseClick: function (e) { return _this.clicked(e); } }));
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
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeldButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(3);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], __assign({}, this.props, { className: classList, mouseDown: function () { return _this.mouseDown(); }, mouseUp: function () { return _this.mouseUp(); } }));
    };
    HeldButton.prototype.mouseDown = function () {
        this.setState({ held: true });
        if (this.props.pressed != undefined)
            this.props.pressed();
        if (this.props.pressCommand !== undefined)
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(this.props.pressCommand);
    };
    HeldButton.prototype.mouseUp = function () {
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
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(3);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], __assign({}, this.props, { className: classList, mouseClick: function (e) { return _this.clicked(e); }, mouseDown: function () { return _this.mouseDown(); }, mouseUp: function () { return _this.mouseUp(); } }));
    };
    PushButton.prototype.clicked = function (e) {
        if (this.props.clicked !== undefined) {
            this.props.clicked();
        }
        if (this.props.command !== undefined) {
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send(this.props.command);
        }
    };
    PushButton.prototype.mouseDown = function () {
        this.setState({ held: true });
    };
    PushButton.prototype.mouseUp = function () {
        this.setState({ held: false });
    };
    return PushButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(3);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], __assign({}, this.props, { className: classList, mouseClick: function (e) { return _this.clicked(e); } }));
    };
    ToggleButton.prototype.clicked = function (e) {
        if (this.state.active) {
            if (this.props.allowUserDeactivate === false) {
                e.preventDefault();
                return; // in a choice, don't deactivate a button by clicking on it
            }
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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_general__ = __webpack_require__(2);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__components_general__["a" /* Screen */], { centered: true, heading: this.props.text.screens.connecting.connecting });
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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Error_scss__ = __webpack_require__(125);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_general__["a" /* Screen */], { centered: true, heading: this.props.text.screens.error.heading },
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
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functionality__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_systems__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__GameActive_scss__ = __webpack_require__(126);
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
    function GameActive(props) {
        var _this = _super.call(this, props) || this;
        _this.system = null;
        _this.state = {
            showingOptions: false,
            showingHelp: false,
        };
        return _this;
    }
    GameActive.prototype.render = function () {
        var _this = this;
        var activeSystemName = this.props.activeSystem === undefined ? undefined : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functionality__["f" /* getSystemName */])(this.props.activeSystem, this.props.text);
        var prev;
        var next;
        var help, options;
        var system = this.renderSystem(this.props.activeSystem);
        var showingSystem = true;
        if (this.system !== null) {
            if (this.state.showingOptions) {
                options = this.system.renderOptions();
                showingSystem = false;
            }
            if (this.state.showingHelp) {
                help = this.system.renderHelp();
                showingSystem = false;
            }
        }
        var wrapperClasses = showingSystem ? 'systemWrapper' : 'systemWrapper systemWrapper--hidden';
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["a" /* Screen */], null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { className: "systemHeader__name" }, activeSystemName),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader__systemIcons systemHeader__systemIcons--fullWidth" }, this.renderSystemIcons()),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader__systemIcons systemHeader__systemIcons--truncated" },
                    prev,
                    next),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader__separator" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemHeader__commonIcons" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { title: this.props.text.common.help, noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Help, color: this.state.showingHelp ? 4 /* Quandry */ : undefined, clicked: function () { return _this.toggleHelp(); } }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { title: this.props.text.common.settings, noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Settings, color: this.state.showingOptions ? 4 /* Quandry */ : undefined, clicked: function () { return _this.toggleOptions(); } }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { title: this.props.text.screens.active.pause, noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Pause, command: "pause" }))),
            options,
            help,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: wrapperClasses }, system)));
    };
    GameActive.prototype.renderSystemIcons = function () {
        return [
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Helm, __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Helm),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp, __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Warp),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Weapons, __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Weapons),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Sensors, __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Sensors),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].PowerManagement, __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].PowerManagement),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].DamageControl, __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].DamageControl),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications, __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Communications),
            this.renderSystemIcon(__WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen, __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].ViewScreen),
        ];
    };
    GameActive.prototype.renderSystemIcon = function (system, icon) {
        var _this = this;
        if ((this.props.displaySystems & system) === 0)
            return undefined;
        var color = this.props.activeSystem === system ? 4 /* Quandry */ : undefined;
        var disabled = (this.props.disableSystems & system) !== 0;
        var clicked = this.props.activeSystem === system
            ? function () { return _this.setState({ showingHelp: false, showingOptions: false }); }
            : function () { _this.setState({ showingHelp: false, showingOptions: false }); __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("viewsys " + system); };
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { key: system, title: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functionality__["f" /* getSystemName */])(system, this.props.text), noBorder: true, icon: icon, disabled: disabled, color: color, clicked: clicked });
    };
    GameActive.prototype.renderSystem = function (system) {
        var _this = this;
        switch (system) {
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Helm:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_systems__["a" /* Helm */], { ref: function (s) { if (s === null) {
                        _this.system = null;
                    }
                    else {
                        _this.system = s.getWrappedInstance();
                    } } });
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_systems__["b" /* Warp */], { ref: function (s) { if (s === null) {
                        _this.system = null;
                    }
                    else {
                        _this.system = s.getWrappedInstance();
                    } } });
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Weapons:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_systems__["c" /* Weapons */], { ref: function (s) { if (s === null) {
                        _this.system = null;
                    }
                    else {
                        _this.system = s.getWrappedInstance();
                    } } });
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Sensors:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_systems__["d" /* Sensors */], { ref: function (s) { if (s === null) {
                        _this.system = null;
                    }
                    else {
                        _this.system = s.getWrappedInstance();
                    } } });
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].PowerManagement:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_systems__["e" /* PowerManagement */], { ref: function (s) { if (s === null) {
                        _this.system = null;
                    }
                    else {
                        _this.system = s.getWrappedInstance();
                    } } });
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].DamageControl:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_systems__["f" /* DamageControl */], { ref: function (s) { if (s === null) {
                        _this.system = null;
                    }
                    else {
                        _this.system = s.getWrappedInstance();
                    } } });
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_systems__["g" /* Communications */], { ref: function (s) { if (s === null) {
                        _this.system = null;
                    }
                    else {
                        _this.system = s.getWrappedInstance();
                    } } });
            case __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_systems__["h" /* ViewScreen */], { ref: function (s) { if (s === null) {
                        _this.system = null;
                    }
                    else {
                        _this.system = s.getWrappedInstance();
                    } } });
        }
    };
    GameActive.prototype.toggleOptions = function () {
        this.setState({
            showingOptions: !this.state.showingOptions,
            showingHelp: false,
        });
    };
    GameActive.prototype.toggleHelp = function () {
        this.setState({
            showingHelp: !this.state.showingHelp,
            showingOptions: false,
        });
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
    var activeName = activeSystem === undefined ? undefined : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functionality__["f" /* getSystemName */])(activeSystem, state.user.text);
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
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_Screen__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_general__ = __webpack_require__(2);
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
            joinAddress = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["g" /* Field */], { labelText: words.joinAddress, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["o" /* Textbox */], { color: 2 /* Tertiary */, text: this.state.joinAddress, placeholder: words.joinAddressPlaceholder, textChanged: function (address) { return _this.setState({ joinAddress: address }); } }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.joinAddressDescription)));
        }
        else {
            if (this.state.gameType !== undefined) {
                gameMode = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["g" /* Field */], { labelText: words.gameMode },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["d" /* Choice */], { prompt: words.gameModePrompt, color: 0 /* Primary */, vertical: choicesVertical },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["e" /* ToggleButton */], { activated: function () { return _this.setState({ gameMode: 2 /* Exploration */ }); }, description: words.gameModeExplorationDescription, text: words.gameModeExploration }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["e" /* ToggleButton */], { activated: function () { return _this.setState({ gameMode: 1 /* Survival */ }); }, description: words.gameModeSurvivalDescription, text: words.gameModeSurvival }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["e" /* ToggleButton */], { activated: function () { return _this.setState({ gameMode: 0 /* Arena */ }); }, description: words.gameModeArenaDescription, text: words.gameModeArena, disabled: this.state.gameType === 0 /* Local */ }))));
                if (this.usesDifficulty()) {
                    var levels = [];
                    var _loop_1 = function (i) {
                        levels.push(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["e" /* ToggleButton */], { key: i, activated: function () { return _this.setState({ difficulty: i }); }, text: i.toString() }));
                    };
                    for (var i = 1; i <= 10; i++) {
                        _loop_1(i);
                    }
                    difficulty = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["g" /* Field */], { labelText: words.difficulty },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["d" /* Choice */], { prompt: words.difficultyPrompt, color: 2 /* Tertiary */, vertical: this.props.screenWidth < 400 }, levels)));
                }
                if (this.state.gameType === 2 /* Host */) {
                    hostName = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["g" /* Field */], { labelText: words.serverName, labelBehaviour: true },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["o" /* Textbox */], { color: 2 /* Tertiary */, text: this.state.serverName, placeholder: words.serverNamePlaceholder, textChanged: function (name) { return _this.setState({ serverName: name }); } }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.serverNameDescription)));
                }
            }
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["a" /* Screen */], { heading: words.intro, pageLayout: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["g" /* Field */], { labelText: words.shipName, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "field__contentRow" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["o" /* Textbox */], { color: 2 /* Tertiary */, text: this.state.shipName, textChanged: function (name) { return _this.setState({ shipName: name }); } }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { color: 2 /* Tertiary */, noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Refresh, clicked: function () { return _this.randomizeName(); }, title: words.shipNameRandom })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.shipNameDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["g" /* Field */], { labelText: words.gameType },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["d" /* Choice */], { prompt: words.gameTypePrompt, color: 0 /* Primary */, vertical: choicesVertical },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["e" /* ToggleButton */], { activated: function () { return _this.setState({ gameType: 0 /* Local */ }); }, description: words.gameTypeLocalDescription, text: words.gameTypeLocal }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["e" /* ToggleButton */], { activated: function () { return _this.setState({ gameType: 1 /* Join */ }); }, description: words.gameTypeJoinDescription, text: words.gameTypeJoin }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["e" /* ToggleButton */], { activated: function () { return _this.setState({ gameType: 2 /* Host */ }); }, description: words.gameTypeHostDescription, text: words.gameTypeHost }))),
            joinAddress,
            gameMode,
            difficulty,
            hostName,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["g" /* Field */], { centered: true, displayAsRow: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["p" /* ConfirmButton */], { color: 4 /* Quandry */, clicked: function () { return _this.startGame(); }, text: words.startGame, disabled: !this.decideCanStart() }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { color: 3 /* Quaternary */, clicked: function () { return _this.cancel(); }, text: this.props.text.common.cancel, command: "-setup" })));
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
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_Screen__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_general__ = __webpack_require__(2);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["a" /* Screen */], { heading: words.intro, pageLayout: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["g" /* Field */], { labelText: words.userName, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["o" /* Textbox */], { color: 0 /* Primary */, text: this.props.userName, textChanged: function (t) { return _this.nameChanged(t); }, placeholder: words.userNamePlaceholder }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.userNameDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["g" /* Field */], { labelText: words.inputMode },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["d" /* Choice */], { prompt: words.inputModePrompt, color: 1 /* Secondary */, vertical: inputModeVertical },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["e" /* ToggleButton */], { startActive: this.props.inputMode === 0 /* KeyboardAndMouse */, activated: function () { return _this.inputModeChanged(0 /* KeyboardAndMouse */); }, description: words.inputModeDescriptionKeyboard, text: words.inputModeKeyboard }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["e" /* ToggleButton */], { startActive: this.props.inputMode === 1 /* Touchscreen */, activated: function () { return _this.inputModeChanged(1 /* Touchscreen */); }, description: words.inputModeDescriptionTouch, text: words.inputModeTouch }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["e" /* ToggleButton */], { startActive: this.props.inputMode === 2 /* Gamepad */, disabled: true, activated: function () { return _this.inputModeChanged(2 /* Gamepad */); }, description: words.inputModeDescriptionGamepad, text: words.inputModeGamepad }))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["g" /* Field */], { centered: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_general__["b" /* PushButton */], { color: 2 /* Tertiary */, disabled: !hasUserName, clicked: function () { return _this.close(); }, text: this.props.text.common.save })),
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
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functionality__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SystemSelection_scss__ = __webpack_require__(127);
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
            resumeButton = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { color: 1 /* Secondary */, text: words.resumeGame, command: "resume" });
        }
        else {
            setupButton = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { color: 1 /* Secondary */, text: words.setupGame, command: "+setup", disabled: this.props.canEnterSetup });
        }
        var settingsButton = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { color: 2 /* Tertiary */, text: this.props.text.common.settings, clicked: function () { return _this.props.showUserSettings(); } });
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["a" /* Screen */], { heading: words.intro, pageLayout: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["g" /* Field */], { centered: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, suggestedGroupings.length === 0 ? undefined : words.suggestionPrompt),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "systemSelection" },
                    this.renderSystemControls(systemNames.helm, __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Helm, suggestedGroupings),
                    this.renderSystemControls(systemNames.warp, __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp, suggestedGroupings),
                    this.renderSystemControls(systemNames.weapons, __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Weapons, suggestedGroupings),
                    this.renderSystemControls(systemNames.sensors, __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Sensors, suggestedGroupings),
                    this.renderSystemControls(systemNames.power, __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].PowerManagement, suggestedGroupings),
                    this.renderSystemControls(systemNames.damage, __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].DamageControl, suggestedGroupings),
                    this.renderSystemControls(systemNames.comms, __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications, suggestedGroupings),
                    this.renderSystemControls(systemNames.view, __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen, suggestedGroupings))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["g" /* Field */], { centered: true, displayAsRow: true },
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
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["e" /* ToggleButton */], { key: "b", text: name, color: 0 /* Primary */, activateCommand: "sys+ " + system, deactivateCommand: "sys- " + system, startActive: preselected }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { key: "c", className: "systemSelection__help" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general__["b" /* PushButton */], { color: 4 /* Quandry */, noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_4__components_general__["c" /* Icon */].Help, title: this.props.text.common.help })),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { key: "d", className: "systemSelection__who" }, players)
        ];
    };
    SystemSelection.prototype.determineSuggestedGroupings = function () {
        switch (this.props.numPlayers) {
            case 2:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Helm | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].PowerManagement | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].DamageControl | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                ];
            case 3:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Helm | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].PowerManagement | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].DamageControl | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                ];
            case 4:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Helm | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].PowerManagement | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].DamageControl | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                ];
            case 5:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Helm,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].PowerManagement | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].DamageControl | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                ];
            case 6:
                return [
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Helm,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Weapons | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].PowerManagement,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Warp | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Communications,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].Sensors | __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].ViewScreen,
                    __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* ShipSystem */].DamageControl,
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
    for (var _i = 0, allSystems_1 = __WEBPACK_IMPORTED_MODULE_3__functionality__["k" /* allSystems */]; _i < allSystems_1.length; _i++) {
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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Connecting__ = __webpack_require__(55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Connecting__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Settings__ = __webpack_require__(59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Settings__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SystemSelection__ = __webpack_require__(60);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__SystemSelection__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GameSetup__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__GameSetup__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GameActive__ = __webpack_require__(57);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__GameActive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Error__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__Error__["a"]; });








/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooleanOption; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Options_scss__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Options_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Options_scss__);
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



var BooleanOption = (function (_super) {
    __extends(BooleanOption, _super);
    function BooleanOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooleanOption.prototype.render = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "option" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "option__name" }, this.props.label),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["d" /* Choice */], { color: 0 /* Primary */ },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["e" /* ToggleButton */], { startActive: !this.props.value, activated: function () { return _this.props.changeValue(false); }, text: this.props.text.common.optionDisable }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["e" /* ToggleButton */], { startActive: this.props.value, activated: function () { return _this.props.changeValue(true); }, text: this.props.text.common.optionEnable }))));
    };
    return BooleanOption;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Communications_scss__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Communications_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Communications_scss__);
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
    function Communications(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Communications.prototype.name = function () { return 'comms'; };
    Communications.prototype.getHelpText = function () {
        return this.props.text.systemHelp.comms;
    };
    Communications.prototype.getOptionLabels = function () {
        return this.props.text.systems.comms;
    };
    Communications.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system" }, "This is the communications system. TODO: implement this!");
    };
    return Communications;
}(__WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__["a" /* ShipSystemComponent */]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {}, null, { withRef: true })(Communications));


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Communications__ = __webpack_require__(63);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Communications__["a"]; });



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardHand; });
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

var CardHand = (function (_super) {
    __extends(CardHand, _super);
    function CardHand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardHand.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null);
        // TODO: implement
    };
    return CardHand;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardSelection; });
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

var CardSelection = (function (_super) {
    __extends(CardSelection, _super);
    function CardSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardSelection.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null);
        // TODO: implement
    };
    return CardSelection;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CardHand__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CardSelection__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SystemList__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DamageControl_scss__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DamageControl_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__DamageControl_scss__);
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
    function DamageControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    DamageControl.prototype.name = function () { return 'power'; };
    DamageControl.prototype.getHelpText = function () {
        return this.props.text.systemHelp.power;
    };
    DamageControl.prototype.getOptionLabels = function () {
        return this.props.text.systems.power;
    };
    DamageControl.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__SystemList__["a" /* SystemList */], { text: this.props.text }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__CardSelection__["a" /* CardSelection */], { text: this.props.text }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__CardHand__["a" /* CardHand */], { text: this.props.text }));
    };
    return DamageControl;
}(__WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__["a" /* ShipSystemComponent */]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {}, null, { withRef: true })(DamageControl));


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SystemList; });
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

var SystemList = (function (_super) {
    __extends(SystemList, _super);
    function SystemList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SystemList.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null);
        // TODO: implement
    };
    return SystemList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DamageControl__ = __webpack_require__(67);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__DamageControl__["a"]; });



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonHelm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FieldGroup__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FeedbackGroup__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__HeadingReadout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SpeedReadout__ = __webpack_require__(27);
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






var ButtonHelm = (function (_super) {
    __extends(ButtonHelm, _super);
    function ButtonHelm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonHelm.prototype.render = function () {
        var _this = this;
        var words = this.props.text.systems.helm;
        var iconSize = "1.5em";
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system helm helm--buttonInput" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__FieldGroup__["a" /* FieldGroup */], { className: "fieldGroup--buttons fieldGroup--3x1 fieldGroup--unpadded" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__HeadingReadout__["a" /* HeadingReadout */], { text: this.props.text, pitch: this.props.pitch, yaw: this.props.yaw, roll: this.props.roll }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["k" /* FlexibleCanvas */], { draw: function (ctx, w, h) { return _this.props.drawOrientation(ctx, w, h); } }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__SpeedReadout__["a" /* SpeedReadout */], { text: this.props.text, forwardSpeed: this.props.translationRateForward, horizontalSideSpeed: this.props.translationRateForward, verticalSideSpeed: this.props.translationRateForward })),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__FeedbackGroup__["a" /* FeedbackGroup */], { label: words.forwardBackward, x: this.props.translationRateForward / this.props.translationRateForwardMax, xMin: -this.props.translationRateReverseMax / this.props.translationRateForwardMax, className: "fieldGroup--buttons fieldGroup--3x1" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { text: words.moveBackward, color: 3 /* Quaternary */, hotkey: "control", pressCommand: "moveBackward 1", releaseCommand: "moveBackward 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { text: words.speedStop, color: 0 /* Primary */, hotkey: "shift", pressCommand: "+forwardBackStop", releaseCommand: "-forwardBackStop" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { text: words.moveForward, color: 3 /* Quaternary */, hotkey: "space", pressCommand: "moveForward 1", releaseCommand: "moveForward 0" })),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__FeedbackGroup__["a" /* FeedbackGroup */], { label: words.rotation, x: this.props.yawRate / this.props.yawRateMax, y: this.props.pitchRate / this.props.pitchRateMax, className: "fieldGroup--buttons fieldGroup--3x3" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__topMid", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].ArrowUp, iconSize: iconSize, title: words.rotateUp, color: 1 /* Secondary */, hotkey: "W", pressCommand: "pitchUp 1", releaseCommand: "pitchUp 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__botMid", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].ArrowDown, iconSize: iconSize, title: words.rotateDown, color: 1 /* Secondary */, hotkey: "X", pressCommand: "pitchDown 1", releaseCommand: "pitchDown 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__midLeft", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].ArrowLeft, iconSize: iconSize, title: words.rotateLeft, color: 1 /* Secondary */, hotkey: "A", pressCommand: "yawLeft 1", releaseCommand: "yawLeft 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__midRight", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].ArrowRight, iconSize: iconSize, title: words.rotateRight, color: 1 /* Secondary */, hotkey: "D", pressCommand: "yawRight 1", releaseCommand: "yawRight 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__topLeft", noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].RotateCCW, iconSize: iconSize, title: words.rotateLeft, color: 1 /* Secondary */, hotkey: "Q", pressCommand: "rollLeft 1", releaseCommand: "rollLeft 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__topRight", noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].RotateCW, iconSize: iconSize, title: words.rotateRight, color: 1 /* Secondary */, hotkey: "E", pressCommand: "rollRight 1", releaseCommand: "rollRight 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__center", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].X, iconSize: iconSize, title: words.rotateStop, color: 0 /* Primary */, hotkey: "S", pressCommand: "+rotStop", releaseCommand: "-rotStop" })),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__FeedbackGroup__["a" /* FeedbackGroup */], { label: words.strafe, x: this.props.translationRateHorizontal / this.props.translationRateHorizontalMax, y: this.props.translationRateVertical / this.props.translationRateVerticalMax, className: "fieldGroup--buttons fieldGroup--3x3" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__topMid", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].ArrowUp, iconSize: iconSize, title: words.strafeUp, color: 2 /* Tertiary */, hotkey: "I", pressCommand: "strafeUp 1", releaseCommand: "strafeUp 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__botMid", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].ArrowDown, iconSize: iconSize, title: words.strafeDown, color: 2 /* Tertiary */, hotkey: ",", pressCommand: "strafeDown 1", releaseCommand: "strafeDown 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__midLeft", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].ArrowLeft, iconSize: iconSize, title: words.strafeLeft, color: 2 /* Tertiary */, hotkey: "J", pressCommand: "strafeLeft 1", releaseCommand: "strafeLeft 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__midRight", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].ArrowRight, iconSize: iconSize, title: words.strafeRight, color: 2 /* Tertiary */, hotkey: "L", pressCommand: "strafeRight 1", releaseCommand: "strafeRight 0" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["n" /* HeldButton */], { className: "fieldGroup--3x3__center", icon: __WEBPACK_IMPORTED_MODULE_1__components_general__["c" /* Icon */].X, iconSize: iconSize, title: words.strafeStop, color: 0 /* Primary */, hotkey: "K", pressCommand: "+strafeStop", releaseCommand: "-strafeStop" })));
    };
    return ButtonHelm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TouchHelm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FeedbackGroup__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__FieldGroup__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__HeadingReadout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__SpeedReadout__ = __webpack_require__(27);
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








var TouchHelm = (function (_super) {
    __extends(TouchHelm, _super);
    function TouchHelm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHelm.prototype.render = function () {
        var _this = this;
        var words = this.props.text.systems.helm;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system helm helm--touchInput" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__FieldGroup__["a" /* FieldGroup */], { className: "helm--touchInput__info fieldGroup--1x3 fieldGroup--unpadded" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__HeadingReadout__["a" /* HeadingReadout */], { text: this.props.text, pitch: this.props.pitch, yaw: this.props.yaw, roll: this.props.roll }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__components_general__["k" /* FlexibleCanvas */], { draw: function (ctx, w, h) { return _this.props.drawOrientation(ctx, w, h); } }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__SpeedReadout__["a" /* SpeedReadout */], { text: this.props.text, forwardSpeed: this.props.translationRateForward, horizontalSideSpeed: this.props.translationRateForward, verticalSideSpeed: this.props.translationRateForward })),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__FeedbackGroup__["a" /* FeedbackGroup */], { ref: function (g) { return _this.rotGroup = g; }, label: words.rotation, x: this.props.yawRate / this.props.yawRateMax, y: this.props.pitchRate / this.props.pitchRateMax, x2: this.props.translationRateHorizontal / this.props.translationRateHorizontalMax, y2: this.props.translationRateVertical / this.props.translationRateVerticalMax, drawExtra: function (ctx) { return _this.drawRotationFeedback(ctx); }, className: "helm--touchInput__rotation fieldGroup--1x1" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__components_general__["l" /* TouchArea */], { setupTouch: function (a) { return _this.setupRotation(a); } })),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__FeedbackGroup__["a" /* FeedbackGroup */], { ref: function (g) { return _this.speedGroup = g; }, label: words.forwardBackward, x: this.props.translationRateForward / this.props.translationRateForwardMax, xMin: -this.props.translationRateReverseMax / this.props.translationRateForwardMax, className: "helm--touchInput__speed fieldGroup--1x1" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__components_general__["l" /* TouchArea */], { setupTouch: function (a) { return _this.setupSpeed(a); } })));
    };
    TouchHelm.prototype.setupRotation = function (area) {
        var _this = this;
        var stopping = false;
        var startStop = function () {
            stopping = true;
            navigator.vibrate(30);
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send('+rotStop');
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send('+strafeStop');
        };
        var finishStop = function () {
            if (!stopping) {
                return;
            }
            stopping = false;
            navigator.vibrate(30);
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send('-rotStop');
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send('-strafeStop');
        };
        var yaw = area.createPan('yaw', 1, __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_HORIZONTAL"], 2, true, function (val) { return __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("yawRight " + val); }, function (sx, sy, ex, ey) { return _this.feedbackRotation(sx, sy, ex, ey, '#0cf'); }, finishStop, function () { return _this.clearRotationFeedback(); });
        var pitch = area.createPan('pitch', 1, __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_VERTICAL"], 2, true, function (val) { return __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("pitchUp " + -val); }, function (sx, sy, ex, ey) { return _this.feedbackRotation(sx, sy, ex, ey, '#0cf'); }, finishStop, function () { return _this.clearRotationFeedback(); });
        var roll = area.createPan('roll', 2, __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_HORIZONTAL"], 2.25, true, function (val) { return __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("rollRight " + val); });
        var lateral = area.createPan('lateral', 3, __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_HORIZONTAL"], 5.5, true, function (val) { return __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("strafeRight " + val); }, function (sx, sy, ex, ey) { return _this.feedbackRotation(sx, sy, ex, ey, '#c0f'); }, finishStop, function () { return _this.clearRotationFeedback(); });
        var vertical = area.createPan('vertical', 3, __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_VERTICAL"], -3, true, function (val) { return __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("strafeUp " + -val); }, function (sx, sy, ex, ey) { return _this.feedbackRotation(sx, sy, ex, ey, '#c0f'); }, finishStop, function () { return _this.clearRotationFeedback(); });
        yaw.recognizeWith(pitch);
        lateral.recognizeWith(vertical);
        var stop = area.createPress('allStop', 500, startStop, finishStop);
    };
    TouchHelm.prototype.setupSpeed = function (area) {
        var _this = this;
        var stopping = false;
        var startStop = function () {
            stopping = true;
            navigator.vibrate(30);
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send('+forwardBackStop');
        };
        var finishStop = function () {
            if (!stopping) {
                return;
            }
            stopping = false;
            navigator.vibrate(30);
            __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send('-forwardBackStop');
        };
        var forward = area.createPan('forward', 1, __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_VERTICAL"], 2, true, function (val) { return __WEBPACK_IMPORTED_MODULE_2__Client__["connection"].send("moveForward " + -val); }, function (sx, sy, ex, ey) { return _this.feedbackSpeed(sx, sy, ex, ey, '#0cf'); }, finishStop, function () { return _this.clearSpeedFeedback(); });
        var stop = area.createPress('allStop', 500, startStop, finishStop);
    };
    TouchHelm.prototype.feedbackRotation = function (startX, startY, endX, endY, color) {
        this.rotFeedback = {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            color: color,
        };
        if (this.rotGroup !== null) {
            this.rotGroup.redraw();
        }
    };
    TouchHelm.prototype.clearRotationFeedback = function () {
        this.rotFeedback = undefined;
        if (this.rotGroup !== null) {
            this.rotGroup.redraw();
        }
    };
    TouchHelm.prototype.drawRotationFeedback = function (ctx) {
        if (this.rotFeedback !== undefined) {
            this.drawFeedback(ctx, this.rotFeedback);
        }
    };
    TouchHelm.prototype.feedbackSpeed = function (startX, startY, endX, endY, color) {
        this.speedFeedback = {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            color: color,
        };
        if (this.speedGroup !== null) {
            this.speedGroup.redraw();
        }
    };
    TouchHelm.prototype.clearSpeedFeedback = function () {
        this.speedFeedback = undefined;
        if (this.speedGroup !== null) {
            this.speedGroup.redraw();
        }
    };
    TouchHelm.prototype.drawSpeedFeedback = function (ctx) {
        if (this.speedFeedback !== undefined) {
            this.drawFeedback(ctx, this.speedFeedback);
        }
    };
    TouchHelm.prototype.drawFeedback = function (ctx, feedback) {
        ctx.strokeStyle = feedback.color;
        ctx.lineWidth = 5;
        ctx.globalAlpha = 0.3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(feedback.startX, feedback.startY);
        ctx.lineTo(feedback.endX, feedback.endY);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1;
        ctx.lineCap = 'butt';
        ctx.stroke();
    };
    return TouchHelm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helm__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Helm__["a"]; });



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comms__ = __webpack_require__(64);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__comms__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__damage__ = __webpack_require__(69);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__damage__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helm__ = __webpack_require__(72);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__helm__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__power__ = __webpack_require__(80);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__power__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sensors__ = __webpack_require__(82);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__sensors__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__viewscreen__ = __webpack_require__(84);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_5__viewscreen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__warp__ = __webpack_require__(90);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__warp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__weapons__ = __webpack_require__(97);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__weapons__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ShipSystemComponent__ = __webpack_require__(5);
/* unused harmony reexport ShipSystemComponent */











/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CellList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ListCell__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CellList_scss__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CellList_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__CellList_scss__);
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



var CellList = (function (_super) {
    __extends(CellList, _super);
    function CellList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellList.prototype.render = function () {
        var _this = this;
        var cellsWide = 15;
        var cells = this.props.cells.map(function (cellType, index) {
            return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__ListCell__["a" /* ListCell */], { type: cellType, key: index, selected: index === _this.props.selectedIndex, clicked: function () { return _this.props.cellClicked(index); } }));
        });
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'powerCellList' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'powerCellList__headings' }, this.props.text.systems.power.spareCells),
            cells));
    };
    return CellList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListCell; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GridCell__ = __webpack_require__(28);
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



var ListCell = (function (_super) {
    __extends(ListCell, _super);
    function ListCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListCell.prototype.render = function () {
        var _this = this;
        var classes = 'gridCell gridCell--inList';
        if (this.props.selected) {
            classes += ' gridCell--selected';
        }
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["k" /* FlexibleCanvas */], { className: classes, onClick: this.props.clicked, draw: function (ctx, w, h) { return __WEBPACK_IMPORTED_MODULE_2__GridCell__["a" /* GridCell */].draw(ctx, w, h, _this.props.type); } }));
    };
    return ListCell;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PowerGrid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GridCell__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ReactorCell__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SystemCell__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PowerGrid_scss__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PowerGrid_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__PowerGrid_scss__);
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





var PowerGrid = (function (_super) {
    __extends(PowerGrid, _super);
    function PowerGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PowerGrid.prototype.render = function () {
        var _this = this;
        var cells = this.props.cells
            .filter(function (cell) { return (cell.type !== 2 /* System */ && cell.type !== 1 /* Reactor */) || cell.system !== undefined; })
            .map(function (cell, index) { return _this.renderCell(cell, index); });
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'powerGrid' }, cells);
    };
    PowerGrid.prototype.renderCell = function (cell, index) {
        var _this = this;
        if (cell.system !== undefined) {
            if (cell.type === 1 /* Reactor */) {
                return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__ReactorCell__["a" /* ReactorCell */], { col: cell.col, row: cell.row, endCol: cell.endCol, endRow: cell.endRow, power: cell.power, key: cell.index, clicked: this.props.reactorClicked, heatLevel: this.props.heatLevel, heatRate: this.props.heatRate, text: this.props.text }));
            }
            if (cell.type === 2 /* System */) {
                return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__SystemCell__["a" /* SystemCell */], { col: cell.col, row: cell.row, endCol: cell.endCol, endRow: cell.endRow, power: cell.power, system: cell.system, key: cell.index, text: this.props.text }));
            }
        }
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__GridCell__["a" /* GridCell */], { row: cell.row, col: cell.col, type: cell.type, power: cell.power, key: cell.index, clicked: function () { return _this.props.cellClicked(cell.index); }, text: this.props.text }));
    };
    return PowerGrid;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Power__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Client__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_systems_ShipSystemComponent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PowerGrid__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CellList__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__PowerManagement_scss__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__PowerManagement_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__PowerManagement_scss__);
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
    function PowerManagement(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    PowerManagement.prototype.name = function () { return 'power'; };
    PowerManagement.prototype.getHelpText = function () {
        return this.props.text.systemHelp.power;
    };
    PowerManagement.prototype.getOptionLabels = function () {
        return this.props.text.systems.power;
    };
    PowerManagement.prototype.render = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system power" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__PowerGrid__["a" /* PowerGrid */], { cells: this.props.cells, cellClicked: function (cellIndex) { return _this.gridCellClicked(cellIndex); }, reactorClicked: function () { return _this.reactorClicked(); }, heatLevel: this.props.heatLevel, heatRate: this.props.heatRate, text: this.props.text }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__CellList__["a" /* CellList */], { text: this.props.text, cells: this.props.spareCells, selectedIndex: this.state.selectedQueueCell, cellClicked: function (cellIndex) { return _this.spareCellClicked(cellIndex); } })); // currently storing spare "types" only, not full cell objects. Which to go with? Converting during render is ungainly.
    };
    PowerManagement.prototype.gridCellClicked = function (cellIndex) {
        // If a spare cell is selected, send place command. Otherwise, send rotate command.
        if (this.state.selectedQueueCell === undefined) {
            __WEBPACK_IMPORTED_MODULE_3__Client__["connection"].send("power_rotCell " + cellIndex);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_3__Client__["connection"].send("power_placeCell " + cellIndex + " " + this.state.selectedQueueCell);
            this.setState({
                selectedQueueCell: undefined,
            });
        }
    };
    PowerManagement.prototype.spareCellClicked = function (spareCellNum) {
        var selection = this.state.selectedQueueCell === spareCellNum ? undefined : spareCellNum;
        this.setState({
            selectedQueueCell: selection,
        });
    };
    PowerManagement.prototype.reactorClicked = function () {
        __WEBPACK_IMPORTED_MODULE_3__Client__["connection"].send('power_jog');
    };
    return PowerManagement;
}(__WEBPACK_IMPORTED_MODULE_4__components_systems_ShipSystemComponent__["a" /* ShipSystemComponent */]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
        cells: state.power.cells,
        reactorPower: state.power.reactorPower,
        heatLevel: state.power.heatLevel,
        heatRate: state.power.heatRate,
        spareCells: state.power.spareCells,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, __WEBPACK_IMPORTED_MODULE_2__store_Power__["a" /* actionCreators */], null, { withRef: true })(PowerManagement));


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactorCell; });
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

var ReactorCell = (function (_super) {
    __extends(ReactorCell, _super);
    function ReactorCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactorCell.prototype.render = function () {
        var style = {
            gridColumnStart: this.props.col,
            gridRowStart: this.props.row,
        };
        var classes = 'gridCell gridCell--reactor';
        if (this.props.endRow !== undefined && this.props.endCol !== undefined) {
            style.gridColumnEnd = this.props.endCol;
            style.gridRowEnd = this.props.endRow;
        }
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes, style: style, onClick: this.props.clicked },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "gridCell__sysname" }, this.props.text.systems.power.reactor),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "gridCell__power" }, this.props.power),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "gridCell__heat" }, this.props.heatLevel),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "gridCell__heatRate" },
                this.props.heatRate,
                " / s")));
    };
    return ReactorCell;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SystemCell; });
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

var SystemCell = (function (_super) {
    __extends(SystemCell, _super);
    function SystemCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SystemCell.prototype.render = function () {
        var style = {
            gridColumnStart: this.props.col,
            gridRowStart: this.props.row,
        };
        var classes = 'gridCell gridCell--system';
        if (this.props.endRow !== undefined && this.props.endCol !== undefined) {
            style.gridColumnEnd = this.props.endCol;
            style.gridRowEnd = this.props.endRow;
            if (this.props.endRow - this.props.row > this.props.endCol - this.props.col) {
                classes += ' gridCell--rotated';
            }
        }
        var sysName = this.props.system === undefined ? undefined : this.getSystemName(this.props.system);
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes, style: style },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "gridCell__sysname" }, sysName),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "gridCell__power" }, this.props.power)));
    };
    SystemCell.prototype.getSystemName = function (system) {
        switch (system) {
            case 1 /* Helm */:
                return this.props.text.systemNames.helm;
            case 2 /* Warp */:
                return this.props.text.systemNames.warp;
            case 3 /* BeamWeapons */:
                return this.props.text.systemNames.weapons + ' 1';
            case 4 /* Torpedoes */:
                return this.props.text.systemNames.weapons + ' 2';
            case 5 /* Sensors */:
                return this.props.text.systemNames.sensors;
            case 6 /* Shields */:
                return this.props.text.systemNames.shields;
            case 7 /* DamageControl */:
                return this.props.text.systemNames.damage;
            case 8 /* Comms */:
                return this.props.text.systemNames.comms;
            default:
                return '';
        }
    };
    return SystemCell;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PowerManagement__ = __webpack_require__(77);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__PowerManagement__["a"]; });



/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Sensors_scss__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Sensors_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Sensors_scss__);
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
    function Sensors(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Sensors.prototype.name = function () { return 'sensors'; };
    Sensors.prototype.getHelpText = function () {
        return this.props.text.systemHelp.sensors;
    };
    Sensors.prototype.getOptionLabels = function () {
        return this.props.text.systems.sensors;
    };
    Sensors.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system" }, "This is the sensors system. TODO: implement this!");
    };
    return Sensors;
}(__WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__["a" /* ShipSystemComponent */]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {}, null, { withRef: true })(Sensors));


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sensors__ = __webpack_require__(81);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Sensors__["a"]; });



/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ViewScreen_scss__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ViewScreen_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ViewScreen_scss__);
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
    function ViewScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ViewScreen.prototype.name = function () { return 'view'; };
    ViewScreen.prototype.getHelpText = function () {
        return this.props.text.systemHelp.view;
    };
    ViewScreen.prototype.getOptionLabels = function () {
        return this.props.text.systems.view;
    };
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
}(__WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__["a" /* ShipSystemComponent */]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
        inputMode: state.user.inputMode,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {}, null, { withRef: true })(ViewScreen));


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ViewScreen__ = __webpack_require__(83);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ViewScreen__["a"]; });



/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JumpCountdown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_general__ = __webpack_require__(2);
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


var JumpCountdown = (function (_super) {
    __extends(JumpCountdown, _super);
    function JumpCountdown(props) {
        var _this = _super.call(this, props) || this;
        _this.timer = 0;
        if (props.jumping) {
            _this.state = {
                secondsLeft: _this.determineSecondsLeft(props),
            };
        }
        else {
            _this.state = {
                secondsLeft: _this.determineSecondsLeft(props),
            };
        }
        return _this;
    }
    JumpCountdown.prototype.componentWillMount = function () {
        var _this = this;
        if (this.props.jumping || this.props.completion !== 100) {
            this.timer = setInterval(function () { return _this.updateTimer(); }, 1000);
        }
    };
    JumpCountdown.prototype.componentWillUpdate = function (nextProps, nextState) {
        var _this = this;
        if (nextProps.jumping || this.props.completion !== 100) {
            this.setState({
                secondsLeft: this.determineSecondsLeft(nextProps),
            });
            if (this.timer === 0) {
                this.timer = setInterval(function () { return _this.updateTimer(); }, 1000);
            }
        }
        else if (this.timer !== 0) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    };
    JumpCountdown.prototype.componentWillUnmount = function () {
        if (this.timer !== 0) {
            clearInterval(this.timer);
        }
    };
    JumpCountdown.prototype.render = function () {
        if (this.props.jumping) {
            return this.renderJumping();
        }
        else if (this.props.completion === 100) {
            return this.renderCharged();
        }
        else {
            return this.renderCharging();
        }
    };
    JumpCountdown.prototype.renderCharging = function () {
        var _this = this;
        var words = this.props.text.systems.warp;
        var footerButtons = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { centered: true, displayAsRow: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 4 /* Quandry */, text: this.props.text.common.cancel, clicked: function () { return _this.props.cancel(); } }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 3 /* Quaternary */, text: words.jump, disabled: true })));
        var points = this.props.path === undefined ? [] : this.props.path.points;
        var from = points.length > 0 ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["i" /* Coordinate */], { pos: points[0] }) : words.unknownPosition;
        var to = points.length > 1 ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["i" /* Coordinate */], { pos: points[points.length - 1] }) : words.unknownPosition;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["f" /* Panel */], { className: "warp__jumpCountdown warp__jumpCountdown--charging", footer: footerButtons, headerText: words.charging },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                words.preparingStart,
                " ",
                from,
                " ",
                words.to,
                " ",
                to,
                "..."),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                words.readyTime,
                " ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "countdown__number" }, this.state.secondsLeft),
                " ",
                words.seconds),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["j" /* ProgressBar */], { value: this.props.completion, maxValue: 100 }));
    };
    JumpCountdown.prototype.renderCharged = function () {
        var _this = this;
        var words = this.props.text.systems.warp;
        var footerButtons = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { centered: true, displayAsRow: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 4 /* Quandry */, text: this.props.text.common.cancel, clicked: function () { return _this.props.cancel(); } }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 3 /* Quaternary */, text: words.jump, clicked: function () { return _this.props.jump(); } })));
        var points = this.props.path === undefined ? [] : this.props.path.points;
        var from = points.length > 0 ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["i" /* Coordinate */], { pos: points[0] }) : words.unknownPosition;
        var to = points.length > 1 ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["i" /* Coordinate */], { pos: points[points.length - 1] }) : words.unknownPosition;
        var text = this.props.path !== undefined && this.props.path.status === 4 /* InRange */
            ? words.readyToJump : words.outOfRange;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["f" /* Panel */], { className: "warp__jumpCountdown warp__jumpCountdown--charged", footer: footerButtons },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                words.readyStart,
                " ",
                from,
                " ",
                words.to,
                " ",
                to,
                "..."),
            text);
    };
    JumpCountdown.prototype.renderJumping = function () {
        var words = this.props.text.systems.warp;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["f" /* Panel */], { className: "warp__jumpCountdown warp__jumpCountdown--jumping", headerText: words.jumpInProgress },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                words.eta,
                " ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "countdown__number" }, this.state.secondsLeft),
                " ",
                words.seconds));
    };
    JumpCountdown.prototype.updateTimer = function () {
        this.setState({
            secondsLeft: this.determineSecondsLeft(this.props),
        });
    };
    JumpCountdown.prototype.determineSecondsLeft = function (props) {
        var seconds;
        if (props.endTime === undefined) {
            return 0;
        }
        var ms = props.endTime.getTime() - new Date().getTime();
        return Math.round(ms / 1000);
    };
    return JumpCountdown;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JumpEditor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functionality__ = __webpack_require__(4);
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



var JumpEditor = (function (_super) {
    __extends(JumpEditor, _super);
    function JumpEditor(props) {
        var _this = _super.call(this, props) || this;
        var shipPos = props.getShipPos();
        _this.state = {
            startPosX: shipPos.x,
            startPosY: shipPos.y,
            startPosZ: shipPos.z,
            projectionYaw: 0,
            projectionPitch: 0,
            projectionPower: 50,
        };
        return _this;
    }
    JumpEditor.prototype.render = function () {
        var _this = this;
        var words = this.props.text.systems.warp;
        var footerButtons, headerText;
        switch (this.props.status) {
            case 1 /* Plotting */:
                footerButtons = this.renderPlottingButtons();
                break;
            case 2 /* Calculating */:
                footerButtons = this.renderCalculatingButtons();
                break;
            case 4 /* CalculationConfirm */:
                var path = this.props.editPath;
                if (path !== undefined) {
                    var end = path.points[path.points.length - 1];
                    headerText = words.jumpDestStart + " " + end.x + ", " + end.y + ", " + end.z;
                }
                footerButtons = this.renderConfirmButtons();
                break;
            case 3 /* CalculationFailed */:
                footerButtons = this.renderFailedButtons();
                break;
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["f" /* Panel */], { className: "warp__jumpEditor", footer: footerButtons, headerText: headerText },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { labelText: words.startPos },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["h" /* NumericTextbox */], { color: 0 /* Primary */, number: this.state.startPosX, numberChanged: function (v) { return _this.setState({ startPosX: v }); }, disabled: this.props.status !== 1 /* Plotting */ }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["h" /* NumericTextbox */], { color: 0 /* Primary */, number: this.state.startPosY, numberChanged: function (v) { return _this.setState({ startPosY: v }); }, disabled: this.props.status !== 1 /* Plotting */ }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["h" /* NumericTextbox */], { color: 0 /* Primary */, number: this.state.startPosZ, numberChanged: function (v) { return _this.setState({ startPosZ: v }); }, disabled: this.props.status !== 1 /* Plotting */ }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.startPosDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { labelText: words.projectionYaw, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["h" /* NumericTextbox */], { color: 1 /* Secondary */, number: this.state.projectionYaw, numberChanged: function (v) { return _this.setState({ projectionYaw: v }); }, disabled: this.props.status !== 1 /* Plotting */ }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.projectionYawDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { labelText: words.projectionPitch, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["h" /* NumericTextbox */], { color: 1 /* Secondary */, number: this.state.projectionPitch, numberChanged: function (v) { return _this.setState({ projectionPitch: v }); }, disabled: this.props.status !== 1 /* Plotting */ }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.projectionPitchDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { labelText: words.power, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["h" /* NumericTextbox */], { color: 2 /* Tertiary */, number: this.state.projectionPower, numberChanged: function (v) { return _this.setState({ projectionPower: v }); }, disabled: this.props.status !== 1 /* Plotting */ }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.powerDescription)));
    };
    JumpEditor.prototype.renderPlottingButtons = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { centered: true, displayAsRow: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 4 /* Quandry */, text: this.props.text.common.cancel, clicked: function () { return _this.props.close(); } }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 3 /* Quaternary */, text: this.props.text.systems.warp.calculate, disabled: this.shouldBlockCalculation(), clicked: function () { return _this.startCalculation(); } })));
    };
    JumpEditor.prototype.renderCalculatingButtons = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { centered: true, displayAsRow: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 4 /* Quandry */, text: this.props.text.systems.warp.stopCalculating, clicked: function () { return _this.props.cancelCalculation(); } }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 3 /* Quaternary */, text: this.props.text.systems.warp.calculating, disabled: true })));
    };
    JumpEditor.prototype.renderConfirmButtons = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { centered: true, displayAsRow: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 4 /* Quandry */, text: this.props.text.systems.warp.editPath, clicked: function () { return _this.props.rejectPath(); } }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 3 /* Quaternary */, text: this.props.text.systems.warp.keepPath, clicked: function () { return _this.props.close(); } })));
    };
    JumpEditor.prototype.renderFailedButtons = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { centered: true, displayAsRow: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 4 /* Quandry */, text: this.props.text.systems.warp.editPath, clicked: function () { return _this.props.rejectPath(); } }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 3 /* Quaternary */, text: this.props.text.systems.warp.calculationFailed, disabled: true })));
    };
    JumpEditor.prototype.shouldBlockCalculation = function () {
        return this.state.projectionYaw === undefined || this.state.projectionPitch === undefined
            || this.state.projectionPower === undefined || this.state.startPosX === undefined
            || this.state.startPosY === undefined || this.state.startPosZ === undefined;
    };
    JumpEditor.prototype.startCalculation = function () {
        if (this.shouldBlockCalculation()) {
            return;
        }
        var startPos = new __WEBPACK_IMPORTED_MODULE_2__functionality__["d" /* Vector3 */](this.state.startPosX, this.state.startPosY, this.state.startPosZ);
        this.props.startCalculating(startPos, this.state.projectionYaw, this.state.projectionPitch, this.state.projectionPower);
    };
    return JumpEditor;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PathList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PathListItem__ = __webpack_require__(88);
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



var PathList = (function (_super) {
    __extends(PathList, _super);
    function PathList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PathList.prototype.render = function () {
        var _this = this;
        var words = this.props.text.systems.warp;
        var path = this.props.selectedPath;
        var footerButtons = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["g" /* Field */], { centered: true, displayAsRow: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { disabled: path === undefined, color: 2 /* Tertiary */, text: words.deletePath, clicked: path === undefined ? undefined : function () { return _this.props.deletePath(path); } }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["b" /* PushButton */], { color: 1 /* Secondary */, text: path === undefined ? words.newPath : words.startJump, clicked: path === undefined ? this.props.newSelected : function () { return _this.props.startJump(path); } })));
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["f" /* Panel */], { className: "warp__pathList", footer: footerButtons, contentIsList: true }, this.props.paths.map(function (path) { return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__PathListItem__["a" /* PathListItem */], { key: path.id, path: path, text: _this.props.text, selected: _this.props.selectedPath === path, onSelected: function (p) { return _this.props.pathSelected(p); } })); }));
    };
    return PathList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PathListItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_general__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PathListItem_scss__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PathListItem_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__PathListItem_scss__);
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



var PathListItem = (function (_super) {
    __extends(PathListItem, _super);
    function PathListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PathListItem.prototype.render = function () {
        var _this = this;
        var words = this.props.text.systems.warp;
        var points = this.props.path.points;
        var from = points.length > 0 ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["i" /* Coordinate */], { pos: points[0], className: "warpPathListItem__coordinates" }) : words.unknownPosition;
        var to = points.length > 1 ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general__["i" /* Coordinate */], { pos: points[points.length - 1], className: "warpPathListItem__coordinates" }) : words.unknownPosition;
        var classes = 'warpPathListItem';
        if (this.props.selected) {
            classes += ' warpPathListItem--selected';
        }
        var outOfRange;
        switch (this.props.path.status) {
            case 4 /* InRange */:
                classes += ' warpPathListItem--inRange';
                break;
            case 3 /* Plotted */:
                outOfRange = ': ' + words.outOfRange;
                classes += ' warpPathListItem--outOfRange';
                break;
            case 2 /* Invalid */:
                classes += ' warpPathListItem--invalid';
                break;
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes, onClickCapture: function () { return _this.props.onSelected(_this.props.path); } },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "warpPathListItem__name" },
                    words.jump,
                    " #",
                    this.props.path.id),
                outOfRange),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "warpPathListItem__points" },
                words.from,
                " ",
                from,
                " ",
                words.to,
                " ",
                to),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "warpPathListItem__power" },
                words.power,
                ": ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "warpPathListItem__number" }, this.props.path.power)));
    };
    return PathListItem;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Warp__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_systems_ShipSystemComponent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_general_SensorView__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__JumpCountdown__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__JumpEditor__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__PathList__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Client__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Warp_scss__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Warp_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__Warp_scss__);
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










var Warp = (function (_super) {
    __extends(Warp, _super);
    function Warp(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            autoRotate: true,
        };
        return _this;
    }
    Warp.prototype.name = function () { return 'warp'; };
    Warp.prototype.getHelpText = function () {
        return this.props.text.systemHelp.warp;
    };
    Warp.prototype.getOptionLabels = function () {
        return this.props.text.systems.warp;
    };
    Warp.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system warp" },
            this.renderControlPanel(),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_general_SensorView__["a" /* SensorView */], { className: "warp__sensorMap", autoRotate: this.state.autoRotate, targets: this.props.sensorTargets.concat(this.props.paths) }));
    };
    Warp.prototype.renderControlPanel = function () {
        var _this = this;
        switch (this.props.status) {
            case 0 /* Viewing */:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__PathList__["a" /* PathList */], { text: this.props.text, paths: this.props.paths, selectedPath: this.props.activePath, pathSelected: function (p) { return _this.pathSelected(p); }, newSelected: function () { return _this.showEdit(); }, deletePath: function (p) { return _this.deletePath(p); }, startJump: function (p) { return _this.startJump(p); } });
            case 5 /* Charging */:
            case 6 /* Jumping */:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__JumpCountdown__["a" /* JumpCountdown */], { text: this.props.text, path: this.props.activePath, endTime: this.props.jumpEndTime, completion: this.props.chargeCompletion, jumping: this.props.status === 6 /* Jumping */, cancel: function () { return _this.cancelJump(); }, jump: function () { return _this.performJump(); } });
            default:
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__JumpEditor__["a" /* JumpEditor */], { text: this.props.text, editPath: this.props.activePath, startCalculating: function (from, yaw, pitch, power) { return _this.calculatePath(from, yaw, pitch, power); }, rejectPath: function () { return _this.rejectPath(); }, close: function () { return _this.closeEdit(); }, cancelCalculation: function () { return _this.cancelCalculation(); }, status: this.props.status, getShipPos: function () { return _this.props.shipPosition; } });
        }
    };
    Warp.prototype.pathSelected = function (path) {
        this.props.selectPath(path === this.props.activePath ? undefined : path.id);
    };
    Warp.prototype.showEdit = function (path) {
        this.props.selectPath(path === undefined ? undefined : path.id);
        this.props.setScreenStatus(1 /* Plotting */);
    };
    Warp.prototype.deletePath = function (path) {
        __WEBPACK_IMPORTED_MODULE_8__Client__["connection"].send("warp_delete " + path.id);
    };
    Warp.prototype.startJump = function (path) {
        __WEBPACK_IMPORTED_MODULE_8__Client__["connection"].send("warp_prepare_jump " + path.id);
    };
    Warp.prototype.cancelJump = function () {
        __WEBPACK_IMPORTED_MODULE_8__Client__["connection"].send('warp_jump_cancel');
    };
    Warp.prototype.performJump = function () {
        __WEBPACK_IMPORTED_MODULE_8__Client__["connection"].send('warp_jump');
    };
    Warp.prototype.cancelCalculation = function () {
        this.props.setScreenStatus(1 /* Plotting */);
        __WEBPACK_IMPORTED_MODULE_8__Client__["connection"].send('warp_plot_cancel');
    };
    Warp.prototype.closeEdit = function () {
        this.props.selectPath(undefined);
        this.props.setScreenStatus(0 /* Viewing */);
    };
    Warp.prototype.rejectPath = function () {
        __WEBPACK_IMPORTED_MODULE_8__Client__["connection"].send('warp_plot_reject');
        this.props.setScreenStatus(1 /* Plotting */);
    };
    Warp.prototype.calculatePath = function (from, yaw, pitch, power) {
        this.props.setScreenStatus(2 /* Calculating */);
        __WEBPACK_IMPORTED_MODULE_8__Client__["connection"].send("warp_plot " + from.x + " " + from.y + " " + from.z + " " + yaw + " " + pitch + " " + power);
    };
    return Warp;
}(__WEBPACK_IMPORTED_MODULE_3__components_systems_ShipSystemComponent__["a" /* ShipSystemComponent */]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return __assign({}, state.warp, { sensorTargets: state.sensors.targets, text: state.user.text, selectPath: __WEBPACK_IMPORTED_MODULE_2__store_Warp__["a" /* actionCreators */].selectPath, setScreenStatus: __WEBPACK_IMPORTED_MODULE_2__store_Warp__["a" /* actionCreators */].setScreenStatus });
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, __WEBPACK_IMPORTED_MODULE_2__store_Warp__["a" /* actionCreators */], null, { withRef: true })(Warp));


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Warp__ = __webpack_require__(89);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Warp__["a"]; });



/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FireSetup; });
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

var FireSetup = (function (_super) {
    __extends(FireSetup, _super);
    function FireSetup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FireSetup.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null);
        // TODO: implement
    };
    return FireSetup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TargetInfo; });
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

var TargetInfo = (function (_super) {
    __extends(TargetInfo, _super);
    function TargetInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TargetInfo.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null);
        // TODO: implement
    };
    return TargetInfo;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TargetList; });
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

var TargetList = (function (_super) {
    __extends(TargetList, _super);
    function TargetList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TargetList.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "weapons__targetList" });
        // TODO: implement
    };
    return TargetList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TargetSelected; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TargetInfo__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FireSetup__ = __webpack_require__(91);
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



var TargetSelected = (function (_super) {
    __extends(TargetSelected, _super);
    function TargetSelected() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TargetSelected.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system weapons weapons--targetSelected" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__TargetInfo__["a" /* TargetInfo */], { text: this.props.text, target: this.props.target }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__FireSetup__["a" /* FireSetup */], { text: this.props.text, target: this.props.target }));
        // TODO: implement ... dice and info
    };
    return TargetSelected;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TargetSelection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_general_SensorView__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TargetList__ = __webpack_require__(93);
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



var TargetSelection = (function (_super) {
    __extends(TargetSelection, _super);
    function TargetSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TargetSelection.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system weapons weapons--targetSelection" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_general_SensorView__["a" /* SensorView */], { className: "weapons__targetSelect", targets: this.props.allTargets }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__TargetList__["a" /* TargetList */], { text: this.props.text, targets: this.props.allTargets }));
    };
    return TargetSelection;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]));



/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TargetSelection__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TargetSelected__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Weapons_scss__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Weapons_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Weapons_scss__);
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
    function Weapons(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Weapons.prototype.name = function () { return 'weapons'; };
    Weapons.prototype.getHelpText = function () {
        return this.props.text.systemHelp.weapons;
    };
    Weapons.prototype.getOptionLabels = function () {
        return this.props.text.systems.weapons;
    };
    Weapons.prototype.render = function () {
        if (this.props.selectedTarget === undefined) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__TargetSelection__["a" /* TargetSelection */], { text: this.props.text, allTargets: this.props.allTargets });
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__TargetSelected__["a" /* TargetSelected */], { text: this.props.text, target: this.props.selectedTarget });
    };
    return Weapons;
}(__WEBPACK_IMPORTED_MODULE_2__components_systems_ShipSystemComponent__["a" /* ShipSystemComponent */]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return {
        text: state.user.text,
        allTargets: state.sensors.targets,
    };
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {}, null, { withRef: true })(Weapons));


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Weapons__ = __webpack_require__(96);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Weapons__["a"]; });



/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_Crew__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_Helm__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_Warp__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_Power__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_Sensors__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__functionality__ = __webpack_require__(4);








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
            case 'helm_manoever_limits': {
                var vals = data.split(' ');
                var pitch = parseFloat(vals[0]);
                var yaw = parseFloat(vals[1]);
                var roll = parseFloat(vals[2]);
                var translationX = parseFloat(vals[3]);
                var translationY = parseFloat(vals[4]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_3__store_Helm__["a" /* actionCreators */].setManoeveringLimits(pitch, yaw, roll, translationX, translationY));
                break;
            }
            case 'helm_speed_limits': {
                var vals = data.split(' ');
                var forwardMax = parseFloat(vals[0]);
                var revMax = parseFloat(vals[1]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_3__store_Helm__["a" /* actionCreators */].setSpeedLimits(forwardMax, revMax));
                break;
            }
            case 'helm_rotation': {
                var vals = data.split(' ');
                var pitch = parseFloat(vals[0]);
                var yaw = parseFloat(vals[1]);
                var roll = parseFloat(vals[2]);
                var pitchRate = parseFloat(vals[3]);
                var yawRate = parseFloat(vals[4]);
                var rollRate = parseFloat(vals[5]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_3__store_Helm__["a" /* actionCreators */].setOrientation(pitch, yaw, roll));
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_3__store_Helm__["a" /* actionCreators */].setRotationRates(pitchRate, yawRate, rollRate));
                break;
            }
            case 'helm_translation_rates': {
                var vals = data.split(' ');
                var forward = parseFloat(vals[0]);
                var horiz = parseFloat(vals[1]);
                var vert = parseFloat(vals[2]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_3__store_Helm__["a" /* actionCreators */].setTranslationRates(horiz, vert, forward));
                break;
            }
            case 'sensor_target': {
                var target = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__functionality__["e" /* parseSensorTarget */])(data);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_6__store_Sensors__["a" /* actionCreators */].addTarget(target));
                break;
            }
            case 'warp_clear': {
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].clearAll());
                break;
            }
            case 'warp_add_path': {
                var vals = data.split(' ');
                var id = parseInt(vals[0]);
                var status_1 = parseInt(vals[1]);
                var power = parseFloat(vals[2]);
                var points = [];
                for (var i = 5; i < vals.length; i += 3) {
                    points.push(new __WEBPACK_IMPORTED_MODULE_7__functionality__["d" /* Vector3 */](parseFloat(vals[i - 2]), parseFloat(vals[i - 1]), parseFloat(vals[i])));
                }
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].addPath(id, status_1, points, power));
                break;
            }
            case 'warp_ext_path': {
                var vals = data.split(' ');
                var id = parseInt(vals[0]);
                var points = [];
                for (var i = 3; i < vals.length; i += 3) {
                    points.push(new __WEBPACK_IMPORTED_MODULE_7__functionality__["d" /* Vector3 */](parseFloat(vals[i - 2]), parseFloat(vals[i - 1]), parseFloat(vals[i])));
                }
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].extendPath(id, points));
                break;
            }
            case 'warp_rem_path': {
                var vals = data.split(' ');
                var id_1 = parseInt(vals[0]);
                var displayInvalid = parseInt(vals[1]) === 1;
                if (displayInvalid) {
                    // mark invalid now, then remove after 2 secs
                    __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].setPathStatus(id_1, 2 /* Invalid */));
                    setTimeout(function () { return __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].removePath(id_1)); }, 2000);
                }
                else {
                    // remove immediately
                    __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].removePath(id_1));
                }
                break;
            }
            case 'warp_charge_jump': {
                var vals = data.split(' ');
                var id = parseInt(vals[0]);
                var secsRemaining = parseInt(vals[1]);
                var completion = parseInt(vals[2]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].chargeJump(id, secsRemaining, completion));
                break;
            }
            case 'warp_cancel_jump': {
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].setScreenStatus(0 /* Viewing */));
                break;
            }
            case 'warp_jump_failed': {
                // TODO: handle "jump failed" better, idk...
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].setScreenStatus(5 /* Charging */));
                break;
            }
            case 'warp_ship_pos': {
                var vals = data.split(' ');
                var x = parseInt(vals[0]);
                var y = parseInt(vals[1]);
                var z = parseInt(vals[2]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].setShipPosition(x, y, z));
                break;
            }
            case 'warp_jump': {
                var vals = data.split(' ');
                var id = parseInt(vals[0]);
                var secsRemaining = parseInt(vals[1]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_4__store_Warp__["a" /* actionCreators */].performJump(id, secsRemaining));
                break;
            }
            case 'power_cell_t': {
                var vals = data.split(' ').map(function (v) { return parseInt(v); });
                var cell = vals[0];
                var type = vals[1];
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_5__store_Power__["a" /* actionCreators */].setCellType(cell, type));
                break;
            }
            case 'power_all_cells_t': {
                var types = data.split(' ').map(function (v) { return parseInt(v); });
                if (types.length !== __WEBPACK_IMPORTED_MODULE_5__store_Power__["b" /* numCells */]) {
                    throw "Invalid number of power cells: need " + __WEBPACK_IMPORTED_MODULE_5__store_Power__["b" /* numCells */] + ", but got " + types.length + ": " + data;
                }
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_5__store_Power__["a" /* actionCreators */].setAllCellTypes(types));
                break;
            }
            case 'power_cell_p': {
                var vals = data.split(' ').map(function (v) { return parseInt(v); });
                var cell = vals[0];
                var level = vals[1];
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_5__store_Power__["a" /* actionCreators */].setCellPower(cell, level));
                break;
            }
            case 'power_all_cells_p': {
                var levels = data.split(' ').map(function (v) { return parseInt(v); });
                if (levels.length !== __WEBPACK_IMPORTED_MODULE_5__store_Power__["b" /* numCells */]) {
                    throw "Invalid number of power cells: need " + __WEBPACK_IMPORTED_MODULE_5__store_Power__["b" /* numCells */] + ", but got " + levels.length + ": " + data;
                }
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_5__store_Power__["a" /* actionCreators */].setAllCellPower(levels));
                break;
            }
            case 'power_all_sys': {
                var values = data.split(' ');
                var systems = [];
                var sysNum = 0;
                for (var i = 2; i < values.length; i += 3) {
                    systems.push({
                        system: parseInt(values[i - 2]),
                        start: parseInt(values[i - 1]),
                        end: parseInt(values[i]),
                    });
                }
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_5__store_Power__["a" /* actionCreators */].setAllSystems(systems));
                break;
            }
            case 'power_heat': {
                var vals = data.split(' ').map(function (v) { return parseInt(v); });
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_5__store_Power__["a" /* actionCreators */].setHeatLevels(vals[0], vals[1]));
                break;
            }
            case 'power_reactor': {
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_5__store_Power__["a" /* actionCreators */].setReactorPower(parseInt(data)));
                break;
            }
            case 'power_all_spare': {
                var types = data.length == 0 ? [] : data.split(' ').map(function (v) { return parseInt(v); });
                if (types.length > __WEBPACK_IMPORTED_MODULE_5__store_Power__["c" /* maxNumSpare */]) {
                    throw "Invalid number of spare power cells: maximum of " + __WEBPACK_IMPORTED_MODULE_5__store_Power__["c" /* maxNumSpare */] + ", but got " + types.length + ": " + data;
                }
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_5__store_Power__["a" /* actionCreators */].setAllSpareCells(types));
                break;
            }
            default:
                console.log("Unexpected command: " + cmd);
                break;
        }
    };
    return Connection;
}());



/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hotkeys; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(3);
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
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Localisations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__localisations_English__ = __webpack_require__(113);

var Localisations = [
    {
        name: 'English',
        flag: 'english.png',
        load: function () { return __WEBPACK_IMPORTED_MODULE_0__localisations_English__["a" /* default */]; },
    }
];


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShipSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return allSystems; });
/* harmony export (immutable) */ __webpack_exports__["b"] = getSystemName;
var ShipSystem;
(function (ShipSystem) {
    ShipSystem[ShipSystem["None"] = 0] = "None";
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
        case ShipSystem.None:
            return '';
        default:
            var exhaustiveCheck = system;
    }
}


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeFace; });
var CubeFace = (function () {
    function CubeFace(origNormal, origVertices, drawSymbol) {
        this.origNormal = origNormal;
        this.origVertices = origVertices;
        this.drawSymbol = drawSymbol;
    }
    CubeFace.prototype.reset = function () {
        this.normal = this.origNormal.clone();
        var vertices = this.origVertices;
        this.vertices = [vertices[0].clone(), vertices[1].clone(), vertices[2].clone(), vertices[3].clone()];
    };
    CubeFace.prototype.applyTransform = function (ctx, size) {
        var tl = this.vertices[0], tr = this.vertices[1], br = this.vertices[2];
        //let oldMatrix: matrix = [[-1, 1, 1], [1, 1, -1], [1, 1, 1]];
        //let inverseOld: matrix = CubeFace.getMatrixInverse(oldMatrix);
        var inverseOld = [[-.5, 0, .5], [.5, .5, 0], [0, -.5, .5]];
        var newMatrix = [[tl.x, tr.x, br.x], [tl.y, tr.y, br.y]];
        var transform = CubeFace.matrixMultiply(newMatrix, inverseOld);
        ctx.transform(transform[0][0], transform[1][0], transform[0][1], transform[1][1], transform[0][2], transform[1][2]);
    };
    CubeFace.matrixMultiply = function (matrixA, matrixB) {
        var n = 2, m = 3, p = 3;
        var matrixC = [[0, 0, 0], [0, 0, 0]];
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < p; j++) {
                var sum = 0;
                for (var k = 0; k < m; k++) {
                    sum += matrixA[i][k] * matrixB[k][j];
                }
                matrixC[i][j] = sum;
            }
        }
        return matrixC;
    };
    return CubeFace;
}());



/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrientationCube; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cube__ = __webpack_require__(29);
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

var OrientationCube = (function (_super) {
    __extends(OrientationCube, _super);
    function OrientationCube() {
        return _super.call(this, OrientationCube.drawTopFace, OrientationCube.drawBottomFace, OrientationCube.drawLeftFace, OrientationCube.drawRightFace, OrientationCube.drawFrontFace, OrientationCube.drawRearFace) || this;
    }
    OrientationCube.drawFrontFace = function (ctx) {
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.setLineDash(OrientationCube.noDash);
        ctx.beginPath();
        ctx.moveTo(-0.6, -0.6);
        ctx.lineTo(0, 0);
        ctx.lineTo(0.6, -0.6);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.thickDash);
        ctx.beginPath();
        ctx.moveTo(-0.6, 0.6);
        ctx.lineTo(0, 0);
        ctx.lineTo(0.6, 0.6);
        ctx.stroke();
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.setLineDash(OrientationCube.noDash);
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.thinDash);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 1);
        ctx.stroke();
    };
    OrientationCube.drawRearFace = function (ctx) {
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.setLineDash(OrientationCube.noDash);
        ctx.beginPath();
        ctx.moveTo(-0.6, -0.4);
        ctx.lineTo(0, -1);
        ctx.lineTo(0.6, -0.4);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.thickDash);
        ctx.beginPath();
        ctx.moveTo(-0.6, 0.4);
        ctx.lineTo(0, 1);
        ctx.lineTo(0.6, 0.4);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.thinDash);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 1);
        ctx.stroke();
    };
    OrientationCube.drawLeftFace = function (ctx) {
        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.beginPath();
        ctx.moveTo(-0.3, -0.6);
        ctx.lineTo(-0.9, 0);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.thickDash);
        ctx.moveTo(-0.9, 0);
        ctx.lineTo(-0.3, 0.6);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.lineTo(1, 0);
        ctx.stroke();
    };
    OrientationCube.drawRightFace = function (ctx) {
        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.beginPath();
        ctx.moveTo(0.3, -0.6);
        ctx.lineTo(0.9, 0);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.thickDash);
        ctx.moveTo(0.9, 0);
        ctx.lineTo(0.3, 0.6);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.lineTo(1, 0);
        ctx.stroke();
    };
    OrientationCube.drawTopFace = function (ctx) {
        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.beginPath();
        ctx.moveTo(-0.6, -0.3);
        ctx.lineTo(0, -0.9);
        ctx.lineTo(0.6, -0.3);
        ctx.stroke();
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, 1);
        ctx.stroke();
    };
    OrientationCube.drawBottomFace = function (ctx) {
        ctx.setLineDash(OrientationCube.thickDash);
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.beginPath();
        ctx.moveTo(-0.6, -0.3);
        ctx.lineTo(0, -0.9);
        ctx.lineTo(0.6, -0.3);
        ctx.stroke();
        ctx.setLineDash(OrientationCube.thinDash);
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, 1);
        ctx.stroke();
    };
    OrientationCube.thinLine = 0.1;
    OrientationCube.thickLine = 0.2;
    OrientationCube.thinDash = [OrientationCube.thinLine, OrientationCube.thinLine];
    OrientationCube.thickDash = [0.15, 0.15];
    OrientationCube.noDash = [];
    return OrientationCube;
}(__WEBPACK_IMPORTED_MODULE_0__Cube__["a" /* Cube */]));



/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cube__ = __webpack_require__(29);
/* unused harmony reexport Cube */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Orientation__ = __webpack_require__(103);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__Orientation__["a"]; });




/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Matrix; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector3__ = __webpack_require__(14);

var Matrix = (function () {
    function Matrix(elements) {
        this.elements = elements;
    }
    Matrix.prototype.element = function (x, y) {
        if (x < 0 || x > 2 || y < 0 || y > 2) {
            throw 'Matrix x & y must be in the range 0 - 2';
        }
        return this.elements[y * 3 + x];
    };
    Matrix.prototype.clone = function () {
        return new Matrix(this.elements.slice());
    };
    Matrix.prototype.multiply = function (other) {
        var elements = [];
        for (var z = 0; z < 3; z++) {
            for (var y = 0; y < 3; y++) {
                var sum = 0;
                for (var x = 0; x < 3; x++) {
                    sum += other.element(y, x) * this.element(x, z);
                }
                elements.push(sum);
            }
        }
        return new Matrix(elements);
    };
    Matrix.prototype.multiplyVector = function (other) {
        var x = other.x * this.element(0, 0)
            + other.y * this.element(1, 0)
            + other.z * this.element(2, 0);
        var y = other.x * this.element(0, 1)
            + other.y * this.element(1, 1)
            + other.z * this.element(2, 1);
        var z = other.x * this.element(0, 2)
            + other.y * this.element(1, 2)
            + other.z * this.element(2, 2);
        return new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](x, y, z);
    };
    Matrix.xRotation = function (angle) {
        var a = Math.cos(angle);
        var b = Math.sin(angle);
        return new Matrix([
            1, 0, 0,
            0, a, -b,
            0, b, a,
        ]);
    };
    Matrix.yRotation = function (angle) {
        var a = Math.cos(angle);
        var b = Math.sin(angle);
        return new Matrix([
            a, 0, b,
            0, 1, 0,
            -b, 0, a,
        ]);
    };
    Matrix.zRotation = function (angle) {
        var a = Math.cos(angle);
        var b = Math.sin(angle);
        return new Matrix([
            a, -b, 0,
            b, a, 0,
            0, 0, 1,
        ]);
    };
    Matrix.identity = new Matrix([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ]);
    return Matrix;
}());



/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vector2; });
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    Vector2.prototype.subtract = function (other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    };
    Vector2.prototype.scale = function (factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    };
    Vector2.prototype.isBetween = function (min, max) {
        return this.x >= min.x && this.x <= max.x
            && this.y >= min.y && this.y <= max.y;
    };
    Vector2.prototype.rotate = function (angle) {
        var cosa = Math.cos(angle);
        var sina = Math.sin(angle);
        var prevX = this.x;
        this.x = this.x * cosa + this.y * sina;
        this.y = this.y * cosa - prevX * sina;
        return this;
    };
    Vector2.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    return Vector2;
}());



/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JumpPath; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SensorTarget__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functionality_math__ = __webpack_require__(10);
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


var JumpPath = (function (_super) {
    __extends(JumpPath, _super);
    function JumpPath(id, power, status, points) {
        var _this = _super.call(this, id, points[0]) || this;
        _this.power = power;
        _this.status = status;
        _this.points = points;
        _this.highlighted = false;
        return _this;
    }
    JumpPath.prototype.isBetween = function (min, max) {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (this.position.isBetween(min, max)) {
                return true;
            }
        }
        return false;
    };
    JumpPath.prototype.getShadowRadius = function (display) { return 0; };
    JumpPath.prototype.drawTarget = function (ctx, screenPos, display) {
        if (this.highlighted) {
            ctx.strokeStyle = '#fff';
        }
        else {
            switch (this.status) {
                case 4 /* InRange */:
                    ctx.strokeStyle = '#cfc';
                    break;
                case 2 /* Invalid */:
                    ctx.strokeStyle = '#f66';
                    break;
                case 1 /* Calculating */:
                    ctx.setLineDash([5, 3]);
                //break; NO BREAK SO THIS USES SAME COLOR AS default
                default:
                    ctx.strokeStyle = '#ccc';
                    break;
            }
        }
        ctx.lineWidth = display.onePixel * 3;
        ctx.beginPath();
        var first = true;
        var firstScreenPos = new __WEBPACK_IMPORTED_MODULE_1__functionality_math__["b" /* Vector2 */](0, 0);
        var lastScreenPos = firstScreenPos;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var screenPos_1 = display.transform(point).position;
            lastScreenPos = screenPos_1;
            if (first) {
                firstScreenPos = screenPos_1;
                ctx.moveTo(screenPos_1.x, screenPos_1.y);
                first = false;
            }
            else {
                ctx.lineTo(screenPos_1.x, screenPos_1.y);
            }
            // TODO: should curve between these points
        }
        ctx.stroke();
        ctx.setLineDash([]);
        if (!this.highlighted) {
            ctx.globalAlpha = 0.8;
        }
        this.drawStartIndicator(ctx, display, firstScreenPos);
        if (this.status !== 1 /* Calculating */) {
            this.drawEndIndicator(ctx, display, lastScreenPos);
        }
        ctx.globalAlpha = 1;
    };
    JumpPath.prototype.drawStartIndicator = function (ctx, display, screenPos) {
        ctx.strokeStyle = '#0cf';
        ctx.lineWidth = display.onePixel * 3;
        var radius = display.onePixel * 10;
        ctx.beginPath();
        ctx.arc(screenPos.x, screenPos.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    };
    JumpPath.prototype.drawEndIndicator = function (ctx, display, screenPos) {
        ctx.strokeStyle = '#fc0';
        ctx.lineWidth = display.onePixel * 3;
        var crossSize = display.onePixel * 10;
        ctx.beginPath();
        ctx.moveTo(screenPos.x - crossSize, screenPos.y - crossSize);
        ctx.lineTo(screenPos.x + crossSize, screenPos.y + crossSize);
        ctx.moveTo(screenPos.x + crossSize, screenPos.y - crossSize);
        ctx.lineTo(screenPos.x - crossSize, screenPos.y + crossSize);
        ctx.stroke();
    };
    JumpPath.prototype.drawIndicator = function (ctx, targetPos, display, floorPos) {
        _super.prototype.drawIndicator.call(this, ctx, targetPos, display, floorPos);
        /*
                // TODO: uncomment once floorZ is available here
        
                if (this.points.length <= 1) {
                    return;
                }
        
                let lastPoint = this.points[this.points.length - 1];
                let endScreenPos = display.transform(lastPoint).position;
                let endFloorPos = display.transform(new Vector3(lastPoint.x, lastPoint.y, floorZ)).position;
        
                super.drawIndicator(ctx, endScreenPos, display, endFloorPos);
        */
    };
    return JumpPath;
}(__WEBPACK_IMPORTED_MODULE_0__SensorTarget__["a" /* SensorTarget */]));



/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MoveableTarget; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RelatableTarget__ = __webpack_require__(31);
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

var MoveableTarget = (function (_super) {
    __extends(MoveableTarget, _super);
    function MoveableTarget(id, position, velocity, relationship) {
        var _this = _super.call(this, id, position, relationship) || this;
        _this.velocity = velocity;
        return _this;
    }
    MoveableTarget.prototype.interpolate = function (interval) {
        this.position.x += this.velocity.x * interval;
        this.position.y += this.velocity.y * interval;
        this.position.z += this.velocity.z * interval;
    };
    return MoveableTarget;
}(__WEBPACK_IMPORTED_MODULE_0__RelatableTarget__["a" /* RelatableTarget */]));



/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Planet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Celestial__ = __webpack_require__(30);
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

var Planet = (function (_super) {
    __extends(Planet, _super);
    function Planet(id, position, color, radius) {
        return _super.call(this, id, position, color, radius) || this;
    }
    return Planet;
}(__WEBPACK_IMPORTED_MODULE_0__Celestial__["a" /* Celestial */]));



/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ship; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MoveableTarget__ = __webpack_require__(108);
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

var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(id, position, velocity, relationship) {
        return _super.call(this, id, position, velocity, relationship) || this;
    }
    Ship.prototype.getShadowRadius = function (display) { return display.onePixel * 10; };
    Ship.prototype.drawTarget = function (ctx, screenPos, display) {
        // TODO: better ship symbol, indicating direction of velocity
        ctx.beginPath();
        ctx.moveTo(screenPos.x, screenPos.y - 15 * display.onePixel);
        ctx.lineTo(screenPos.x + 9 * display.onePixel, screenPos.y + 15 * display.onePixel);
        ctx.lineTo(screenPos.x - 9 * display.onePixel, screenPos.y + 15 * display.onePixel);
        ctx.fill();
    };
    return Ship;
}(__WEBPACK_IMPORTED_MODULE_0__MoveableTarget__["a" /* MoveableTarget */]));



/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Star; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Celestial__ = __webpack_require__(30);
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

var Star = (function (_super) {
    __extends(Star, _super);
    function Star(id, position, color, radius, damageRadius) {
        var _this = _super.call(this, id, position, color, radius) || this;
        _this.damageRadius = damageRadius;
        return _this;
    }
    Star.prototype.drawTarget = function (ctx, screenPos, display) {
        ctx.filter = 'blur(8px)';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(screenPos.x, screenPos.y, this.radius * 1.05, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = 'none';
        _super.prototype.drawTarget.call(this, ctx, screenPos, display);
    };
    return Star;
}(__WEBPACK_IMPORTED_MODULE_0__Celestial__["a" /* Celestial */]));



/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Station; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RelatableTarget__ = __webpack_require__(31);
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

var Station = (function (_super) {
    __extends(Station, _super);
    function Station(id, position, relationship) {
        return _super.call(this, id, position, relationship) || this;
    }
    Station.prototype.getShadowRadius = function (display) { return display.onePixel * 14; };
    Station.prototype.drawTarget = function (ctx, screenPos, display) {
        // TODO: better station symbol
        var halfSize = display.onePixel * 14, size = halfSize + halfSize;
        ctx.fillRect(screenPos.x - halfSize, screenPos.y - halfSize, size, size);
    };
    return Station;
}(__WEBPACK_IMPORTED_MODULE_0__RelatableTarget__["a" /* RelatableTarget */]));



/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var words = {
    common: {
        save: 'Save',
        cancel: 'Cancel',
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
            readyTime: 'Ready to Jump in:',
            readyToJump: 'Ready to Jump',
            outOfRange: 'Out of Range',
            charging: 'Charging...',
            jumpInProgress: 'Jumping...',
            seconds: 'seconds',
            startPos: 'Start',
            startPosDescription: 'Location this jump will start from',
            projectionYaw: 'Yaw',
            projectionYawDescription: 'Yaw of jump direction',
            projectionPitch: 'Pitch',
            projectionPitchDescription: 'Pitch of jump direction',
            calculate: 'Calculate jump',
            calculating: 'Calculating...',
            stopCalculating: 'Stop calculating',
            editPath: 'Edit path',
            keepPath: 'Save path',
            calculationFailed: 'Calculation failed',
            preparingStart: 'Preparing to jump from',
            readyStart: 'Ready to jump from',
            jumpDestStart: 'Jump plotted to',
            autoRotate: 'Auto-rotate map',
        },
        weapons: {},
        sensors: {},
        power: {
            spareCells: 'Available cells:',
            reactor: 'Reactor',
            heat: 'Heat',
        },
        damage: {},
        comms: {},
        view: {},
    },
};
/* harmony default export */ __webpack_exports__["a"] = (words);


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Crew__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Screen__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Helm__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Power__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Sensors__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Warp__ = __webpack_require__(16);







// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    user: __WEBPACK_IMPORTED_MODULE_0__User__["b" /* reducer */],
    crew: __WEBPACK_IMPORTED_MODULE_1__Crew__["b" /* reducer */],
    screen: __WEBPACK_IMPORTED_MODULE_2__Screen__["d" /* reducer */],
    helm: __WEBPACK_IMPORTED_MODULE_3__Helm__["b" /* reducer */],
    power: __WEBPACK_IMPORTED_MODULE_4__Power__["d" /* reducer */],
    sensors: __WEBPACK_IMPORTED_MODULE_5__Sensors__["b" /* reducer */],
    warp: __WEBPACK_IMPORTED_MODULE_6__Warp__["b" /* reducer */],
};


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export numCells */
/* unused harmony export maxNumSpare */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fullPowerLevel; });
/* unused harmony export actionCreators */
/* unused harmony export reducer */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var numCells = 121;
var maxNumSpare = 5;
var fullPowerLevel = 10;
var numCellColumns = 11;
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    setReactorPower: function (val) { return ({
        type: 'REACTOR_POWER',
        value: val,
    }); },
    setHeatLevels: function (val, rate) { return ({
        type: 'HEAT_LEVELS',
        value: val,
        rate: rate,
    }); },
    setCellType: function (cellID, cellType) { return ({
        type: 'SET_CELL_T',
        cellID: cellID,
        cellType: cellType,
    }); },
    setAllCellTypes: function (cellTypes) { return ({
        type: 'SET_ALL_CELLS_T',
        cellTypes: cellTypes,
    }); },
    setCellPower: function (cellID, cellPower) { return ({
        type: 'SET_CELL_P',
        cellID: cellID,
        cellPower: cellPower,
    }); },
    setAllCellPower: function (cellPower) { return ({
        type: 'SET_ALL_CELLS_P',
        cellPower: cellPower,
    }); },
    setAllSystems: function (systems) { return ({
        type: 'SYSTEM_ALL',
        systems: systems,
    }); },
    addSpareCell: function (cellType) { return ({
        type: 'ADD_SPARE_CELL',
        cellType: cellType,
    }); },
    removeSpareCell: function (spareNum) { return ({
        type: 'REM_SPARE_CELL',
        spare: spareNum,
    }); },
    setAllSpareCells: function (cellTypes) { return ({
        type: 'ALL_SPARE_CELL',
        cellTypes: cellTypes,
    }); },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var cells = [];
for (var i = 0; i < numCells; i++) {
    cells.push({
        index: i,
        row: cellIndexToRow(i),
        col: cellIndexToCol(i),
        type: 0 /* Empty */,
        power: 0
    });
}
var unloadedState = {
    cells: cells,
    reactorPower: 100,
    heatLevel: 0,
    heatRate: 0,
    spareCells: [],
};
var reducer = function (state, rawAction) {
    var action = rawAction;
    switch (action.type) {
        case 'REACTOR_POWER': {
            return __assign({}, state, { reactorPower: action.value });
        }
        case 'HEAT_LEVELS': {
            return __assign({}, state, { heatLevel: action.value, heatRate: action.rate });
        }
        case 'SET_CELL_T': {
            var cells_1 = state.cells.slice();
            cells_1[action.cellID].type = action.cellType;
            return __assign({}, state, { cells: cells_1 });
        }
        case 'SET_ALL_CELLS_T': {
            var cells_2 = state.cells.slice();
            for (var i = 0; i < cells_2.length; i++) {
                cells_2[i].type = action.cellTypes[i];
            }
            return __assign({}, state, { cells: cells_2 });
        }
        case 'SET_CELL_P': {
            var cells_3 = state.cells.slice();
            cells_3[action.cellID].power = action.cellPower;
            return __assign({}, state, { cells: cells_3 });
        }
        case 'SET_ALL_CELLS_P': {
            var cells_4 = state.cells.slice();
            for (var i = 0; i < cells_4.length; i++) {
                cells_4[i].power = action.cellPower[i];
            }
            return __assign({}, state, { cells: cells_4 });
        }
        case 'SYSTEM_ALL': {
            var cells_5 = state.cells.slice();
            for (var _i = 0, _a = action.systems; _i < _a.length; _i++) {
                var system = _a[_i];
                var startCell = cells_5[system.start];
                startCell.system = system.system;
                startCell.endCol = cellIndexToCol(system.end) + 1;
                startCell.endRow = cellIndexToRow(system.end) + 1;
            }
            return __assign({}, state, { cells: cells_5 });
        }
        case 'ADD_SPARE_CELL': {
            var spares = state.spareCells.slice();
            spares.push(action.cellType);
            return __assign({}, state, { spareCells: spares });
        }
        case 'REM_SPARE_CELL': {
            var spares = state.spareCells.slice(0, action.spare).concat(state.spareCells.slice(action.spare + 1));
            return __assign({}, state, { spareCells: spares });
        }
        case 'ALL_SPARE_CELL': {
            return __assign({}, state, { spareCells: action.cellTypes });
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};
function cellIndexToCol(cellIndex) {
    return cellIndex % numCellColumns + 1;
}
function cellIndexToRow(cellIndex) {
    return Math.floor(cellIndex / numCellColumns) + 1;
}


/***/ }),
/* 116 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 118 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 120 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 121 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 122 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 123 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 124 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 128 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 129 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 130 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 131 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 132 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 133 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 134 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 135 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 136 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 137 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 138 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 139 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 140 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6f77ece7b52b03d6d9dc721a6e88425d.png";

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(143);
} else {
  module.exports = require('./AppContainer.dev');
}

/***/ }),
/* 143 */
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
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(145);
} else {
  module.exports = require('./index.dev');
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.AppContainer = __webpack_require__(142);

/***/ }),
/* 146 */
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
/* 147 */
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
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("line",{"x1":"12","y1":"5","x2":"12","y2":"19","key":0}),React.createElement("polyline",{"points":"19 12 12 19 5 12","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-arrow-down"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("line",{"x1":"19","y1":"12","x2":"5","y2":"12","key":0}),React.createElement("polyline",{"points":"12 19 5 12 12 5","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-arrow-left"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("line",{"x1":"5","y1":"12","x2":"19","y2":"12","key":0}),React.createElement("polyline",{"points":"12 5 19 12 12 19","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-arrow-right"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("line",{"x1":"12","y1":"19","x2":"12","y2":"5","key":0}),React.createElement("polyline",{"points":"5 12 12 5 19 12","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-arrow-up"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 152 */
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
/* 153 */
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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"12","cy":"12","r":"10","key":0}),React.createElement("path",{"d":"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","key":1}),React.createElement("line",{"x1":"12","y1":"17","x2":"12","y2":"17","key":2})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-help-circle"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 155 */
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
/* 156 */
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
/* 157 */
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
/* 158 */
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
/* 159 */
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
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("polyline",{"points":"1 4 1 10 7 10","key":0}),React.createElement("path",{"d":"M3.51 15a9 9 0 1 0 2.13-9.36L1 10","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-rotate-ccw"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("polyline",{"points":"23 4 23 10 17 10","key":0}),React.createElement("path",{"d":"M20.49 15a9 9 0 1 1-2.12-9.36L23 10","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-rotate-cw"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"12","cy":"12","r":"3","key":0}),React.createElement("path",{"d":"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-settings"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 163 */
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
/* 164 */
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
/* 165 */
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
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("line",{"x1":"18","y1":"6","x2":"6","y2":"18","key":0}),React.createElement("line",{"x1":"6","y1":"6","x2":"18","y2":"18","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-x"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(6))(142);

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(6))(143);

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(6))(73);

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map