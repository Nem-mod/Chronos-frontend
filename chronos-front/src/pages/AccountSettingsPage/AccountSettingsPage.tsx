import { z } from 'zod';
import { TextField } from '../../components/AuthInputFields/TextField.tsx';
import { createTsForm } from '@ts-react/form';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { useState } from 'react';
import { fetchUpdateProfile } from '../../store/slices/auth/auth.ts';

const mapping = [[z.string(), TextField]] as const;
const EditProfileForm = createTsForm(mapping);

const EditProfileSchema = z.object({
    username: z.string().describe('Change username // username').trim(),
    password: z.string().min(4, 'ERR').describe('Password // *******').optional(),
    repeatPassword: z.string().min(4, 'ERR').describe('Confirm password // *******').optional(),
});
export const AccountSettingsPage = () => {
    const dispatch = useAppDispatch();
    let [error, setError] = useState<string | null>();
    const handleOnSubmit = async (data: z.infer<typeof EditProfileSchema>) => {
        if (data.password != data.repeatPassword) {
            setError('Error password and repeat password are not equal');
            return;
        }


        const { error } = await dispatch(
            fetchUpdateProfile({
                username: data.username,
                password: data.password,
            }),
        );

        if (error) {
            setError('Something went wrong');
            return;
        }
    };

    return (
        <div className={'flex-grow'}>
            <div className={'flex h-fit before:w-1/12 before:content-[""] before:block'}>
                <div className={'flex-grow'}>
                    <div className={'mt-6 pt-2 max-w-xl'}>
                        <EditProfileForm
                            schema={EditProfileSchema}
                            onSubmit={handleOnSubmit}
                            props={{
                                password: {
                                    inputType: 'password',
                                },
                                repeatPassword: {
                                    inputType: 'password',
                                },
                            }}

                        >
                            {({ password, repeatPassword, username }) => {
                                return (
                                    <div className={'flex flex-col gap-3'}>
                                        {username}
                                        {password}
                                        {repeatPassword}

                                        {error && <span className={'text-red-300 text-xs'}>{error}</span>}

                                        <button type='submit'
                                                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Update
                                            an account
                                        </button>
                                    </div>
                                );
                            }}
                        </EditProfileForm>

                    </div>
                </div>
            </div>
        </div>

    );
};
