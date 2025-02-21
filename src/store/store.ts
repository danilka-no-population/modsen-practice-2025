import { loadState, saveState } from '../utils/localStorageMethods';
import columnsReducer from './slices/columnSlice';
import tasksReducer from './slices/taskSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const preloadedState = loadState();

export const rootReducer = combineReducers({
    columns: columnsReducer,
    tasks: tasksReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
