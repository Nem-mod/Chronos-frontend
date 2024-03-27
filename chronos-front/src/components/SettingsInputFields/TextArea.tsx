interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const TextArea = ({ value, onChange }: Props) => {
    return (
        <>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder='Bio'
                className='mt-2 block textarea textarea-info textarea-md w-full'></textarea>
        </>
    );
};
