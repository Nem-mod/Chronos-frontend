import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios.ts';

export const fetchCalendarList = createAsyncThunk(
    'calendarList/get',
    async (params: any, thunkAPI) => {
        try {
            const response = await axios.get('/calendar/all', params);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export type Calendar = {
    _id: string,
    name: string,
    description: string,
    timezone: string,
    active: boolean
    users: {
        owners: [],
        guests: []
    }
}

interface CalendarListState {
    loading: boolean,
    calendarMap: Map<string, Calendar> | null,
    error: any | null,
    success: boolean
}

const initialState: CalendarListState = {
    loading: false,
    calendarMap: null,
    error: null,
    success: false,

};

const calendarListSlice = createSlice({
    initialState,
    name: 'calendarList',
    reducers: {
        setCalendarAsActive(state, action) {
            const id: string = action.payload.id;
            let mutatedMap = new Map(state.calendarMap);
            let calendarObj: Calendar | undefined = mutatedMap.get(id);
            if (!calendarObj)
                return;
            calendarObj.active = action.payload.value;
            mutatedMap.set(id, calendarObj);

            state.calendarMap = mutatedMap;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCalendarList.fulfilled, (state, action) => {
            state.loading = false;

            let calendarList: Map<string, Calendar> = new Map();
            for (let entry of action.payload.calendarEntries) {
                let id = entry.calendar._id;
                calendarList.set(id, { ...entry.calendar, active: true });
            }
            state.calendarMap = calendarList;
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