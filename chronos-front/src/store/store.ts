import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.ts';
import { calendarListReducer } from './slices/calendarListSlice/calendarList.ts';
import { enableMapSet } from 'immer';

enableMapSet();


export const store: EnhancedStore = configureStore({
    reducer: {
        auth: authReducer,
        calendarList: calendarListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch