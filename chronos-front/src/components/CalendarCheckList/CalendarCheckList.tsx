// import { setCalendarAsActive } from '../../store/slices/calendarList.ts';
import { useMemo, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { CalendarCheckEntry } from '../CalendarCheckEntry/CalendarCheckEntry.tsx';
import { CalendarEntry } from '../../store/slices/calendarListSlice/types.ts';
import { setCalendarAsActive } from '../../store/slices/calendarListSlice/calendarList.ts';

interface Props {
    name: string;
    calendarEntryMap: Map<string, CalendarEntry>;
}

export const CalendarCheckList = ({ name, calendarEntryMap }: Props) => {
    const dispatch = useAppDispatch();
    let [check, setCheck] = useState<boolean>(false);
    let calendarEntryList: CalendarEntry[] = useMemo(() => Array.from(calendarEntryMap.values()), [calendarEntryMap]);

    const handleCalendarStatusCallback = (id: string, value: boolean) => {
        dispatch(setCalendarAsActive({
            id,
            value,
        }));
    };
    const handleOpen = () => {
        setCheck(prevState => !prevState);
    };
    return (
        <div className='collapse collapse-arrow join-item  border-base-500'>
            <input onClick={handleOpen} type='radio' name='my-accordion-4' checked={check} />
            <div className='collapse-title text-md font-medium'>
                {name}
            </div>
            <div className='collapse-content'>
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
