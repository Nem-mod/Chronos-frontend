import sidebar from '../../assets/sidebar.svg';

interface Props {
    onClick: () => void;
    visible?: boolean;
}

export const SidebarButton = ({ onClick, visible = true }: Props) => {
    return (
        <div className={'w-6 h-6'} onClick={onClick}>
            {visible && <img src={sidebar} className={'w-full h-full'} alt='#' />}
        </div>
    );
};
