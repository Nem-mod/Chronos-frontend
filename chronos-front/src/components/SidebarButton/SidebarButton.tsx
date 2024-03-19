interface Props {
    onClick: () => void;
    visible?: boolean;
    icon: string;
    className?: string;
}

export const SidebarButton = ({ onClick, visible = true, icon, className }: Props) => {
    return (
        <div className={'w-6 h-6' + ' ' + className} onClick={onClick}>
            {visible && <img src={icon} className={'w-full h-full'} alt='#' />}
        </div>
    );
};
