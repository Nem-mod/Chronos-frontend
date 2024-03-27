import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Event } from '../../store/slices/eventListSlice/types.ts';
import axios from '../../axios.ts';
import { EventForm } from '../../components/EventForm/EventForm.tsx';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { fetchGetVisibleEvents, fetchUpdateEvent } from "../../store/slices/eventListSlice/eventListSlice.ts";
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar.tsx';
import { SidebarButton } from '../../components/SidebarButton/SidebarButton.tsx';
import arrow from '../../assets/icon-arrow.png';
import { useSelector } from "react-redux";
import { selectIdOfVisibleCalendarEntries } from "../../store/slices/calendarListSlice/calendarListSlice.ts";

export const EditEventPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams() as { id: string };
    const [event, setEvent] = useState<Event | null>(null);
    const calendarIDs = useSelector(selectIdOfVisibleCalendarEntries);
    useEffect(() => {
        axios.get(`/event?eventId=${id}`).then(
            res => {
                if (res.statusText !== 'OK')
                    return;
                setEvent(res.data as Event);
            },
        );
    }, []);

    const handleCloseSettings = () => navigate('/calendar');
    const handleSubmitPatch = (value: Event) => {
        dispatch(fetchUpdateEvent({
            _id: id,
            ...value,
        }));
        handleCloseSettings();
        dispatch(fetchGetVisibleEvents({calendarIds: calendarIDs}));
    };
    return (
        <div>
            <NavBar navNode={<SidebarButton onClick={handleCloseSettings} icon={arrow} name={'Event settings'} />} />

            <div className={'flex-grow'}>
                <div className={'flex h-fit pl-20'}>
                    {/*<div className={'w-1/12'}></div>*/}
                    <div className={'flex-grow'}>
                        <div className={'mt-6 mb-6'}>
                            <div className={'mt-6'}>
                                {event && <EventForm onSubmit={handleSubmitPatch} event={event as Event} />}
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
