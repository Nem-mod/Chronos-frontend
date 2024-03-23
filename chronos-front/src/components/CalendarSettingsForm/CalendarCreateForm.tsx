import { TextField } from '../SettingsInputFields/TextField.tsx';
import { SelectTimeZone } from '../SettingsInputFields/SelectTimeZone.tsx';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { fetchCreateCalendar } from '../../store/slices/calendarListSlice/calendarList.ts';

export const CalendarCreateForm = () => {
    const dispatch = useAppDispatch();
    let [selectedTimezone, setSelectedTimezone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
    let [calendarName, setCalendarName] = useState<string>('');
    let [calendarDescription, setCalendarDescription] = useState<string>('');
    const handleSubmit = async () => {
        await dispatch(fetchCreateCalendar({
            name: calendarName,
            description: calendarDescription,
            timezone: selectedTimezone,
        }));
    };
    return (
        <>
            <p className={'text-gray-500 text-xl'}>
                Calendar creation
            </p>
            <TextField label={'Calendar Name'} value={calendarName} onChange={setCalendarName} />
            <TextField label={'Description'} value={calendarDescription}
                       onChange={setCalendarDescription} />

            <div>
                <p className={'pt-2 pb-2'}>
                    Time Zone
                </p>
            </div>
            <SelectTimeZone value={selectedTimezone}
                            onChangeCallback={setSelectedTimezone} />
            <button className={'mt-6 bg-blue-700 text-white hover:bg-blue-500 btn'} onClick={handleSubmit}>Create
            </button>
        </>
    );
};
