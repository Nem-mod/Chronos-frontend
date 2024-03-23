import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../axios.ts';

export const fetchCreateEvent = createAsyncThunk<Event, Event, { rejectValue: string }>(
    'eventList/create/event',
    async (props, { rejectWithValue }) => {
        try {
            const response = await axios.post('/event', props);
            return response.data as Event;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);

interface EventListState {
    eventList: Event[];
    loading: boolean;
    error: any | null;
    success: boolean;
}

const initialState: EventListState = {
    loading: false,
    eventList: [],
    error: null,
    success: false,

};

const eventListSlice = createSlice({
    initialState,
    name: 'eventList',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCreateEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });

        builder.addCase(fetchCreateEvent.fulfilled, (state, action) => {

            state.eventList.push(action.payload);
            state.loading = false;
            state.success = true;
        });

    },
});

export const eventListReducer = eventListSlice.reducer;

