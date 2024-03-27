// import React from "react";


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
import interactionPlugin from '@fullcalendar/interaction';
import EventProp from './EventProp.tsx';
import { DateSelectArg, EventChangeArg, EventClickArg } from '@fullcalendar/core';
import { Event } from '../../store/slices/eventListSlice/types.ts';
import '../../index.css';
import {
    fetchCreateEvent,
    fetchDeleteEvent,
    fetchGetVisibleEvents,
    fetchUpdateEvent,
    getEvents,
} from '../../store/slices/eventListSlice/eventListSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks.ts';
import {
    getParentCalendar,
    selectIdOfVisibleCalendarEntries,
} from '../../store/slices/calendarListSlice/calendarListSlice.ts';
import { CalendarEntry } from '../../store/slices/calendarListSlice/types.ts';
import { useSelector } from 'react-redux';
// import axios from "../../axios.ts";
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import trashIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.png';

export const CalendarTest = () => {
    const dispatch = useAppDispatch();
    const parentCalendar: CalendarEntry = useAppSelector(getParentCalendar);
    const handleCreateEvent = async (event: Event) => {
        return dispatch(fetchCreateEvent(event));
    };

    const calendarIDs = useSelector(selectIdOfVisibleCalendarEntries);


    const navigate = useNavigate();

    const calendarRef = useRef();

    const [popup, setPopup] = useState(false);
    const [eventInfo, setEventInfo] = useState<any>(null);

    let events: Event[] = useSelector(getEvents);
    let eventsForView = events.map(e => {
        return {
            title: e.name,
            start: e.start,
            end: e.end,
            id: e._id,
            color: e.color,
            extendedProps: {
                color: e.color
            }
        };
    });
    // const [events, setEvents] = useState<any[]>([]);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let title = '(No title)';
        let calendarAPI = selectInfo.view.calendar;

        calendarAPI.unselect();


        if (title) {
            // calendarAPI.addEvent({
            //     title: title,
            //     start: selectInfo.startStr,
            //     end: selectInfo.endStr,
            //     allDay: selectInfo.allDay,
            // });
            // Есть кентри у него каленадрь, нам нужен ид именно календаря в ентри
            let event: Event = {
                calendar: parentCalendar.calendar._id,
                name: title,
                start: new Date(selectInfo.startStr),
                end: new Date(selectInfo.endStr),
                isAllDay: false,
                // TODO: uncomment when back will have uk timezone or refactor it
                // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timezone: 'Europe/Kyiv',
            };
            handleCreateEvent(event).then((res: any) => {
                if (!res.error) {
                    console.log(res);
                    navigate(`edit-event/${res.payload._id}`);
                }
            });
        }
    };

    // const handleEvents = (eventsInfo: any) => {
    //     console.log(eventsInfo);
    //     setEvents(eventsInfo);
    // };

    const handleChangeEvent = async (changeInfo: EventChangeArg) => {
        const event = changeInfo.event;
        const props: Event = {
            _id: event.id,
            name: event.title,
            start: new Date(event.startStr),
            end: new Date(event.endStr),
            isAllDay: event.allDay,
        };
        await dispatch(fetchUpdateEvent(props));
        await dispatch(fetchGetVisibleEvents({ list: calendarIDs }));
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //     clickInfo.event.remove();
        // }
        setEventInfo(clickInfo.event);
        console.log(eventInfo);
        setPopup(!popup);
    };

    // useEffect(() => {
    //     console.log(events)
    // }, [events]);


    return (
        <div
            className={''}
        >
            <input type='checkbox' className={'modal-toggle'} />
            <div
                // onClick={() => setPopup(false)}
                className={
                    (popup ? 'modal-open' : '') + ' ' +
                    'modal '
                }
            >

                <div
                    className={'modal-box flex flex-col gap-4'}
                >
                    <div
                        className={'flex flex-row justify-end'}
                    >
                        <button
                            className={'btn btn-circle btn-outline btn-sm '}
                            onClick={() => setPopup(false)}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg' fill='none'
                                viewBox='0 0 24 24' stroke='currentColor'
                                className={'h-6 w-6'}
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                      d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>
                    {eventInfo &&
                        <div
                            className={'flex flex-col gap-5 p-6 border rounded-xl border-white'}
                        >
                            <span className={'modal-text'}>Title: {eventInfo.title}</span>
                            <span className={'modal-text'}>Start: {new Date(eventInfo.startStr).toDateString()}</span>
                            <span className={'modal-text'}>End: {new Date(eventInfo.endStr).toDateString()}</span>
                            <span className={'modal-text'}>
                                {/*Duration: {eventInfo.startStr.split('T')[1].split('+')[0]} - {eventInfo.endStr.split('T')[1].split('+')[0]}*/}
                                Duration: {new Date(eventInfo.startStr).toDateString()}
                            </span>
                        </div>
                    }
                    <div
                        className={'flex flex-row justify-around'}
                    >
                        <Link
                            className='btn btn-outline btn-neutral'
                            to={`edit-event/${eventInfo?.id}`}
                        >
                            <img
                                src={editIcon} alt=''
                                className={'h-6 w-6'}
                            />
                            Edit
                        </Link>
                        <button
                            className='btn btn-outline btn-neutral'
                            onClick={
                                async () => {
                                    await dispatch(fetchDeleteEvent(eventInfo?.id));
                                    await dispatch(fetchGetVisibleEvents({ list: calendarIDs }));
                                    setPopup(false);
                                }
                            }
                        >
                            <img
                                src={trashIcon} alt=''
                                className={'h-6 w-6'}
                            />
                            Delete
                        </button>
                    </div>

                </div>
            </div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={'timeGridWeek'}
                eventDisplay={'block'}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,dayGridMonth',
                }}
                events={eventsForView}
                weekends={true}
                nowIndicator={true}
                slotDuration={'01:00:00'}
                expandRows={true}
                stickyHeaderDates={true}
                dayMaxEventRows={4}
                titleFormat={{
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric',
                    weekday: 'short',
                }}
                select={handleDateSelect}
                // events={events}
                droppable={true}
                editable={true}
                selectable={true}
                eventContent={EventProp}
                // eventsSet={handleEvents}
                eventClick={handleEventClick}
                eventChange={handleChangeEvent}
            />
        </div>
    );
};
