import {
    createBrowserRouter,
} from "react-router-dom";
import {SignUpPage} from "../pages/SignUpPage/SingUpPage";
import App from "../App.tsx";
import {ErrorPage} from "../pages/NotFoundPage/NotFoundPage.tsx";
import {SignInPage} from "../pages/SignInPage/SignInPage.tsx";
import {CalendarTest} from "../components/CalendarTest/CalendarTest.tsx"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage/>,
        children: []
    },
    {
        path: "signin",
        element: <SignInPage/>
    },
    {
        path: "test",
        element: <CalendarTest/>
    }


]);