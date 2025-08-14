export default function Button({ onClick, children, width = '12', type = '' }) {
    return (
        <button
            type={type}
            onClick={(e) => onClick(e)}
            className={'rounded-lg border bg-blue-500 h-8 w-' + width}
        >
            {children}
        </button>
    );
}
