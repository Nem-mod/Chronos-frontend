import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Event } from '../../store/slices/eventListSlice/types.ts';
import axios from '../../axios.ts';
import { EditEventForm } from '../../components/EditEventForm/EditEventForm.tsx';

export const EditEventPage = () => {
    let { id } = useParams() as { id: string };
    let [event, setEvent] = useState<Event | null>(null);
    useEffect(() => {
        axios.get(`/event?eventId=${id}`).then(
            res => {
                if (res.statusText !== 'OK')
                    return;
                setEvent(res.data as Event);
            },
        );
    }, []);
    console.log(event);
    return (
        <div>

            <div className={'flex-grow'}>
                <div className={'flex h-fit pl-20'}>
                    {/*<div className={'w-1/12'}></div>*/}
                    <div className={'flex-grow'}>
                        <div className={'mt-6 mb-6'}>
                            <div className={'mt-6'}>
                                {event && <EditEventForm event={event as Event} />}
                                {/*<CalendarSettingsForm calendar={calendar} calendarEntryId={calendarEntryId} />*/}
                            </div>
                            {/*<div className={'mt-6'}>*/}
                            {/*    <p className={'text-gray-500 text-xl'}>Delete Calendar</p>*/}
                            {/*    <p className={'mt-2 text-gray-400 text-l'}>The calendar will be permanently deleted. No one*/}
                            {/*        else*/}
                            {/*        will be able to use it.</p>*/}
                            {/*    /!*<button className={'mt-6 btn btn-error'} onClick={handleDeleteCalendar}>Delete</button>*!/*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};
