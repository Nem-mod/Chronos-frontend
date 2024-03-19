import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { CalendarCheckList } from '../CalendarCheckList/CalendarCheckList.tsx';
import { CalendarEntry } from '../../store/slices/calendarListSlice/types.ts';
//
// interface Props {
//     handleSidebarAction: () => void;
// }

export const SideBar = () => {
    const calendarMap: Map<string, CalendarEntry> = useAppSelector(state => state.calendarList.calendarEntryMap);
    return (
        <aside className={'pl-6 pr-6 basis-2/12 border-gray-400 border-r-2 bg-gray-100'}>
            <div className={'flex h-12 items-center justify-between'}>
            </div>
            <CalendarCheckList name={'My list'} calendarEntryMap={calendarMap} />
        </aside>
    );
};
