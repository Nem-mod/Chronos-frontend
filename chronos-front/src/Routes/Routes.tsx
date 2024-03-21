import { createBrowserRouter } from 'react-router-dom';
import { SignUpPage } from '../pages/SignUpPage/SingUpPage';
import { ErrorPage } from '../pages/NotFoundPage/NotFoundPage.tsx';
import { SignInPage } from '../pages/SignInPage/SignInPage.tsx';
import { VerifyPage } from '../pages/VerifyPage/VerifyPage.tsx';
import { HomePage } from '../pages/HomePage/HomePage.tsx';
import { SettingsPage } from '../pages/SettingsPage/SettingsPage.tsx';
import { ProtectedRoutes } from '../components/ProtectedRoute/ProtectedRoutes.tsx';
import App from '../App.tsx';
import { CalendarSettings } from '../components/CalendarSettings/CalendarSettings.tsx';
import { CalendarCreationPage } from '../pages/CalendarCreationPage/CalendarCreationPage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
            {
                path: 'calendar/settings',
                element: <SettingsPage />,
                children: [
                    {
                        path: 'calendar/:id',
                        element: <CalendarSettings />,
                    },
                    {
                        path: 'create-calendar',
                        element: <CalendarCreationPage />,
                    },
                ],
            },
        ],
    },

    // {
    //     path: 'calendar',
    //     element: <HomePage />,
    //     children: [
    //         {
    //             path: 'settings',
    //             element: <SettingsPage />,
    //         },
    //     ],
    // },
    //

]);