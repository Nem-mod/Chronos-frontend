import { Link, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import useFetch, { HttpMethods } from '../../hooks/use-fetch-hook.ts';

export const InviteRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const token = useMemo(() => searchParams.get('token'), [searchParams]);
    const [, , error] = useFetch(`/calendar/invite/validate-code?token=${token}`, HttpMethods.patch, {});
    return (
        <>
            {error ? (
                    <div>
                        Error
                    </div>
                ) :
                <div className='flex flex-col gap-8 justify-center items-center h-screen'>
                    <h1 className='text-4xl font-bold'>Success!</h1>
                    <p>You were added to calendar!</p>
                    <p className='text-slate-400'>
                        <i>
                            <Link to={'/calendar'}>Follow the link to main page.</Link>
                        </i>
                    </p>
                </div>
            }
        </>
    );
};
