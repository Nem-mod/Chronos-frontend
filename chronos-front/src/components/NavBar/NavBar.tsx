import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks.ts';
import { ReactNode } from 'react';
import { SelectTimeZone } from '../SettingsInputFields/SelectTimeZone.tsx';
import { changeTimeZone } from '../../store/slices/auth/authSlice.ts';

interface Props {
    children?: ReactNode;
    navNode?: ReactNode;
}

export const NavBar = ({ children, navNode }: Props) => {
    const dispatch = useAppDispatch();
    const client = useAppSelector(state => state.auth.userInfo);
    const timeZone = useAppSelector(state => state.auth.timeZone);
    const handleChangeTimeZone = (value: string) => dispatch(changeTimeZone({ timeZone: value }));
    return (
        <nav className={' pl-4 pr-4 border-b-2 border-b-gray-400 min-h-12'}>
            <div className={'flex h-12 items-center justify-between'}>
                {navNode}
                <div className={'flex items-center text-center pr-4 gap-4'}>
                    <div>
                        <SelectTimeZone className={'max-h-8 border border-gray-300 rounded'}
                                        onChangeCallback={handleChangeTimeZone}
                                        value={timeZone} />
                    </div>
                    {children}
                    <div>{client?.username} <span
                        className={'ml-2 text-gray-500'}>{client?.email}</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};
