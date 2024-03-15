import { Main } from '../../components/Main/Main.tsx';
import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { SideBar } from '../../components/SideBar/SideBar.tsx';
import { useState } from 'react';

export const HomePage = () => {
    const client = useAppSelector(state => state.auth.userInfo);
    let [sidebarActive, setSidebarActive] = useState<boolean>(false);

    const handleSidebarAction = () => {
        setSidebarActive(prev => !prev);
    };

    return (
        <div className={'flex min-h-screen'}>
            {sidebarActive && <SideBar handleSidebarAction={handleSidebarAction} />}
            <Main client={client} handleSidebarAction={handleSidebarAction} sidebarIsActive={sidebarActive} />
            {/*<a href='https://www.notion.so/Chronos-Teamspace-0d4d2fcee0f8423591a8ea32292d5138'>Follow the*/}
            {/*    link</a>*/}
        </div>
    );
};
