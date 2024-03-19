import { CalendarEntry } from '../../store/slices/calendarListSlice/types.ts';
import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const SettingsSideBar = () => {
    const calendarEntryMap: Map<string, CalendarEntry> = useAppSelector(state => state.calendarList.calendarEntryMap);
    const navigate = useNavigate();
    let calendarEntryList: CalendarEntry[] = useMemo(() => Array.from(calendarEntryMap.values()), [calendarEntryMap]);


    const handleOpenCalendarSetting = (id: string) => navigate(`calendar/${id}`);

    return (
        <aside className={'pr-6 basis-2/12 border-gray-400 border-r-2 bg-gray-100'}>
            <h3 className={'pl-6 mt-20'}>My calendars</h3>
            <div>
                <ul className={'mt-4'}>
                    {calendarEntryList.map(e => (
                        <li
                            onClick={() => handleOpenCalendarSetting(e._id)}
                            key={e._id}
                            className={'mt-1 pl-6 pt-1 pb-1 text-sm rounded-r-lg hover:bg-zinc-300 '}>
                            <div>{e.calendar.name}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};
