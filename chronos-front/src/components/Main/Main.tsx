import { CalendarTest } from '../CalendarTest/CalendarTest.tsx';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { useSelector } from 'react-redux';
import { selectIdOfVisibleCalendarEntries } from '../../store/slices/calendarListSlice/calendarListSlice.ts';
import { useEffect } from 'react';
import { fetchGetVisibleEvents } from '../../store/slices/eventListSlice/eventListSlice.ts';

export const Main = () => {
    const dispatch = useAppDispatch();
    let visibleCalendarsIds = useSelector(selectIdOfVisibleCalendarEntries);
    useEffect(() => {
        let res = dispatch(fetchGetVisibleEvents({ calendarIds: visibleCalendarsIds }));
        // console.log(res);
    }, []);
    return (
        <main className={'flex-grow pr-6 pl-6'}>
            <CalendarTest />
        </main>
    );
};
