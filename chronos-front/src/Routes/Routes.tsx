import { createBrowserRouter } from 'react-router-dom';
import { SignUpPage } from '../pages/SignUpPage/SingUpPage';
import { ErrorPage } from '../pages/NotFoundPage/NotFoundPage.tsx';
import { SignInPage } from '../pages/SignInPage/SignInPage.tsx';
import { VerifyPage } from '../pages/VerifyPage/VerifyPage.tsx';
import { HomePage } from '../pages/HomePage/HomePage.tsx';
import { ProtectedRoutes } from '../components/ProtectedRoute/ProtectedRoutes.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
    },
    {
        path: 'signup',
        element: <SignUpPage />,
        children: [],
    },
    {
        path: 'signin',
        element: <SignInPage />,
    },
    {
        path: 'verify',
        element: <VerifyPage />,
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: 'calendar',
                element: <HomePage />,
            },
        ],

    },


]);