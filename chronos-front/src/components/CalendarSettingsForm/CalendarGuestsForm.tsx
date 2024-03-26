import { Calendar } from '../../store/slices/calendarListSlice/types.ts';
import { useEffect, useRef, useState } from 'react';
import { TextField } from '../SettingsInputFields/TextField.tsx';
import axios, { webURL } from '../../axios.ts';

interface Props {
    calendar: Calendar;
    calendarEntryId: number;
}

export const CalendarGuestsForm = ({ calendar, calendarEntryId }: Props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [invitedUser, setInvitedUser] = useState<string>('');
    const ref = useRef(null);
    const onClickOutside = () => setModalIsOpen(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    const handleSubmitInvite = () => {
        axios.post('/calendar/invite/send-code', {
            returnUrl: `${webURL}/calendar/invite?token=inviteToken`,
            username: invitedUser,
            calendar: calendar._id,
        });
        setModalIsOpen(false);
    };
    return (
        <>
            <p className={'text-gray-500 text-xl'}>
                Sharing with individual users or groups
            </p>
            <div className='mt-2'>
                <ul>
                    {calendar && calendar.users.owners.map(e => (
                            <li key={e}>{e}</li>
                        ),
                    )}
                </ul>
            </div>
            <div className='mt-2'>
                <button className='btn text-blue-500' onClick={() => setModalIsOpen(true)}>Invite guests</button>

                <dialog className={`modal ${modalIsOpen && 'modal-open'}`}>
                    <div className='modal-box' ref={ref}>
                        <h3 className='font-bold text-lg'>Access for individual users</h3>
                        <TextField className={'w-full input'} value={invitedUser}
                                   onChange={setInvitedUser} />
                        <button className={'mt-2 btn bg-blue-500 hover:bg-blue-400'}
                                onClick={handleSubmitInvite}>Submit
                        </button>
                    </div>
                    {/*<form method='dialog' className='modal-backdrop'>*/}
                    {/*    <button>close</button>*/}
                    {/*</form>*/}
                </dialog>
            </div>
        </>
    );
};
