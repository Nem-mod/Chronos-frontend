import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { fetchAuthMe } from '../../store/slices/auth/authSlice.ts';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const ProtectedRoutes = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleAutoLogin = async () => {
        return dispatch(fetchAuthMe());
    };

    useEffect(() => {
        handleAutoLogin()
            .then(res => {
                if (res.error)
                    throw Error();
            })
            .catch(() => navigate('/signin'));
    }, []);
    // return client ? <Outlet /> : <Navigate to={'/signin'} replace />;
    return <Outlet />;
};
