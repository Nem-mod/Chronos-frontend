import {useDescription, useTsController} from "@ts-react/form"

interface Props {
    inputType?: string
}

export const TextField = ({inputType}: Props) => {
    const {field, error} = useTsController<string>();
    const {label, placeholder} = useDescription();

    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input type={inputType || "text"}
                   placeholder={placeholder}
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   value={field.value}
                   onChange={e => {
                       field.onChange(e.target.value)
                   }}
            />
            {error?.errorMessage && <span className={"text-red-300 text-xs"}>{error?.errorMessage}</span>}
        </>
    );
};
