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
        <aside className={'6 basis-2/12'}>
            <div className={'mt-6'}>
                <CalendarCheckList name={'My list'} calendarEntryMap={calendarMap} />
            </div>
        </aside>
    );
};
