import { useAppSelector } from '../../hooks/redux-hooks.ts';
import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    navNode?: ReactNode;
}

export const NavBar = ({ children, navNode }: Props) => {

    const client = useAppSelector(state => state.auth.userInfo);
    return (
        <nav className={' pl-4 pr-4 border-b-2 border-b-gray-400 min-h-12'}>
            <div className={'flex h-12 items-center justify-between'}>
                {navNode}
                <div className={'flex items-center text-center pr-4 gap-4'}>
                    {children}
                    <div>{client?.username} <span
                        className={'ml-2 text-gray-500'}>{client?.email}</span>
                    </div>
                </div>

            </div>
        </nav>
    );
};
