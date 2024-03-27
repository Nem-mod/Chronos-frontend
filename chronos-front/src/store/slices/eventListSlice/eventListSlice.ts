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


// WIP: mb refactor later
type Calendar_Color_ID = {
    color: string
    id: string
}

type TGetEvents = {
    list: Calendar_Color_ID[]
}
export const fetchGetVisibleEvents = createAsyncThunk<Event[], TGetEvents, { rejectValue: string }>(
    'eventList/get/events',
    async ({ list }, { rejectWithValue }) => {
        try {
            const urls = list.map(e => `/event/all?calendarId=${e.id}`);
            const fetchURL = (url: string) => axios.get<Event[]>(url);
            const promises = urls.map(fetchURL);

            const results = await Promise.all(promises.map(p => p.catch(e => e)));
            const validResults: Event[] = results.reduce((previousValue, currentValue, currentIndex) => {
                let data = currentValue.data.map((element: Event) => {
                    return {
                        ...element,
                        color: list[currentIndex].color,
                    };
                });
                return previousValue.concat(data);
            }, []);

            return validResults;
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

        builder.addCase(fetchUpdateEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        });

    },
});

export const eventListReducer = eventListSlice.reducer;


export const getEvents = (state: RootState) => {
    return state.eventList.eventList;
};