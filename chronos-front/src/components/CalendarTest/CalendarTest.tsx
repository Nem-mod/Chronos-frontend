// import React from "react";


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
// import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import EventProp from "./EventProp.tsx";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";

import "../../index.css"

export const CalendarTest = () => {

    const [events, setEvents] = useState<any[]>([])
    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let title = prompt("Enter event name");
        let calendarAPI = selectInfo.view.calendar;

        calendarAPI.unselect();

        if (title) {
            calendarAPI.addEvent({
                title: title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    const handleEvents = (eventsInfo: any) => {
        console.log(eventsInfo)
        setEvents(eventsInfo)
    }

    const handleEventClick = (clickInfo: EventClickArg) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    // useEffect(() => {
    //     console.log(events)
    // }, [events]);



    return (
        <div
            className={''}
        >
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"timeGridWeek"}
                eventDisplay={'block'}
                headerToolbar={{
                  left: 'prev,next',
                  center: 'title',
                  right: 'timeGridWeek,dayGridMonth',
                }}
                weekends={true}
                nowIndicator={true}
                slotDuration={'00:30:00'}
                titleFormat={{
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric',
                    weekday: 'short'
                }}
                select={handleDateSelect}
                // events={events}
                droppable={true}
                editable={true}
                selectable={true}
                eventContent={EventProp}
                eventsSet={handleEvents}
                eventClick={handleEventClick}
            />
        </div>
  );
};
