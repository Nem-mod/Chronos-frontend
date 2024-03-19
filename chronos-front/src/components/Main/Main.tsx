import { Client } from '../../store/slices/auth.ts';
import { SidebarButton } from '../SidebarButton/SidebarButton.tsx';
import settingsIcon from '../../assets/icon-settings.svg';

interface Props {
    client: Client;
    handleSidebarAction: () => void;
    sidebarIsActive: boolean;

}

export const Main = ({ client, handleSidebarAction, sidebarIsActive }: Props) => {
    return (
        <main className={'flex-grow pr-6 pl-6'}>
            <nav className={'min-h-12'}>
                <div className={'flex h-12 items-center justify-between'}>
                    <SidebarButton onClick={handleSidebarAction} visible={!sidebarIsActive} />

                    <div className={'text-center pr-4'}>{client?.username} <span
                        className={'ml-2 text-gray-500'}>{client?.email}</span>
                        <img src={settingsIcon} alt='' className={'inline-block ml-2 w-5 h-5'} />
                    </div>
                </div>
            </nav>
        </main>
    );
};
