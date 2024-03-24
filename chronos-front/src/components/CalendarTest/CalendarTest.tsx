// import React from "react";


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
import interactionPlugin from '@fullcalendar/interaction';
import EventProp from './EventProp.tsx';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { Event } from '../../store/slices/eventListSlice/types.ts';
import '../../index.css';
import { fetchCreateEvent, getEvents } from '../../store/slices/eventListSlice/eventListSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks.ts';
import { getParentCalendar } from '../../store/slices/calendarListSlice/calendarListSlice.ts';
import { CalendarEntry } from '../../store/slices/calendarListSlice/types.ts';
import { useSelector } from 'react-redux';

export const CalendarTest = () => {
    const dispatch = useAppDispatch();
    const parentCalendar: CalendarEntry = useAppSelector(getParentCalendar);
    const handleCreateEvent = (event: Event) => {
        dispatch(fetchCreateEvent(event));
    };

    let events: Event[] = useSelector(getEvents);
    let eventsForView = events.map(e => {
        return {
            title: e.name,
            start: e.start,
            end: e.end,
        };
    });
    // const [events, setEvents] = useState<any[]>([]);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let title = prompt('Enter event name');
        let calendarAPI = selectInfo.view.calendar;

        calendarAPI.unselect();

        if (title) {
            calendarAPI.addEvent({
                title: title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            });
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
            handleCreateEvent(event);
        }
    };

    // const handleEvents = (eventsInfo: any) => {
    //     console.log(eventsInfo);
    //     setEvents(eventsInfo);
    // };

    const handleEventClick = (clickInfo: EventClickArg) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
        }
    };

    // useEffect(() => {
    //     console.log(events)
    // }, [events]);


    return (
        <div
            className={''}
        >
            <FullCalendar
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
                slotDuration={'00:30:00'}
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
            />
        </div>
    );
};
