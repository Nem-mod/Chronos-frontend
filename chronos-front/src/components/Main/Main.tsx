import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { useSelector } from 'react-redux';
import { selectIdOfVisibleCalendarEntries } from '../../store/slices/calendarListSlice/calendarListSlice.ts';
import { useEffect } from 'react';
import { fetchGetVisibleEvents } from '../../store/slices/eventListSlice/eventListSlice.ts';
import { CalendarTest } from '../CalendarTest/CalendarTest.tsx';

export const Main = () => {
    const dispatch = useAppDispatch();
    const entries = useSelector(state => state.calendarList.calendarEntryMap);
    const visibleCalendarsIds = useSelector(selectIdOfVisibleCalendarEntries);
    useEffect(() => {
        dispatch(fetchGetVisibleEvents({ list: visibleCalendarsIds }));
    }, [entries]);
    return (
        <main className={'flex-grow pr-6 pl-6'}>
            <CalendarTest />
        </main>
    );
};
