export default function Input({ value, onChange, type = 'text', children }) {
    return (
        <input
            value={value}
            type={type}
            placeholder={children}
            onChange={(e) => onChange(e.target.value)}
            className="border border-gray-300"
        />
    );
}
