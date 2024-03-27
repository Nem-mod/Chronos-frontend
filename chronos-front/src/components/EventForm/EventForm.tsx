import { TextField } from '../SettingsInputFields/TextField.tsx';
import { Event, FrequencyEnum } from '../../store/slices/eventListSlice/types.ts';
import { useState } from 'react';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TextArea } from '../SettingsInputFields/TextArea.tsx';
import { EventRecurrenceDropDown } from '../EventRecurrenceDropDown/EventRecurrenceDropDown.tsx';
import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { selectCalendars } from '../../store/slices/calendarListSlice/calendarListSlice.ts';

interface Props {
    event: Event;
    onSubmit: (value: Event) => void;
}

dayjs.extend(customParseFormat);
export const EventForm = ({ event, onSubmit }: Props) => {
    const calendars = useAppSelector(selectCalendars);

    const [eventCalendar, setEventCalendar] = useState(event.calendar._id);
    const [eventName, setEventName] = useState(event.name);
    const [eventDescription, setEventDescription] = useState(event.description || '');
    const [startEvent, setStartEvent] = useState<Dayjs | null>(dayjs(event.start));
    const [endEvent, setEndEvent] = useState<Dayjs | null>(dayjs(event.end));
    const [isAllDay, setIsAllDay] = useState(event.isAllDay);
    const [recurrenceFrequency, setRecurrenceFrequency] = useState(event.recurrenceSettings?.frequency || FrequencyEnum.DAILY);
    console.log(eventCalendar);
    return (
        <div className={'max-w-2xl'}>
            <TextField value={eventName} onChange={setEventName}
                       className={'px-8 py-2 w-full  text-xl border-0 border-b-4 border-b-gray-400 focus:border-b-blue-500 focus:outline-0'}
            />
            <div className={'mt-5 flex gap-2'}>
                {isAllDay ? (
                        <>
                            <DatePicker onChange={(value) => setStartEvent(value)} value={startEvent}
                                        label='Start time' />
                            <DatePicker onChange={(value) => setEndEvent(value)} value={endEvent} label='End time' />
                        </>
                    )
                    : (
                        <>
                            <DateTimePicker onChange={(value) => setStartEvent(value)} value={startEvent}
                                            label='Start time' />
                            <DateTimePicker onChange={(value) => setEndEvent(value)} value={endEvent}
                                            label='End time' />
                        </>
                    )
                }
            </div>

            <div className='mt-5'>
                <select
                    className='select select-info w-full max-w-xs'
                    value={eventCalendar}
                    onChange={e => setEventCalendar(e.target.value)}
                >
                    {calendars && calendars.map(calendar => (
                        <option key={calendar._id} value={calendar._id}>{calendar.name}</option>
                    ))}
                </select>
            </div>

            <div className='form-control max-w-32 '>
                <label className='cursor-pointer label'>
                    <span className='label-text text-xl'>Is all day</span>
                    <input type='checkbox' onChange={(e) => setIsAllDay(e.target.checked)} checked={isAllDay}
                           className='checkbox checkbox-info' />
                </label>
            </div>
            <div className={'w-4/12'}>
                <span className={'text-xl'}>
                    Description
                </span>

                <TextArea value={eventDescription}
                          onChange={setEventDescription} />
            </div>
            <div>
                <EventRecurrenceDropDown value={recurrenceFrequency} onChange={setRecurrenceFrequency} />
            </div>

            <button className={'btn'} onClick={() => onSubmit(
                {
                    calendar: eventCalendar,
                    name: eventName,
                    description: eventDescription,
                    start: startEvent?.toISOString(),
                    end: endEvent?.toISOString(),
                    isAllDay: isAllDay,
                    recurrenceSettings: {
                        frequency: recurrenceFrequency,
                        isNeverStop: true,
                        interval: 1,
                    },

                } as Event,
            )}>Submit
            </button>
        </div>
    );
};
