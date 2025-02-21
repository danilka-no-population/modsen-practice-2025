import { loadState, saveState } from '../utils/localStorageMethods';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const preloadedState = loadState();

export const rootReducer = combineReducers({});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
