import { CalendarMembers } from '../../../store/slices/calendarListSlice/types.ts';
import { CalendarMember } from './CalendarMember.tsx';
import axios from '../../../axios.ts';

interface Props {
    calendarMembers: CalendarMembers;
    calendarId: string;
}

export const CalendarMembersList = ({ calendarMembers, calendarId }: Props) => {
    const handleChangeMemberType = async (value: 'Owner' | 'Guest', userId: string) => {
        if (value === 'Owner') {
            await axios.patch(`/calendar/ownership/promote?calendarId=${calendarId}&userId=${userId}`);
        }
        if (value === 'Guest') {
            await axios.patch(`/calendar/ownership/demote?calendarId=${calendarId}&userId=${userId}`);
        }
    };

    return (
        <>
            <ul>
                {calendarMembers && calendarMembers.owners.map(e => (
                        <CalendarMember key={e} id={e} type={'Owner'}
                                        onChange={handleChangeMemberType} />
                    ),
                )}
                {calendarMembers && calendarMembers.guests.map(e => (
                        <CalendarMember key={e} id={e} type={'Guest'}
                                        onChange={handleChangeMemberType} />
                    ),
                )}
            </ul>
        </>
    );
};
