import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../../axios.ts';
import { CalendarEntry } from './types.ts';
import { RootState } from '../../store.ts';

type TCalendarEntries = {
    _id: string
    calendarEntries: CalendarEntry[]
};
export const fetchCalendarList = createAsyncThunk<TCalendarEntries, void, { rejectValue: string }>(
    'calendarList/get',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/calendar/all');
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
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
            state.loading = false;
            let calendarEntryList: Map<string, CalendarEntry> = new Map();
            for (let entry of <CalendarEntry[]>action.payload.calendarEntries) {
                let id = entry._id;
                calendarEntryList.set(id, entry);
            }
            state.calendarEntryMap = calendarEntryList;
            state.success = true;
        });

        builder.addCase(fetchCalendarList.rejected, (state, action) => {
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