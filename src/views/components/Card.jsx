export default function Card({ title, children, style }) {
    return (
        <div className={'bg-white rounded-lg shadow-md p-4 ' + (style ?? '')}>
            {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
            {children}
        </div>
    );
}
