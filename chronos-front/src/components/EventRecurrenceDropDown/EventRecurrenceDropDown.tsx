import { FrequencyEnum } from '../../store/slices/eventListSlice/types.ts';

interface Props {
    value: string | FrequencyEnum;
    onChange: (value: FrequencyEnum | null) => void;
}

export const EventRecurrenceDropDown = ({ value, onChange }: Props) => {
    return (
        <div className='dropdown dropdown-bottom'>
            <div tabIndex={0} role='button' className='btn m-1 collapse-plus bg-base-300'>Event
                recurrence {value && `- ${value}`}</div>
            <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                {Object.values(FrequencyEnum).map(value => (
                    <li key={value} onClick={() => onChange(value)}
                        className={'py-2 px-5 hover:bg-blue-200'}>{value}</li>
                ))}
                <li onClick={() => onChange(null)}
                    className={'py-2 px-5 hover:bg-blue-200'}>None
                </li>

            </ul>
        </div>
    );
};
