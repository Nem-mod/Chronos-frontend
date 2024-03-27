import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Event } from './types.ts';
import axios from '../../../axios.ts';
import { RootState } from '../../store.ts';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

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

export const fetchUpdateEvent = createAsyncThunk<Event, Event, GetThunkAPI<AsyncThunkConfig>>(
    'eventList/update/event',
    async (props, { rejectWithValue }) => {
        try {
            const response = await axios.patch('/event', props);
            return response.data as Event;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);

export const fetchDeleteEvent = createAsyncThunk<String, String, GetThunkAPI<AsyncThunkConfig>>(
    'eventList/delete/event',
    async (props, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/event?eventId=${props}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


// WIP: mb refactor later
type TGetEvents = {
    calendarIds: string[]
}
export const fetchGetVisibleEvents = createAsyncThunk<Event[], TGetEvents, { rejectValue: string }>(
    'eventList/get/events',
    async ({ calendarIds }, { rejectWithValue }) => {
        try {
            const urls = calendarIds.map(calendarId => `/event/all?calendarId=${calendarId}`);


            const fetchURL = (url: string) => axios.get<Event[]>(url);
            const promises = urls.map(fetchURL);

            const results = await Promise.all(promises.map(p => p.catch(e => e)));
            const validResults: Event[] = results.filter(result => !(result instanceof Error))
                .flatMap(e => {
                    return e.data as Event[];
                });
            return validResults || [];
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

        builder.addCase(fetchGetVisibleEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });

        builder.addCase(fetchGetVisibleEvents.fulfilled, (state, action) => {

            state.eventList = action.payload;
            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchUpdateEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });

        builder.addCase(fetchUpdateEvent.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });

        builder.addCase(fetchUpdateEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchDeleteEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchDeleteEvent.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        })

        builder.addCase(fetchDeleteEvent.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error.message = action.error;
        });
    },
});

export const eventListReducer = eventListSlice.reducer;


export const getEvents = (state: RootState) => {
    return state.eventList.eventList;
};