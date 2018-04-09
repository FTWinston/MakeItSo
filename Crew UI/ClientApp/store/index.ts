import * as User from './User';
import * as Crew from './Crew';
import * as Screen from './Screen';
import * as Helm from './Helm';
import * as Power from './Power';
import * as Sensors from './Sensors';
import * as Warp from './Warp';

// The top-level state object
export interface ApplicationState {
    user: User.UserState;
    crew: Crew.CrewState;
    screen: Screen.ScreenState;
    helm: Helm.HelmState;
    power: Power.PowerState;
    sensors: Sensors.SensorState;
    warp: Warp.WarpState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    user: User.reducer,
    crew: Crew.reducer,
    screen: Screen.reducer,
    helm: Helm.reducer,
    power: Power.reducer,
    sensors: Sensors.reducer,
    warp: Warp.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
