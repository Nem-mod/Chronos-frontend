import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from './hooks/redux-hooks.ts';
import { useEffect } from 'react';
import { fetchAuthMe } from './store/slices/auth.ts';

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = async () => {
            const { error } = await dispatch(
                fetchAuthMe(null),
            );

            if (error) {
                throw error;
            }

            navigate('/calendar');
        };


        auth().catch(() => {
            navigate('/signin');
        });

    }, []);
    return (
        <div>
            <Link className={'text-blue-600 block'} to={'/signin'}>Sign in</Link>
            <Link className={'text-blue-600 block'} to={'/signup'}>Sign up</Link>

        </div>

    );
}

export default App;
