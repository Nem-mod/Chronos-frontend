import { Calendar, setCalendarAsActive } from '../../store/slices/calendarList.ts';
import { useMemo, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { CalendarCheckEntry } from '../CalendarCheckEntry/CalendarCheckEntry.tsx';

interface Props {
    name: string;
    calendarMap: Map<string, Calendar>;
}

export const CalendarCheckList = ({ name, calendarMap }: Props) => {
    const dispatch = useAppDispatch();
    let [check, setCheck] = useState<boolean>(false);
    let calendarList: Calendar[] = useMemo(() => Array.from(calendarMap.values()), [calendarMap]);

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
                    {calendarList && calendarList.map((e) => (
                            <CalendarCheckEntry key={e._id} calendarId={e._id} name={e.name}
                                                checkCallBack={handleCalendarStatusCallback} />
                        ),
                    )}
                </ul>
            </div>
        </div>
    );
};
