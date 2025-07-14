import Input from './Input';

export default function DateInput({ value, onChange, children }) {
    return (
        <Input
            value={value}
            type="date"
            onChange={onChange}
        >
            {children}
        </Input>
    );
}
