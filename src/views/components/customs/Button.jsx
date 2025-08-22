export default function Button({ onClick, children, width = 'w-12', type = 'button' }) {
    return (
        <button
            type={type}
            onClick={(e) => onClick(e)}
            className={'rounded-lg border bg-blue-500 h-8 ' + width}
        >
            {children}
        </button>
    );
}
