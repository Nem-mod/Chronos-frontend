// import React from "react";


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
import { useEffect, useState } from "react";

export const CalendarTest = () => {

    const [events, setEvents] = useState<any[]>([])
    const handleDateClick = (arg: any) => {
        let eventName: string | null;
        try {
            eventName = prompt('Enter event name');
        }
        catch {
            return;
        }
        if (typeof(eventName) == "undefined" || eventName === "") {
            return;
        }

        setEvents(events.concat({eventColor: 'red', title: eventName, date: arg.dateStr, allDay: true}))
    }

    useEffect(() => {
        console.log(events)
    }, [events]);



    return (
        <div
            className={''}
        >
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView={"dayGridWeek"}
                eventDisplay={'auto'}
                headerToolbar={{
                  left: 'prev,next',
                  center: 'title',
                  right: 'dayGridWeek,dayGridMonth',
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
                dateClick={handleDateClick}
                events={events}
                droppable={true}
                editable={true}
            />
        </div>
  );
};
