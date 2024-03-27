import { CalendarEntry } from '../../store/slices/calendarListSlice/types.ts';
import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios.ts';
import { useSelector } from 'react-redux';

export const SettingsSideBar = () => {
    const navigate = useNavigate();

    const clientId = useSelector(state => state.auth.userInfo._id);
    const calendarEntryMap: Map<string, CalendarEntry> = useAppSelector(state => state.calendarList.calendarEntryMap);
    if (!calendarEntryMap) {
        return <></>;
    }
    const calendarEntryList: CalendarEntry[] = useMemo(() => {
            return Array.from(calendarEntryMap.values()).filter(entry => {
                return entry.calendar.users.owners.find((e) => {
                    return e === clientId;
                });
            });
        }
        , [calendarEntryMap, clientId]);

    const handleLogOut = async () => {
        await axios.post('/auth/logout');
        navigate('/signin');
    };

    return (
        <aside className={'flex flex-col pr-6 basis-2/12 '}>
            <div className={'pl-6 mt-6 p-2 text-xl rounded-r-lg hover:bg-blue-100'}>
                <Link to={'account'}>Account settings</Link>
            </div>
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
            <div className={'pl-6 mt-12 mb-6 flex-grow'}>
                <button onClick={handleLogOut} className='btn btn-outline btn-error text-xl'>Log out</button>
            </div>
        </aside>
    );
};
