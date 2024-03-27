import useFetch, { HttpMethods } from '../../../hooks/use-fetch-hook.ts';
import { Client } from '../../../store/slices/auth/authSlice.ts';
import { useState } from 'react';

interface Props {
    id: string;
    type: string;
    onChange?: (value: 'Owner' | 'Guest', userId: string) => void;
}

export const CalendarMember = ({ id, type, onChange }: Props) => {
    const [data] = useFetch(`/auth/user?userId=${id}`, HttpMethods.get) as [Client, boolean, string];
    const [memberType, setMemberType] = useState(type);

    return (
        <>
            <li className={'flex justify-between px-5 py-2 max-w-lg border bg-gray-200 '}>
                <div>
                    {data?.email} {data?.username}
                </div>
                <div className='dropdown dropdown-bottom'>
                    <div tabIndex={0} role='button'
                         className=''>
                        <span>
                            {memberType}
                        </span>
                        <svg className='w-2.5 h-2.5 ms-3 inline-block' aria-hidden='true'
                             xmlns='http://www.w3.org/2000/svg' fill='none'
                             viewBox='0 0 10 6'>
                            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                  d='m1 1 4 4 4-4' />
                        </svg>
                    </div>
                    <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                        <li onClick={() => {
                            if (!onChange)
                                return;
                            setMemberType('Owner');
                            onChange('Owner', id);
                        }} className={'py-2 px-5 hover:bg-blue-200'}>Owner
                        </li>

                        <li onClick={() => {
                            if (!onChange)
                                return;

                            setMemberType('Guest');
                            onChange('Guest', id);
                        }} className={'py-2 px-5 hover:bg-blue-200'}>Guest
                        </li>
                    </ul>
                </div>
            </li>
        </>
    );
};
