import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../../axios.ts';
import { Calendar, CalendarEntry } from './types.ts';
import { RootState } from '../../store.ts';

type TCalendarEntries = {
    _id: string
    calendarEntries: CalendarEntry[]
};
export const fetchCalendarList = createAsyncThunk<TCalendarEntries, void, { rejectValue: string }>(
    'calendarList/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/calendar/all');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);


type PatchCalendar = {
    calendar: Calendar,
    calendarEntryId: string
}

type TCreateCalendar = { calendarEntry: CalendarEntry, calendar: Calendar }

export const fetchCreateCalendar = createAsyncThunk<TCreateCalendar, Calendar, { rejectValue: string }>(
    'calendarList/create/calendar',
    async (props, { rejectWithValue }) => {
        try {
            const response = await axios.post('/calendar', props);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);

export const fetchUpdateCalendar = createAsyncThunk<PatchCalendar, PatchCalendar, { rejectValue: string }>(
    'calendarList/patch/calendar',
    async (props, { rejectWithValue }) => {
        try {
            const { calendar, calendarEntryId } = props;
            const response = await axios.patch('/calendar', calendar);
            return { calendar: response.data, calendarEntryId: calendarEntryId };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);

interface DeleteCalendar {
    calendarEntryId: string;
    calendarId: string;
}

export const fetchDeleteCalendar = createAsyncThunk<DeleteCalendar, DeleteCalendar, { rejectValue: string }>(
    'calendarList/delete/calendar',
    async (props, { rejectWithValue }) => {
        try {
            await axios.delete('/calendar', { data: { _id: props.calendarId } });
            return props;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);


interface CalendarListState {
    loading: boolean,
    calendarEntryMap: Map<string, CalendarEntry> | null,
    error: any | null,
    success: boolean
}

const initialState: CalendarListState = {
    loading: false,
    calendarEntryMap: null,
    error: null,
    success: false,

};

const calendarListSlice = createSlice({
    initialState,
    name: 'calendarList',
    reducers: {
        setCalendarAsActive(state: CalendarListState, action: PayloadAction<{ id: string, value: boolean }>) {
            const id: string = action.payload.id;
            const visibility = action.payload.value;
            let mutatedMap = new Map(state.calendarEntryMap);
            let calendarObj: CalendarEntry | undefined = mutatedMap.get(id);
            if (!calendarObj)
                return;
            calendarObj.visibilitySettings.isVisible = visibility;
            mutatedMap.set(id, calendarObj);
            axios.patch('/calendar/entry', {
                _id: id,
                'visibilitySettings': {
                    'isVisible': visibility,
                },
            }).catch(console.log);
            state.calendarEntryMap = mutatedMap;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCalendarList.fulfilled, (state, action) => {
            let calendarEntryList: Map<string, CalendarEntry> = new Map();
            for (let entry of <CalendarEntry[]>action.payload.calendarEntries) {
                let id = entry._id;
                calendarEntryList.set(id, entry);
            }
            state.loading = false;
            state.calendarEntryMap = calendarEntryList;
            state.success = true;
        });

        builder.addCase(fetchCalendarList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });

        builder.addCase(fetchCreateCalendar.fulfilled, (state, action) => {
            if (!state.calendarEntryMap)
                return;

            let calendarEntry = {
                ...action.payload.calendarEntry,
                calendar: action.payload.calendar,
            };
            state.calendarEntryMap.set(calendarEntry._id, calendarEntry);

            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchCreateCalendar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });


        builder.addCase(fetchUpdateCalendar.fulfilled, (state, action) => {
            let { calendarEntryId, calendar } = action.payload;
            if (!state.calendarEntryMap)
                return;

            let calendarEntry = state.calendarEntryMap.get(calendarEntryId);

            if (!calendarEntry)
                return;

            state.calendarEntryMap.set(calendarEntryId, { ...calendarEntry, calendar });
            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchUpdateCalendar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });

        builder.addCase(fetchDeleteCalendar.fulfilled, (state, action) => {
            if (!state.calendarEntryMap)
                return;
            let { calendarEntryId } = action.payload;
            state.calendarEntryMap.delete(calendarEntryId);
            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchDeleteCalendar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });
    },
});

export const calendarListReducer = calendarListSlice.reducer;
export const { setCalendarAsActive } = calendarListSlice.actions;

export const selectIdOfVisibleCalendarEntries = (state: RootState) => {
    return [...state.calendarList.calendarEntryMap.values()]
        .filter((e: CalendarEntry) => e.visibilitySettings.isVisible)
        .map((e: CalendarEntry) => e.calendar._id);
};


export const selectCalendarEntryById = (state: RootState, id: string) => {
    return state.calendarList.calendarEntryMap.get(id);
};


export const getParentCalendar = (state: RootState) => {
    return [...state.calendarList.calendarEntryMap.values()][0];
};