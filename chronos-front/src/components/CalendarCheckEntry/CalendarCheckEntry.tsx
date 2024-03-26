import { Calendar, VisibilitySettings } from '../../store/slices/calendarListSlice/types.ts';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface Props {
    calendarEntryId: string;
    calendar: Calendar;
    checkCallBack: (id: string, value: boolean) => void;
    pickColorCallback: (id: string, value: string) => void;
    visibility: VisibilitySettings;
}

export const CalendarCheckEntry = ({
                                       calendarEntryId,
                                       calendar,
                                       checkCallBack,
                                       visibility,
                                       pickColorCallback,
                                   }: Props) => {
    const [color, setColor] = useState(visibility.color || '#fffff');
    const [checked, setChecked] = useState(visibility.isVisible || false);

    const handleCheck = (e: any) => {
        let checked = e.target.checked;
        setChecked(checked);
        checkCallBack(calendarEntryId, checked);
    };

    const handleChangeColor = () => {
        pickColorCallback(calendarEntryId, color);
    };
    return (
        <li key={calendarEntryId} className={'relative border-b'}
            style={{
                borderColor: color,
            }}
        >
            <div onClick={handleCheck}
                 className={`pl-6 mt-5 pt-1 pb-1 text-lg rounded-tr-lg hover:bg-gray-200`}
            >
                <label className=' p-0 cursor-pointer label'>

                    <input type='checkbox' className='checkbox checkbox-sm'
                           defaultChecked={checked}
                    />

                    <span className='ml-2'>{calendar.name}</span>
                    <div className={'flex-grow'}></div>
                </label>
            </div>
            <div className={'absolute right-0 top-0 z-[3]'}>
                <div className='dropdown dropdown-bottom'>
                    <div tabIndex={0} role='button' className='p-2 rounded collapse-plus'>
                        <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg'
                             fill='currentColor' viewBox='0 0 16 3'>
                            <path
                                d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                        </svg>
                    </div>
                    <ul tabIndex={0}
                        className='dropdown-content z-[20] py-2 shadow-xl bg-base-100 rounded-box w-52'>
                        <div className={'mx-1'}>
                            <li className={'w-full p-2 rounded text-md hover:bg-blue-200 cursor-pointer'}
                                onClick={handleChangeColor}>
                                Submit color
                            </li>
                            <HexColorPicker className={'p-2'} color={color} onChange={setColor} />
                        </div>
                    </ul>
                </div>
            </div>
        </li>
    );
};

