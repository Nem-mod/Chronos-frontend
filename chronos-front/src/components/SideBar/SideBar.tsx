import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { Calendar } from '../../store/slices/calendarList.ts';
import { CalendarCheckList } from '../CalendarCheckList/CalendarCheckList.tsx';
import { SidebarButton } from '../SidebarButton/SidebarButton.tsx';

interface Props {
    handleSidebarAction: () => void;
}

export const SideBar = ({ handleSidebarAction }: Props) => {
    const calendarMap: Map<string, Calendar> = useAppSelector(state => state.calendarList.calendarMap);
    return (
        <aside className={'pl-6 pr-6 basis-2/12 border-gray-400 border-r-2 bg-gray-100'}>
            <div className={'flex h-12 items-center justify-between'}>
                <SidebarButton onClick={handleSidebarAction} />
            </div>
            <CalendarCheckList name={'My list'} calendarMap={calendarMap} />
        </aside>
    );
};
