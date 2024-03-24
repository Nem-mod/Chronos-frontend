import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks.ts';
import {
    fetchDeleteCalendar,
    selectCalendarEntryById,
} from '../../store/slices/calendarListSlice/calendarListSlice.ts';
import { useParams } from 'react-router';
import { CalendarSettingsForm } from '../CalendarSettingsForm/CalendarSettingsForm.tsx';
import { useNavigate } from 'react-router-dom';


export const CalendarSettings = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let { id } = useParams() as { id: string };
    let calendarEntry = useAppSelector(state => selectCalendarEntryById(state, id));

    let { calendar, _id: calendarEntryId } = calendarEntry;
    const handleDeleteCalendar = async () => {
        navigate('/calendar/settings');
        let { error } = await dispatch(fetchDeleteCalendar({ calendarEntryId, calendarId: calendar._id }));
        if (error)
            return;
    };
    return (
        <div className={'flex-grow'}>
            <div className={'flex h-fit before:w-1/12 before:content-[""] before:block'}>
                {/*<div className={'w-1/12'}></div>*/}
                <div className={'flex-grow'}>
                    <div className={'mt-6 mb-6'}>
                        <div className={'mt-6'}>
                            <CalendarSettingsForm calendar={calendar} calendarEntryId={calendarEntryId} />
                        </div>
                        <div className={'mt-6'}>
                            <p className={'text-gray-500 text-xl'}>Delete Calendar</p>
                            <p className={'mt-2 text-gray-400 text-l'}>The calendar will be permanently deleted. No one
                                else
                                will be able to use it.</p>
                            <button className={'mt-6 btn btn-error'} onClick={handleDeleteCalendar}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
