import { SettingsSideBar } from '../../components/SettingsSideBar/SettingsSideBar.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar.tsx';
import { SidebarButton } from '../../components/SidebarButton/SidebarButton.tsx';
import arrow from '../../assets/icon-arrow.png';

export const SettingsPage = () => {
    const navigate = useNavigate();
    const handleCloseSettings = () => navigate('/calendar');
    return (
        <div>
            <NavBar navNode={<SidebarButton onClick={handleCloseSettings} icon={arrow} />}>
            </NavBar>
            <div className={'flex min-h-screen'}>
                <SettingsSideBar />
                <Outlet />
            </div>
        </div>
    );
};
