import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { CalendarCheckList } from '../CalendarCheckList/CalendarCheckList.tsx';
import { CalendarEntry } from '../../store/slices/calendarListSlice/types.ts';
import plusIcon from '../../assets/plus.svg';
import { Link } from 'react-router-dom';
//
// interface Props {
//     handleSidebarAction: () => void;
// }

export const SideBar = () => {
    const calendarMap: Map<string, CalendarEntry> = useAppSelector(state => state.calendarList.calendarEntryMap);
    return (
        <aside className={'6 basis-2/12'}>
            <div className={'mt-6 pl-6'}>

                <div className='dropdown w-full '>
                    <div
                        tabIndex={0} role='button'
                        className='w-40 h-14 btn border border-gray-200 bg-white focus:bg-gray-200  rounded-3xl text-xl'>
                        <img src={plusIcon} alt={'plus'} />

                        Create
                    </div>
                    <ul tabIndex={0}
                        className='p-2 shadow-xl mt-1 border-2 border-gray-200 menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
                        <li><Link to={'settings/create-calendar'}>Create calendar</Link></li>
                        <li><Link to={''}>Create Event</Link></li>
                    </ul>
                </div>
            </div>
            <div className={'mt-6'}>
                <CalendarCheckList name={'My list'} calendarEntryMap={calendarMap} />
            </div>
        </aside>
    );
};
