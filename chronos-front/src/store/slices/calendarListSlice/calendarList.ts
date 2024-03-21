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

        builder.addCase(fetchUpdateCalendar.fulfilled, (state, action) => {
            console.log('AAA');
            let { calendarEntryId, calendar } = action.payload;
            let calendarEntryMap = state.calendarEntryMap;

            if (!calendarEntryMap)
                return;
            let calendarEntry = calendarEntryMap.get(calendarEntryId);

            if (!calendarEntry)
                return;
            calendarEntryMap.set(calendarEntryId, { ...calendarEntry, calendar });

            state.calendarEntryMap = calendarEntryMap;
            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchUpdateCalendar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });

        builder.addCase(fetchDeleteCalendar.fulfilled, (state, action) => {
            console.log('BBB');
            let { calendarEntryId } = action.payload;
            let calendarEntryMap = state.calendarEntryMap;

            if (!calendarEntryMap)
                return;

            calendarEntryMap.delete(calendarEntryId);
            state.calendarEntryMap = calendarEntryMap;
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
        .filter((e: CalendarEntry) => e.visibilitySettings.isVisible);
};


export const selectCalendarEntryById = (state: RootState, id: string) => {
    return state.calendarList.calendarEntryMap.get(id);
};