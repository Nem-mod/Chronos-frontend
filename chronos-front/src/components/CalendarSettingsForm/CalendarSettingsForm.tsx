import { TextField } from '../SettingsInputFields/TextField.tsx';
import { SelectTimeZone } from '../SettingsInputFields/SelectTimeZone.tsx';
import { useEffect, useState } from 'react';
import { fetchUpdateCalendar } from '../../store/slices/calendarListSlice/calendarListSlice.ts';
import { Calendar } from '../../store/slices/calendarListSlice/types.ts';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';

interface Props {
    calendar: Calendar;
    calendarEntryId: number;
}

export const CalendarSettingsForm = ({ calendar, calendarEntryId }: Props) => {
    const dispatch = useAppDispatch();

    let [selectedTimezone, setSelectedTimezone] = useState<string>(calendar.timezone);
    let [calendarName, setCalendarName] = useState<string>('');
    let [calendarDescription, setCalendarDescription] = useState<string>('');
    let [isChangedTimeout, setIsChangedTimeout] = useState<number>();

    useEffect(() => {
        setCalendarName(calendar.name);
        setCalendarDescription(calendar.description);
        setSelectedTimezone(calendar.timezone);
    }, [calendar]);


    useEffect(() => {
        clearTimeout(isChangedTimeout);
        let timeoutId = setTimeout(() => {
            dispatch(
                fetchUpdateCalendar({
                    calendar: {
                        _id: calendar._id,
                        name: calendarName,
                        description: calendarDescription,
                        timezone: selectedTimezone,
                    },
                    calendarEntryId: calendarEntryId,
                }),
            );
        }, 1000);
        setIsChangedTimeout(timeoutId);
    }, [calendarName, calendarDescription, selectedTimezone]);

    return (
        <>
            <p className={'text-gray-500 text-xl'}>
                Calendar settings
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
        </>
    );
};
