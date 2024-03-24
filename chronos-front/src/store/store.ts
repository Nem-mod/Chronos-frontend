import { Action, configureStore, EnhancedStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth/authSlice.ts';
import { calendarListReducer } from './slices/calendarListSlice/calendarListSlice.ts';
import { enableMapSet } from 'immer';
import { eventListReducer } from './slices/eventListSlice/eventListSlice.ts';

enableMapSet();


export const store: EnhancedStore = configureStore({
    reducer: {
        auth: authReducer,
        calendarList: calendarListReducer,
        eventList: eventListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;