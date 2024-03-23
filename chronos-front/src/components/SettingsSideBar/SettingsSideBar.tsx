import { CalendarEntry } from '../../store/slices/calendarListSlice/types.ts';
import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const SettingsSideBar = () => {
    const calendarEntryMap: Map<string, CalendarEntry> = useAppSelector(state => state.calendarList.calendarEntryMap);
    let calendarEntryList: CalendarEntry[] = useMemo(() => Array.from(calendarEntryMap.values()), [calendarEntryMap]);

    return (
        <aside className={'pr-6 basis-2/12'}>
            <div className={'pl-6 mt-6 p-2 text-xl rounded-r-lg hover:bg-blue-100'}>
                <Link to={'create-calendar'}>Create Calendar</Link>
            </div>
            <div>
                <div className={'pl-6 mt-6 text-xl'}>My calendars</div>
                <div>
                    <div className={'mt-4'}>
                        {calendarEntryList.map(e => (
                            <Link to={`calendar/${e._id}`}
                                  className={'mt-1 pl-6 pt-1 pb-1 block text-lg rounded-r-lg hover:bg-zinc-300'}
                                  key={e._id}
                            >
                                {e.calendar.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};
