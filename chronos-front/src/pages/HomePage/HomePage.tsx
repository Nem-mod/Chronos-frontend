import { Main } from '../../components/Main/Main.tsx';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';
import { SideBar } from '../../components/SideBar/SideBar.tsx';
import { useEffect, useState } from 'react';
import { fetchCalendarList } from '../../store/slices/calendarListSlice/calendarListSlice.ts';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar.tsx';
import { SidebarButton } from '../../components/SidebarButton/SidebarButton.tsx';
import settingsIcon from '../../assets/icon-settings.svg';
import sidebar from '../../assets/sidebar.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

export const HomePage = () => {
    // const client = useAppSelector(state => state.auth.userInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const calendarIsLoad: boolean = useSelector((state: RootState) => state.calendarList.success);

    let [sidebarActive, setSidebarActive] = useState<boolean>(false);
    const handleSidebarAction = () => {
        setSidebarActive(prev => !prev);
    };


    const handleOpenSettings = () => navigate('settings');

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchCalendarList());
    }, []);

    return (
        <div className={''}>
            <NavBar navNode={<SidebarButton onClick={handleSidebarAction} icon={sidebar} />}>
                <img src={settingsIcon} alt='' className={'block ml-2 w-5 h-5'}
                     onClick={handleOpenSettings} />
            </NavBar>
            <div className={'flex min-h-screen'}>
                {sidebarActive && <SideBar />}
                {calendarIsLoad && <Main />}
                {/*<a href='https://www.notion.so/Chronos-Teamspace-0d4d2fcee0f8423591a8ea32292d5138'>Follow the*/}
                {/*    link</a>*/}
            </div>
        </div>
    );
};
