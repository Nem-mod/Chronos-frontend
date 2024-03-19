interface Props {
    calendarId: string;
    name: string;
    checkCallBack: (id: string, value: boolean) => void;
}

export const CalendarCheckEntry = ({ calendarId, name, checkCallBack }: Props) => {
    const handleCheck = (e: any) => {
        let checked = e.target.checked;
        checkCallBack(calendarId, checked);
    };
    return (
        <>
            <li key={calendarId} className={''}>
                <label className='cursor-pointer label'>
                    <input type='checkbox' defaultChecked className='checkbox'
                           onChange={handleCheck} />
                    <span className=''>{name}</span>
                </label>
            </li>
        </>
    );
};
