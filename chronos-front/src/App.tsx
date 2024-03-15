import './App.css';
import { useNavigate } from 'react-router-dom';
import useFetch, { HttpMethods } from './hooks/use-fetch-hook.ts';
import { Fragment, useEffect } from 'react';

function App() {
    const navigate = useNavigate();

    const [data, , error] = useFetch('/auth/profile', HttpMethods.get, {});
    useEffect(() => {
        if (data) {
            navigate('calendar');
            return;
        }

        error && navigate('/signin');
    }, [data, error]);

    return (
        <Fragment>

        </Fragment>

    );
}

export default App;
