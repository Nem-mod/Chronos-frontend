import useFetch, {HttpMethods} from "../../hooks/use-fetch-hook.ts";
import {Link, useSearchParams} from "react-router-dom";
import {useMemo} from "react";
export const VerifyPage = () => {
    const [searchParams] = useSearchParams();
    const token = useMemo(() => searchParams.get("token"), [searchParams])
    const [, , error] = useFetch(`/auth/verify/validate-code?token=${token}`, HttpMethods.patch, {})
    return (
        <>
            {error ? (
                <div>
                    ERROR
                </div>
            ) :
                <div className='flex flex-col gap-8 justify-center items-center h-screen'>
                    <h1 className='text-4xl font-bold'>Success!</h1>
                    <p>You verified an account. Gratz!</p>
                    <p className='text-slate-400'>
                        <i>
                            <Link to={"/signin"}>Follow the link to log in.</Link>
                        </i>
                    </p>
                </div>
            }
        </>
    );
};
