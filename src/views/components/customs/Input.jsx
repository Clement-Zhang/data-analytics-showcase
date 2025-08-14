const className = 'border border-gray-300 rounded-lg w-32';
export default function Input({
    value,
    onChange,
    placeholder,
    children,
    type = 'text',
}) {
    return children ? (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={className}
        >
            <option value="" disabled hidden>
                {placeholder}
            </option>
            {children}
        </select>
    ) : (
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={className}
        />
    );
}
