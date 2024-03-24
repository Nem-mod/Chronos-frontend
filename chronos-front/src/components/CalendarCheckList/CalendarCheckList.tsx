// import { setCalendarAsActive } from '../../store/slices/calendarListSlice.ts';
import { useMemo } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { CalendarCheckEntry } from '../CalendarCheckEntry/CalendarCheckEntry.tsx';
import { CalendarEntry } from '../../store/slices/calendarListSlice/types.ts';
import { setCalendarAsActive } from '../../store/slices/calendarListSlice/calendarListSlice.ts';

interface Props {
    name: string;
    calendarEntryMap: Map<string, CalendarEntry>;
}

export const CalendarCheckList = ({ name, calendarEntryMap }: Props) => {
    const dispatch = useAppDispatch();
    let calendarEntryList: CalendarEntry[] = useMemo(() => Array.from(calendarEntryMap.values()), [calendarEntryMap]);

    const handleCalendarStatusCallback = (id: string, value: boolean) => {
        dispatch(setCalendarAsActive({
            id,
            value,
        }));
    };

    return (
        <div className=''>
            <div className='pl-6 text-xl'>
                {name}
            </div>
            <div className='mt-1'>
                <ul>
                    {calendarEntryList && calendarEntryList.map((e) => (
                            <CalendarCheckEntry
                                key={e._id}
                                calendarEntryId={e._id}
                                calendar={e.calendar}
                                checkCallBack={handleCalendarStatusCallback}
                                visibility={e.visibilitySettings.isVisible}
                            />
                        ),
                    )}
                </ul>
            </div>
        </div>
    );
};
