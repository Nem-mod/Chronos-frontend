import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('calendar');
    }, []);
    return (
        <div>
            <Link className={'text-blue-600 block'} to={'/signin'}>Sign in</Link>
            <Link className={'text-blue-600 block'} to={'/signup'}>Sign up</Link>
        </div>

    );
}

export default App;
