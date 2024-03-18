import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../store/slices/auth.ts';
import sidebar from '../../assets/sidebar.svg';

interface Props {
    client: Client;
    handleSidebarAction: () => void;
    sidebarIsActive: boolean;

}

export const Main = ({ client, handleSidebarAction, sidebarIsActive }: Props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!client) {
            navigate('/signin');
        }
    }, [client]);


    return (
        <main className={'flex-grow pr-6 pl-6'}>
            <nav className={'min-h-12'}>
                <div className={'flex h-12 items-center justify-between'}>

                    <div className={'w-5 h-5'} onClick={handleSidebarAction}>
                        {!sidebarIsActive && <img src={sidebar} alt='#' />}
                    </div>
                    <div className={'text-center pr-4'}>{client?.username} <span
                        className={'ml-2 text-gray-500'}>{client?.email}</span></div>
                </div>
            </nav>
        </main>
    );
};
