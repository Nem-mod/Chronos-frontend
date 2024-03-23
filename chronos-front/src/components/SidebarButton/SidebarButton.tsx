interface Props {
    onClick: () => void;
    visible?: boolean;
    icon: string;
    className?: string;
    name?: string;
}

export const SidebarButton = ({ onClick, visible = true, icon, className, name }: Props) => {
    return (
        <div className={'flex'}>
            <div className={'w-6 h-6' + ' ' + className} onClick={onClick}>
                {visible && <img src={icon} className={'w-full h-full'} alt='#' />}
            </div>
            {name && (
                <div className={'inline-block ml-6 font-bold'}>
                    {name}
                </div>
            )}
        </div>
    );
};
