import { allTimezones, useTimezoneSelect } from 'react-timezone-select';


const labelStyle = 'original';
const timezones = {
    ...allTimezones,
    'Europe/Kyiv': 'Kyiv',
};

interface Props {
    onChangeCallback: (timezone: string) => void;
    value: string;
    className?: string;
}

export const SelectTimeZone = ({ onChangeCallback, value, className }: Props) => {
    const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones });
    return (
        <>
            <select className={className || 'block select select-bordered w-full max-w-xs'}
                    value={value}
                    onChange={(e) => onChangeCallback(parseTimezone(e.currentTarget.value).value)}>
                {options.map((option) => (
                    <option key={options.indexOf(option)}
                            value={option.value}>{option.label}</option>
                ))}
            </select>
        </>
    );
};
