interface Props {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const TextField = ({ label, value, onChange, className }: Props) => {
    return (
        <div className={'mt-2 mb-2'}>
            {label ? (
                    <label>
                        <p className={'pt-2 pb-2'}>
                            {label}
                        </p>
                        <input type='text' placeholder='text'
                               onChange={(e) => onChange(e.target.value)}
                               value={value ? value : ''}
                               className={className || `input input-bordered w-full max-w-xs`} />
                    </label>

                ) :
                <input type='text' placeholder='text'
                       onChange={(e) => onChange(e.target.value)}
                       value={value ? value : ''}
                       className={className || `input input-bordered w-full max-w-xs`} />
            }
        </div>
    );
};
