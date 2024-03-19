import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
    const client = useAppSelector(state => state.auth.userInfo);

    return client ? <Outlet /> : <Navigate to={'/signin'} replace />;
};
