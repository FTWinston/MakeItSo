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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configureStore__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_ScreenManager__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__functionality__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Client_scss__ = __webpack_require__(18);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buttons__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__buttons__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonSet__ = __webpack_require__(9);
/* unused harmony reexport ButtonSet */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Canvas__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__Canvas__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Choice__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_3__Choice__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Field__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__Field__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__FlexibleCanvas__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__FlexibleCanvas__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Icons__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_6__Icons__["b"]; });
/* unused harmony reexport renderIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Screen__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_7__Screen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Textbox__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__Textbox__["a"]; });











/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = vendor_a65b3acf96981fd3289a;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Connection__ = __webpack_require__(57);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Connection__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cube_Cube__ = __webpack_require__(61);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__cube_Cube__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Hotkeys__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__Hotkeys__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Localisation__ = __webpack_require__(59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__Localisation__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ShipSystem__ = __webpack_require__(60);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__ShipSystem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__ShipSystem__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__ShipSystem__["b"]; });







/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functionality__ = __webpack_require__(5);
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functionality__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Icons__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buttons_scss__ = __webpack_require__(72);
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
        var icon = this.props.icon === undefined ? undefined : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Icons__["a" /* renderIcon */])(this.props.icon, this.props.iconSize);
        var text = this.props.text === undefined ? undefined : this.props.text;
        var subtext = this.props.subtext === undefined ? undefined : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "button__subtext" }, this.props.subtext);
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: this.determineClasses(), disabled: this.props.disabled, onMouseDown: this.props.disabled ? undefined : this.props.mouseDown, onMouseUp: this.props.disabled ? undefined : this.props.mouseUp, onMouseLeave: this.props.disabled ? undefined : this.props.mouseLeave, onClick: this.props.disabled ? undefined : this.props.mouseClick, "data-hotkey": this.props.hotkey, type: this.props.buttonType, title: this.props.title },
            icon,
            text,
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buttons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonSet_scss__ = __webpack_require__(66);
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
        this.props.draw(this.ctx, this.props.width, this.props.height);
    };
    Canvas.prototype.componentDidUpdate = function () {
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
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 11 */
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

var Help = __webpack_require__(96);
var Pause = __webpack_require__(98);
var Refresh = __webpack_require__(101);
var SkipBack = __webpack_require__(104);
var SkipForward = __webpack_require__(105);
var X = __webpack_require__(107);
var ArrowUp = __webpack_require__(93);
var ArrowDown = __webpack_require__(90);
var ArrowLeft = __webpack_require__(91);
var ArrowRight = __webpack_require__(92);
var RotateCCW = __webpack_require__(102);
var RotateCW = __webpack_require__(103);
var HelmIcon = __webpack_require__(97);
var WarpIcon = __webpack_require__(94);
var WeaponsIcon = __webpack_require__(95);
var SensorsIcon = __webpack_require__(88);
var PowerIcon = __webpack_require__(100);
var DamageIcon = __webpack_require__(89);
var ViewScreenIcon = __webpack_require__(106);
var CommunicationsIcon = __webpack_require__(99);
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
    Icon[Icon["Helm"] = 12] = "Helm";
    Icon[Icon["Warp"] = 13] = "Warp";
    Icon[Icon["Weapons"] = 14] = "Weapons";
    Icon[Icon["Sensors"] = 15] = "Sensors";
    Icon[Icon["PowerManagement"] = 16] = "PowerManagement";
    Icon[Icon["DamageControl"] = 17] = "DamageControl";
    Icon[Icon["ViewScreen"] = 18] = "ViewScreen";
    Icon[Icon["Communications"] = 19] = "Communications";
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmButton__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__ConfirmButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HeldButton__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__HeldButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PushButton__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__PushButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToggleButton__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__ToggleButton__["a"]; });






/***/ }),
/* 13 */
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
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 14 */
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
/* 15 */
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
    setManoeveringLimits: function (pitch, yaw, roll, translationX, translationY) { return ({
        type: 'SET_MANOEVERING_LIMITS',
        pitchRateMax: pitch,
        yawRateMax: yaw,
        rollRateMax: roll,
        translationRateXMax: translationX,
        translationRateYMax: translationY,
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
    setTranslationRates: function (translationRateX, translationRateY, translationRateForward) { return ({
        type: 'SET_TRANSLATION_RATES',
        translationRateX: translationRateX,
        translationRateY: translationRateY,
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
    translationRateX: 0,
    translationRateY: 0,
    translationRateXMax: 1,
    translationRateYMax: 1,
    translationRateForward: 0,
    translationRateForwardMax: 1,
    translationRateReverseMax: 1,
};
var reducer = function (state, rawAction) {
    var action = rawAction;
    switch (action.type) {
        case 'SET_MANOEVERING_LIMITS':
            return __assign({}, state, { pitchRateMax: action.pitchRateMax, yawRateMax: action.yawRateMax, rollRateMax: action.rollRateMax, translationRateXMax: action.translationRateXMax, translationRateYMax: action.translationRateYMax });
        case 'SET_SPEED_LIMITS':
            return __assign({}, state, { translationRateForwardMax: action.speedMax, translationRateReverseMax: action.speedMaxReverse });
        case 'SET_ORIENTATION':
            return __assign({}, state, { pitch: action.pitch, yaw: action.yaw, roll: action.roll });
        case 'SET_ORIENTATION_RATES':
            return __assign({}, state, { pitchRate: action.pitchRate, yawRate: action.yawRate, rollRate: action.rollRate });
        case 'SET_TRANSLATION_RATES':
            return __assign({}, state, { translationRateX: action.translationRateX, translationRateY: action.translationRateY, translationRateForward: action.translationRateForward });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_User__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__screens__ = __webpack_require__(37);
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(65);




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
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(86);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(138);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(139);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Choice; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonSet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Choice_scss__ = __webpack_require__(67);
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Field; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Field_scss__ = __webpack_require__(68);
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexibleCanvas; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Canvas__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FlexibleCanvas_scss__ = __webpack_require__(69);
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
    FlexibleCanvas.prototype.updateSize = function () {
        var width = this.wrapper === null ? 0 : this.wrapper.offsetWidth;
        var height = this.wrapper === null ? 0 : this.wrapper.offsetHeight;
        this.setState({
            width: width,
            height: height,
        });
    };
    FlexibleCanvas.prototype.render = function () {
        var _this = this;
        var classes = 'canvasWrapper';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: classes, ref: function (w) { return _this.wrapper = w; } },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Canvas__["a" /* Canvas */], { width: this.state.width, height: this.state.height, draw: this.props.draw })));
    };
    return FlexibleCanvas;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Screen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Screen_scss__ = __webpack_require__(70);
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Textbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Textbox_scss__ = __webpack_require__(71);
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(8);
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeldButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(8);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], __assign({}, this.props, { className: classList, mouseDown: function (e) { return _this.mouseDown(e); }, mouseUp: function (e) { return _this.mouseUp(e); } }));
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(8);
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Button__["a" /* Button */], __assign({}, this.props, { className: classList, mouseClick: function (e) { return _this.clicked(e); }, mouseDown: function (e) { return _this.mouseDown(e); }, mouseUp: function (e) { return _this.mouseUp(e); } }));
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button__ = __webpack_require__(8);
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_User__ = __webpack_require__(7);
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Error_scss__ = __webpack_require__(73);
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functionality__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__systems__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__GameActive_scss__ = __webpack_require__(74);
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
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* PushButton */], { title: this.props.text.common.help, noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Help }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* PushButton */], { title: this.props.text.screens.active.pause, noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Pause, command: "pause" }))),
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
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* PushButton */], { key: system, title: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functionality__["d" /* getSystemName */])(system, this.props.text), noBorder: true, icon: icon, disabled: disabled, color: color, clicked: clicked });
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_Screen__ = __webpack_require__(6);
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
            joinAddress = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Field */], { labelText: words.joinAddress, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* Textbox */], { color: 2 /* Tertiary */, text: this.state.joinAddress, placeholder: words.joinAddressPlaceholder, textChanged: function (address) { return _this.setState({ joinAddress: address }); } }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.joinAddressDescription)));
        }
        else {
            if (this.state.gameType !== undefined) {
                gameMode = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Field */], { labelText: words.gameMode },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["i" /* Choice */], { prompt: words.gameModePrompt, color: 0 /* Primary */, vertical: choicesVertical },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* ToggleButton */], { activated: function () { return _this.setState({ gameMode: 2 /* Exploration */ }); }, description: words.gameModeExplorationDescription, text: words.gameModeExploration }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* ToggleButton */], { activated: function () { return _this.setState({ gameMode: 1 /* Survival */ }); }, description: words.gameModeSurvivalDescription, text: words.gameModeSurvival }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* ToggleButton */], { activated: function () { return _this.setState({ gameMode: 0 /* Arena */ }); }, description: words.gameModeArenaDescription, text: words.gameModeArena, disabled: this.state.gameType === 0 /* Local */ }))));
                if (this.usesDifficulty()) {
                    var levels = [];
                    var _loop_1 = function (i) {
                        levels.push(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* ToggleButton */], { key: i, activated: function () { return _this.setState({ difficulty: i }); }, text: i.toString() }));
                    };
                    for (var i = 1; i <= 10; i++) {
                        _loop_1(i);
                    }
                    difficulty = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Field */], { labelText: words.difficulty },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["i" /* Choice */], { prompt: words.difficultyPrompt, color: 2 /* Tertiary */, vertical: this.props.screenWidth < 400 }, levels)));
                }
                if (this.state.gameType === 2 /* Host */) {
                    hostName = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Field */], { labelText: words.serverName, labelBehaviour: true },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* Textbox */], { color: 2 /* Tertiary */, text: this.state.serverName, placeholder: words.serverNamePlaceholder, textChanged: function (name) { return _this.setState({ serverName: name }); } }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.serverNameDescription)));
                }
            }
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["a" /* Screen */], { heading: words.intro, pageLayout: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Field */], { labelText: words.shipName, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "field__contentRow" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["h" /* Textbox */], { color: 2 /* Tertiary */, text: this.state.shipName, textChanged: function (name) { return _this.setState({ shipName: name }); } }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* PushButton */], { color: 2 /* Tertiary */, noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Refresh, clicked: function () { return _this.randomizeName(); }, title: words.shipNameRandom })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.shipNameDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Field */], { labelText: words.gameType },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["i" /* Choice */], { prompt: words.gameTypePrompt, color: 0 /* Primary */, vertical: choicesVertical },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* ToggleButton */], { activated: function () { return _this.setState({ gameType: 0 /* Local */ }); }, description: words.gameTypeLocalDescription, text: words.gameTypeLocal }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* ToggleButton */], { activated: function () { return _this.setState({ gameType: 1 /* Join */ }); }, description: words.gameTypeJoinDescription, text: words.gameTypeJoin }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* ToggleButton */], { activated: function () { return _this.setState({ gameType: 2 /* Host */ }); }, description: words.gameTypeHostDescription, text: words.gameTypeHost }))),
            joinAddress,
            gameMode,
            difficulty,
            hostName,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Field */], { centered: true, displayAsRow: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["k" /* ConfirmButton */], { color: 4 /* Quandry */, clicked: function () { return _this.startGame(); }, text: words.startGame, disabled: !this.decideCanStart() }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* PushButton */], { color: 3 /* Quaternary */, clicked: function () { return _this.cancel(); }, text: this.props.text.common.cancel, command: "-setup" })));
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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_User__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_Screen__ = __webpack_require__(6);
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
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["g" /* Field */], { labelText: words.userName, labelBehaviour: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["h" /* Textbox */], { color: 0 /* Primary */, text: this.props.userName, textChanged: function (t) { return _this.nameChanged(t); }, placeholder: words.userNamePlaceholder }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "description" }, words.userNameDescription)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["g" /* Field */], { labelText: words.inputMode },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["i" /* Choice */], { prompt: words.inputModePrompt, color: 1 /* Secondary */, vertical: inputModeVertical },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["j" /* ToggleButton */], { startActive: this.props.inputMode === 0 /* KeyboardAndMouse */, activated: function () { return _this.inputModeChanged(0 /* KeyboardAndMouse */); }, description: words.inputModeDescriptionKeyboard, text: words.inputModeKeyboard }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["j" /* ToggleButton */], { startActive: this.props.inputMode === 1 /* Touchscreen */, activated: function () { return _this.inputModeChanged(1 /* Touchscreen */); }, description: words.inputModeDescriptionTouch, text: words.inputModeTouch }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["j" /* ToggleButton */], { startActive: this.props.inputMode === 2 /* Gamepad */, disabled: true, activated: function () { return _this.inputModeChanged(2 /* Gamepad */); }, description: words.inputModeDescriptionGamepad, text: words.inputModeGamepad }))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["g" /* Field */], { centered: true },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__general__["b" /* PushButton */], { color: 2 /* Tertiary */, disabled: !hasUserName, clicked: function () { return _this.close(); }, text: this.props.text.common.save })),
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functionality__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SystemSelection_scss__ = __webpack_require__(75);
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
            resumeButton = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* PushButton */], { color: 1 /* Secondary */, text: words.resumeGame, command: "resume" });
        }
        else {
            setupButton = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* PushButton */], { color: 1 /* Secondary */, text: words.setupGame, command: "+setup", disabled: this.props.canEnterSetup });
        }
        var settingsButton = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* PushButton */], { color: 2 /* Tertiary */, text: this.props.text.common.settings, clicked: function () { return _this.props.showUserSettings(); } });
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["a" /* Screen */], { heading: words.intro, pageLayout: true },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Field */], { centered: true },
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
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["g" /* Field */], { centered: true, displayAsRow: true },
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
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["j" /* ToggleButton */], { key: "b", text: name, color: 0 /* Primary */, activateCommand: "sys+ " + system, deactivateCommand: "sys- " + system, startActive: preselected }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { key: "c", className: "systemSelection__help" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__general__["b" /* PushButton */], { color: 4 /* Quandry */, noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_4__general__["c" /* Icon */].Help, title: this.props.text.common.help })),
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
    for (var _i = 0, allSystems_1 = __WEBPACK_IMPORTED_MODULE_3__functionality__["g" /* allSystems */]; _i < allSystems_1.length; _i++) {
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
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Connecting__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Connecting__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Settings__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Settings__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SystemSelection__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__SystemSelection__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GameSetup__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__GameSetup__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GameActive__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__GameActive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Error__ = __webpack_require__(32);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__Error__["a"]; });








/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Communications_scss__ = __webpack_require__(76);
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
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Communications__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Communications__["a"]; });



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DamageControl_scss__ = __webpack_require__(77);
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
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DamageControl__ = __webpack_require__(40);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__DamageControl__["a"]; });



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackGroup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FieldGroup__ = __webpack_require__(13);
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
    FeedbackGroup.prototype.render = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__FieldGroup__["a" /* FieldGroup */], { ref: function (g) { return _this.group = g; }, label: this.props.label, className: this.props.className },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__general__["f" /* Canvas */], { width: this.state.width, height: this.state.height, draw: function (ctx) { return _this.drawFeedback(ctx); }, className: "fieldGroup__background" }),
            this.props.children));
    };
    FeedbackGroup.prototype.drawFeedback = function (ctx) {
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.drawFeedbackX(ctx);
        this.drawFeedbackY(ctx);
    };
    FeedbackGroup.prototype.drawFeedbackX = function (ctx) {
        var width = this.state.width;
        var height = this.state.height;
        var maxVal = 1;
        var minVal = this.props.xMin === undefined ? -1 : this.props.xMin;
        var minPos = 0;
        var maxPos = width;
        var zeroPos = width * -minVal / (maxVal - minVal);
        var x;
        if (this.props.x >= 0) {
            x = zeroPos + (maxPos - zeroPos) * this.props.x / maxVal;
        }
        else {
            x = zeroPos - (zeroPos - minPos) * this.props.x / minVal;
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
        ctx.strokeStyle = ctx.fillStyle = this.props.x === 0 ? '#0c0' : '#cc0';
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
    FeedbackGroup.prototype.drawFeedbackY = function (ctx) {
        if (this.props.y === undefined) {
            return;
        }
        var width = this.state.width;
        var height = this.state.height;
        var zeroPos = height / 2;
        var y = Math.min(height, Math.max(0, -this.props.y * zeroPos + zeroPos));
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
        ctx.strokeStyle = ctx.fillStyle = this.props.y === 0 ? '#0c0' : '#cc0';
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
    return FeedbackGroup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FieldGroup__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FeedbackGroup__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Orientation__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Helm_scss__ = __webpack_require__(78);
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







var orientation = new __WEBPACK_IMPORTED_MODULE_5__Orientation__["a" /* OrientationCube */]();
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
        var _this = this;
        var words = this.props.text.systems.helm;
        var iconSize = "1.5em";
        var overallSpeed = this.magnitude(this.props.translationRateX, this.props.translationRateY, this.props.translationRateForward);
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "system helm helm--buttonInput" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__FieldGroup__["a" /* FieldGroup */], { className: "fieldGroup--3x1 fieldGroup--unpadded" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout--label" }, words.heading),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "readout--value" }, this.radToDeg(this.props.yaw)),
                    "\u00A0",
                    words.mark,
                    "\u00A0",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "readout--value" }, this.radToDeg(this.props.pitch)),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout__smaller" },
                        words.roll,
                        "\u00A0",
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "readout--value" }, this.radToDeg(this.props.roll)),
                        "\u00B0")),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["d" /* FlexibleCanvas */], { draw: function (ctx, w, h) { return _this.drawOrientation(ctx, w, h); } }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "readout--label" }, words.speed),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "readout--value" }, overallSpeed),
                    " ",
                    words.metresPerSecond)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__FeedbackGroup__["a" /* FeedbackGroup */], { label: words.forwardBackward, x: this.props.translationRateForward / this.props.translationRateForwardMax, xMin: -this.props.translationRateReverseMax / this.props.translationRateForwardMax, className: "fieldGroup--3x1" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.moveBackward, color: 3 /* Quaternary */, hotkey: "control", pressCommand: "+moveBackward", releaseCommand: "-moveBackward" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.speedStop, color: 0 /* Primary */, hotkey: "shift", pressCommand: "+forwardBackStop", releaseCommand: "-forwardBackStop" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { text: words.moveForward, color: 3 /* Quaternary */, hotkey: "space", pressCommand: "+moveForward", releaseCommand: "-moveForward" })),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__FeedbackGroup__["a" /* FeedbackGroup */], { label: words.rotation, x: this.props.yawRate / this.props.yawRateMax, y: this.props.pitchRate / this.props.pitchRateMax, className: "fieldGroup--3x3" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__topMid", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].ArrowUp, iconSize: iconSize, title: words.rotateUp, color: 1 /* Secondary */, hotkey: "W", pressCommand: "+pitchUp", releaseCommand: "-pitchUp" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__botMid", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].ArrowDown, iconSize: iconSize, title: words.rotateDown, color: 1 /* Secondary */, hotkey: "X", pressCommand: "+pitchDown", releaseCommand: "-pitchDown" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__midLeft", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].ArrowLeft, iconSize: iconSize, title: words.rotateLeft, color: 1 /* Secondary */, hotkey: "A", pressCommand: "+yawLeft", releaseCommand: "-yawLeft" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__midRight", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].ArrowRight, iconSize: iconSize, title: words.rotateRight, color: 1 /* Secondary */, hotkey: "D", pressCommand: "+yawRight", releaseCommand: "-yawRight" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__topLeft", noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].RotateCCW, iconSize: iconSize, title: words.rotateLeft, color: 1 /* Secondary */, hotkey: "Q", pressCommand: "+rollLeft", releaseCommand: "-rollLeft" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__topRight", noBorder: true, icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].RotateCW, iconSize: iconSize, title: words.rotateRight, color: 1 /* Secondary */, hotkey: "E", pressCommand: "+rollRight", releaseCommand: "-rollRight" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__center", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].X, iconSize: iconSize, title: words.rotateStop, color: 0 /* Primary */, hotkey: "S", pressCommand: "+rotStop", releaseCommand: "-rotStop" })),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__FeedbackGroup__["a" /* FeedbackGroup */], { label: words.strafe, x: this.props.translationRateX / this.props.translationRateXMax, y: this.props.translationRateY / this.props.translationRateYMax, className: "fieldGroup--3x3" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__topMid", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].ArrowUp, iconSize: iconSize, title: words.strafeUp, color: 2 /* Tertiary */, hotkey: "I", pressCommand: "+strafeUp", releaseCommand: "-strafeUp" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__botMid", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].ArrowDown, iconSize: iconSize, title: words.strafeDown, color: 2 /* Tertiary */, hotkey: ",", pressCommand: "+strafeDown", releaseCommand: "-strafeDown" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__midLeft", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].ArrowLeft, iconSize: iconSize, title: words.strafeLeft, color: 2 /* Tertiary */, hotkey: "J", pressCommand: "+strafeLeft", releaseCommand: "-strafeLeft" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__midRight", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].ArrowRight, iconSize: iconSize, title: words.strafeRight, color: 2 /* Tertiary */, hotkey: "L", pressCommand: "+strafeRight", releaseCommand: "-strafeRight" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__general__["e" /* HeldButton */], { className: "fieldGroup--3x3__center", icon: __WEBPACK_IMPORTED_MODULE_2__general__["c" /* Icon */].X, iconSize: iconSize, title: words.strafeStop, color: 0 /* Primary */, hotkey: "K", pressCommand: "+strafeStop", releaseCommand: "-strafeStop" })));
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
        orientation.draw(ctx, Math.min(halfWidth, halfHeight) * 0.65, this.props.pitch, this.props.yaw, -this.props.roll);
        ctx.translate(-halfWidth, -halfHeight);
    };
    Helm.prototype.radToDeg = function (val) {
        val = Math.round((val + Math.PI) * 180 / Math.PI);
        if (val >= 360) {
            val -= 360;
        }
        return val;
    };
    Helm.prototype.magnitude = function (x, y, z) {
        return Math.round(Math.sqrt(x * x + y * y + z * z));
    };
    return Helm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Selects which state properties are merged into the component's props
var mapStateToProps = function (state) {
    return __assign({}, state.helm, { text: state.user.text, inputMode: state.user.inputMode });
};
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {})(Helm));


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrientationCube; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functionality__ = __webpack_require__(5);
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
}(__WEBPACK_IMPORTED_MODULE_0__functionality__["f" /* Cube */]));



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helm__ = __webpack_require__(43);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Helm__["a"]; });



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comms__ = __webpack_require__(39);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__comms__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__damage__ = __webpack_require__(41);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__damage__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helm__ = __webpack_require__(45);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__helm__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__power__ = __webpack_require__(48);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__power__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sensors__ = __webpack_require__(50);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__sensors__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__viewscreen__ = __webpack_require__(52);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_5__viewscreen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__warp__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__warp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__weapons__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__weapons__["a"]; });










/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PowerManagement_scss__ = __webpack_require__(79);
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PowerManagement__ = __webpack_require__(47);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__PowerManagement__["a"]; });



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sensors_scss__ = __webpack_require__(80);
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
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sensors__ = __webpack_require__(49);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Sensors__["a"]; });



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ViewScreen_scss__ = __webpack_require__(81);
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
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ViewScreen__ = __webpack_require__(51);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ViewScreen__["a"]; });



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Warp_scss__ = __webpack_require__(82);
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
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Warp__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Warp__["a"]; });



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Weapons_scss__ = __webpack_require__(83);
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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Weapons__ = __webpack_require__(55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Weapons__["a"]; });



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_Crew__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Screen__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_Helm__ = __webpack_require__(15);




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
            case 'helm_orientation': {
                var vals = data.split(' ');
                var pitch = parseFloat(vals[0]);
                var yaw = parseFloat(vals[1]);
                var roll = parseFloat(vals[2]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_3__store_Helm__["a" /* actionCreators */].setOrientation(pitch, yaw, roll));
                break;
            }
            case 'helm_rotation_rates': {
                var vals = data.split(' ');
                var pitch = parseFloat(vals[0]);
                var yaw = parseFloat(vals[1]);
                var roll = parseFloat(vals[2]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_3__store_Helm__["a" /* actionCreators */].setRotationRates(pitch, yaw, roll));
                break;
            }
            case 'helm_translation_rates': {
                var vals = data.split(' ');
                var x = parseFloat(vals[0]);
                var y = parseFloat(vals[1]);
                var forward = parseFloat(vals[2]);
                __WEBPACK_IMPORTED_MODULE_0__Client__["store"].dispatch(__WEBPACK_IMPORTED_MODULE_3__store_Helm__["a" /* actionCreators */].setTranslationRates(x, y, forward));
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
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hotkeys; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_User__ = __webpack_require__(7);


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
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Localisations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__localisations_English__ = __webpack_require__(64);

var Localisations = [
    {
        name: 'English',
        flag: 'english.png',
        load: function () { return __WEBPACK_IMPORTED_MODULE_0__localisations_English__["a" /* default */]; },
    }
];


/***/ }),
/* 60 */
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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cube; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector3__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CubeFace__ = __webpack_require__(62);


var Cube = (function () {
    function Cube(drawTop, drawBottom, drawLeft, drawRight, drawFront, drawRear) {
        var vertices = [
            new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](-1, 1, -1),
            new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](1, 1, -1),
            new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](1, -1, -1),
            new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](-1, -1, -1),
            new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](-1, 1, 1),
            new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](1, 1, 1),
            new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](1, -1, 1),
            new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](-1, -1, 1)
        ];
        this.faces = [
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](0, 0, -1), [vertices[0], vertices[1], vertices[2], vertices[3]], drawBottom),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](1, 0, 0), [vertices[2], vertices[1], vertices[5], vertices[6]], drawLeft),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](0, 0, 1), [vertices[5], vertices[4], vertices[7], vertices[6]], drawTop),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](-1, 0, 0), [vertices[0], vertices[3], vertices[7], vertices[4]], drawRight),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](0, 1, 0), [vertices[1], vertices[0], vertices[4], vertices[5]], drawRear),
            new __WEBPACK_IMPORTED_MODULE_1__CubeFace__["a" /* CubeFace */](new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](0, -1, 0), [vertices[3], vertices[2], vertices[6], vertices[7]], drawFront)
        ];
    }
    Cube.prototype.draw = function (ctx, radius, pitch, yaw, roll) {
        for (var _i = 0, _a = this.faces; _i < _a.length; _i++) {
            var face = _a[_i];
            face.reset();
            var dot = face.normal
                .rotateX(pitch)
                .rotateZ(yaw)
                .rotateY(roll)
                .dot(Cube.towardsCamera);
            if (dot <= 0)
                continue; // only draw faces visible from the camera
            ctx.beginPath();
            var faceVertex = 0;
            var point = face.vertices[faceVertex]
                .scale(radius)
                .rotateX(pitch)
                .rotateZ(yaw)
                .rotateY(roll);
            ctx.moveTo(point.x, point.y);
            for (faceVertex++; faceVertex < 4; faceVertex++) {
                var point_1 = face.vertices[faceVertex]
                    .scale(radius)
                    .rotateX(pitch)
                    .rotateZ(yaw)
                    .rotateY(roll);
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
    Cube.towardsCamera = new __WEBPACK_IMPORTED_MODULE_0__Vector3__["a" /* Vector3 */](0, 0, 1);
    return Cube;
}());



/***/ }),
/* 62 */
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
/* 63 */
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
    Vector3.prototype.scale = function (factor) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
        return this;
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
    return Vector3;
}());



/***/ }),
/* 64 */
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
            heading: 'Heading:',
            roll: 'Roll:',
            speed: 'Speed:',
            mark: 'mk',
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
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Crew__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Screen__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Helm__ = __webpack_require__(15);




// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    user: __WEBPACK_IMPORTED_MODULE_0__User__["b" /* reducer */],
    crew: __WEBPACK_IMPORTED_MODULE_1__Crew__["b" /* reducer */],
    screen: __WEBPACK_IMPORTED_MODULE_2__Screen__["d" /* reducer */],
    helm: __WEBPACK_IMPORTED_MODULE_3__Helm__["b" /* reducer */],
};


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
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 77 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 78 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 79 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 80 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 81 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 82 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 83 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(85);
} else {
  module.exports = require('./AppContainer.dev');
}

/***/ }),
/* 85 */
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(87);
} else {
  module.exports = require('./index.dev');
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.AppContainer = __webpack_require__(84);

/***/ }),
/* 88 */
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
/* 89 */
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("line",{"x1":"12","y1":"4","x2":"12","y2":"20","key":0}),React.createElement("polyline",{"points":"18 14 12 20 6 14","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-arrow-down"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("line",{"x1":"20","y1":"12","x2":"4","y2":"12","key":0}),React.createElement("polyline",{"points":"10 18 4 12 10 6","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-arrow-left"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("line",{"x1":"4","y1":"12","x2":"20","y2":"12","key":0}),React.createElement("polyline",{"points":"14 6 20 12 14 18","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-arrow-right"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function Icon (props) {
    return React.createElement("svg",props,[React.createElement("line",{"x1":"12","y1":"20","x2":"12","y2":"4","key":0}),React.createElement("polyline",{"points":"6 10 12 4 18 10","key":1})]);
}

Icon.displayName = "Icon";

Icon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round","className":"feather feather-arrow-up"};

module.exports = Icon;

Icon.default = Icon;


/***/ }),
/* 94 */
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
/* 95 */
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
/* 96 */
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
/* 97 */
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
/* 98 */
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
/* 99 */
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
/* 100 */
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
/* 101 */
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
/* 102 */
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
/* 103 */
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
/* 104 */
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
/* 105 */
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
/* 106 */
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
/* 107 */
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
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(142);

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(143);

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(4))(73);

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map