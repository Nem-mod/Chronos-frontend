import sidebar from '../../assets/sidebar.svg';
import useFetch, { HttpMethods } from '../../hooks/use-fetch-hook.ts';

interface Props {
    handleSidebarAction: () => void;
}

export const SideBar = ({ handleSidebarAction }: Props) => {
    const [data, loading, error] = useFetch('/calendar/list', HttpMethods.get, {});
    
    return (
        <aside className={'pl-6 basis-2/12 border-gray-400 border-r-2 bg-gray-100'}>
            <div className={'flex h-12 items-center justify-between'}>
                <div className={'w-5 h-5'} onClick={handleSidebarAction}>
                    <img src={sidebar} alt='#' />
                </div>
            </div>

            <div>
                My calendars
            </div>
            <div>
                Other calendars
            </div>
        </aside>
    );
};
