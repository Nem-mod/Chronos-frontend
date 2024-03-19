import { Calendar } from '../../store/slices/calendarListSlice/types.ts';
import { useState } from 'react';

interface Props {
    calendarEntryId: string;
    calendar: Calendar;
    checkCallBack: (id: string, value: boolean) => void;
    visibility: boolean;
}

export const CalendarCheckEntry = ({ calendarEntryId, calendar, checkCallBack, visibility }: Props) => {
    let [checked, setChecked] = useState(visibility || false);
    const handleCheck = (e: any) => {
        let checked = e.target.checked;
        setChecked(checked);
        checkCallBack(calendarEntryId, checked);
    };
    return (
        <>
            <li key={calendarEntryId} onClick={handleCheck} className={''}>
                <label className='cursor-pointer label'>
                    <input type='checkbox' className='checkbox'
                           defaultChecked={checked}
                    />
                    <span className=''>{calendar.name}</span>
                </label>
            </li>
        </>
    );
};
