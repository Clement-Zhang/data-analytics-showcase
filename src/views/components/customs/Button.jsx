export default function Button({
    onClick,
    children,
    position = '',
    type = '',
}) {
    return (
        <button
            type={type}
            onClick={(e) => onClick(e)}
            className={'rounded-md border bg-blue-500 ' + position}
        >
            {children}
        </button>
    );
}
