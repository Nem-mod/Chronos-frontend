import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.ts';

export const store: EnhancedStore = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch