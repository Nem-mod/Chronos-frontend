import { CalendarCreateForm } from '../../components/CalendarSettingsForm/CalendarCreateForm.tsx';

export const CalendarCreationPage = () => {
    return (
        <div className={'flex-grow'}>
            <div className={'flex h-fit before:w-1/12 before:content-[""] before:block'}>
                <div className={'flex-grow'}>
                    <div className={'mt-6 pt-2'}></div>
                    <CalendarCreateForm />
                </div>
            </div>
        </div>
    );
};
