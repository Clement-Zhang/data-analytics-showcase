export default function Card({ title, children, styling = '' }) {
    return (
        <div
            className={'relative bg-white rounded-lg shadow-md p-4 ' + styling}
        >
            {title && <h1 className="text-lg font-semibold mb-4">{title}</h1>}
            {children}
        </div>
    );
}
