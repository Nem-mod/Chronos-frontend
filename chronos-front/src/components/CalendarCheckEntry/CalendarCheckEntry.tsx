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
            <li key={calendarEntryId} onClick={handleCheck}
                className={'pl-6 mt-5 pt-1 pb-1 text-lg rounded-r-lg hover:bg-zinc-300'}>
                <label className=' p-0 cursor-pointer label'>
                    <input type='checkbox' className='checkbox checkbox-sm'
                           defaultChecked={checked}
                    />
                    <span className='ml-2'>{calendar.name}</span>
                    <div className={'flex-grow'}></div>
                </label>
            </li>
        </>
    );
};
